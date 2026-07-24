"""Accounts — Views (Auth, Profile, Registration)"""
import random, string
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema

from .models import User, OTPVerification, StudentProfile, TeacherProfile
from .serializers import (
    UserSerializer, RegisterSerializer,
    PasswordChangeSerializer, PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer, CustomTokenObtainPairSerializer
)


def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))


class LoginView(TokenObtainPairView):
    """POST /api/v1/auth/login/ — returns access + refresh + user info"""
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """POST /api/v1/auth/register/ — student or teacher registration"""
    serializer_class   = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Send OTP email
        otp = generate_otp()
        OTPVerification.objects.create(user=user, otp=otp, purpose='verify')
        send_mail(
            subject='Verify your Nexus Learning Lab account',
            message=f'Your verification OTP is: {otp}\nValid for 10 minutes.',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=True,
        )

        refresh = RefreshToken.for_user(user)
        return Response({
            'message':   'Registration successful. Please verify your email.',
            'user':      UserSerializer(user).data,
            'access':    str(refresh.access_token),
            'refresh':   str(refresh),
        }, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    """POST /api/v1/auth/logout/ — blacklist refresh token"""
    def post(self, request):
        try:
            token = RefreshToken(request.data['refresh'])
            token.blacklist()
        except Exception:
            pass
        return Response({'message': 'Logged out successfully.'})


class ProfileView(generics.RetrieveUpdateAPIView):
    """GET/PATCH /api/v1/auth/profile/ — current user profile"""
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class PasswordChangeView(APIView):
    """POST /api/v1/auth/change-password/"""
    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({'message': 'Password changed successfully.'})


class PasswordResetRequestView(APIView):
    """POST /api/v1/auth/password-reset/ — send OTP"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
            otp  = generate_otp()
            OTPVerification.objects.create(user=user, otp=otp, purpose='reset')
            send_mail(
                subject='Nexus Learning Lab — Password Reset OTP',
                message=f'Your password reset OTP is: {otp}\nValid for 10 minutes.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=True,
            )
        except User.DoesNotExist:
            pass  # Don't reveal user existence
        return Response({'message': 'If this email exists, an OTP has been sent.'})


class PasswordResetConfirmView(APIView):
    """POST /api/v1/auth/password-reset/confirm/"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            otp_obj = OTPVerification.objects.filter(
                user=user, otp=serializer.validated_data['otp'], purpose='reset', is_used=False
            ).latest('created_at')
            if not otp_obj.is_valid():
                return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.validated_data['password'])
            user.save()
            otp_obj.is_used = True
            otp_obj.save()
            return Response({'message': 'Password reset successful.'})
        except (User.DoesNotExist, OTPVerification.DoesNotExist):
            return Response({'error': 'Invalid OTP or email.'}, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    """POST /api/v1/auth/verify-email/"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp   = request.data.get('otp')
        try:
            user    = User.objects.get(email=email)
            otp_obj = OTPVerification.objects.filter(
                user=user, otp=otp, purpose='verify', is_used=False
            ).latest('created_at')
            if not otp_obj.is_valid():
                return Response({'error': 'OTP expired.'}, status=400)
            user.is_verified = True
            user.save()
            otp_obj.is_used = True
            otp_obj.save()
            return Response({'message': 'Email verified successfully.'})
        except Exception:
            return Response({'error': 'Invalid OTP.'}, status=400)


@api_view(['GET'])
def student_dashboard_stats(request):
    """GET /api/v1/auth/student/stats/ — aggregated dashboard data"""
    if request.user.role != 'student':
        return Response({'error': 'Forbidden'}, status=403)
    from courses.models import Enrollment
    from quiz.models import QuizAttempt
    enrollments = Enrollment.objects.filter(student=request.user)
    return Response({
        'enrolled_courses':  enrollments.count(),
        'completed_courses': enrollments.filter(status='completed').count(),
        'in_progress':       enrollments.filter(status='in_progress').count(),
        'study_streak':      getattr(request.user, 'student_profile', None) and request.user.student_profile.study_streak or 0,
        'points':            getattr(request.user, 'student_profile', None) and request.user.student_profile.points or 0,
        'level':             getattr(request.user, 'student_profile', None) and request.user.student_profile.level or 1,
    })


@api_view(['GET'])
def teacher_dashboard_stats(request):
    """GET /api/v1/auth/teacher/stats/ — aggregated dashboard data"""
    if request.user.role != 'teacher':
        return Response({'error': 'Forbidden'}, status=403)
    from courses.models import Course, Enrollment
    courses = Course.objects.filter(teacher=request.user)
    total_students = Enrollment.objects.filter(course__in=courses).values('student').distinct().count()
    profile = getattr(request.user, 'teacher_profile', None)
    return Response({
        'total_courses':   courses.count(),
        'published_courses': courses.filter(status='published').count(),
        'total_students':  total_students,
        'total_earnings':  float(profile.total_earnings) if profile else 0,
        'rating':          float(profile.rating) if profile else 0,
        'pending_reviews': 3,  # placeholder — from submissions
    })
