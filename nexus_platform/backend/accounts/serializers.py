"""Accounts — Serializers"""
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, StudentProfile, TeacherProfile


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """JWT login — attaches user info to token response."""
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id':         self.user.id,
            'email':      self.user.email,
            'full_name':  self.user.get_full_name(),
            'role':       self.user.role,
            'avatar':     self.user.avatar.url if self.user.avatar else None,
            'is_verified':self.user.is_verified,
        }
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role']  = user.role
        token['email'] = user.email
        return token


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = StudentProfile
        fields = ['class_level','institute','guardian_name','guardian_phone',
                  'study_streak','total_study_time','points','level']


class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = TeacherProfile
        fields = ['subject','qualification','experience_years','institute',
                  'is_verified','rating','total_students','total_earnings',
                  'payout_method','payout_account']


class UserSerializer(serializers.ModelSerializer):
    student_profile = StudentProfileSerializer(read_only=True)
    teacher_profile = TeacherProfileSerializer(read_only=True)
    full_name       = serializers.CharField(source='get_full_name', read_only=True)

    class Meta:
        model  = User
        fields = ['id','email','first_name','last_name','full_name','role',
                  'avatar','phone','bio','is_verified','date_joined',
                  'student_profile','teacher_profile']
        read_only_fields = ['id','role','is_verified','date_joined']


class RegisterSerializer(serializers.ModelSerializer):
    password         = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    role             = serializers.ChoiceField(choices=['student','teacher'])
    # Student fields
    class_level = serializers.CharField(required=False, allow_blank=True)
    institute   = serializers.CharField(required=False, allow_blank=True)
    # Teacher fields
    subject          = serializers.CharField(required=False, allow_blank=True)
    qualification    = serializers.CharField(required=False, allow_blank=True)
    experience_years = serializers.IntegerField(required=False, default=0)

    class Meta:
        model  = User
        fields = ['email','first_name','last_name','password','confirm_password',
                  'role','phone','class_level','institute',
                  'subject','qualification','experience_years']

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('confirm_password'):
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        role    = validated_data.get('role', 'student')
        extra   = {}
        if role == 'student':
            extra = {k: validated_data.pop(k, '') for k in ['class_level','institute']}
        elif role == 'teacher':
            extra = {k: validated_data.pop(k, '') for k in ['subject','qualification','experience_years']}

        user = User.objects.create_user(**validated_data)

        if role == 'student':
            StudentProfile.objects.create(user=user, **extra)
        elif role == 'teacher':
            TeacherProfile.objects.create(user=user, **extra)

        return user


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    email    = serializers.EmailField()
    otp      = serializers.CharField(max_length=6)
    password = serializers.CharField(min_length=8)
