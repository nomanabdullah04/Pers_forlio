from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.core.mail import send_mail
from django.conf import settings
from .models import Profile, SkillCategory, Project, Experience, ContactMessage
from .serializers import (
    ProfileSerializer, SkillCategorySerializer,
    ProjectSerializer, ExperienceSerializer, ContactMessageSerializer
)
from .chatbot_engine import process_chat_query

class ApiRootView(APIView):
    def get(self, request):
        return Response({
            "service": "Abdullah Al Noman Portfolio REST API",
            "version": "1.0.0",
            "status": "online",
            "documentation": "Master API endpoints for portfolio, projects, skills, contact form, and AI chatbot",
            "endpoints": {
                "health": "/api/health/",
                "profile": "/api/profile/",
                "skills": "/api/skills/",
                "projects": "/api/projects/",
                "experience": "/api/experience/",
                "contact_submission": "/api/contact/ [POST]",
                "ai_chatbot": "/api/chat/ [POST]"
            },
            "author": {
                "name": "Abdullah Al Noman",
                "github": "https://github.com/nomanabdullah04",
                "linkedin": "https://www.linkedin.com/in/abdullah-al-noman-0540402a8",
                "email": "abdullahcse.cou14@gmail.com",
                "phone": "+880 1307-886773",
                "education": "B.Sc. in CSE, Comilla University (CoU)"
            }
        })

class HealthCheckView(APIView):
    def get(self, request):
        return Response({
            "status": "online",
            "service": "Nexus Portfolio API",
            "author": "Abdullah Al Noman"
        })

class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create(
                name="Abdullah Al Noman",
                title="AI & Machine Learning Specialist | Full-Stack Engineer",
                bio_quote="There is no data like more data.",
                about_text="Specialized in developing intelligent deep learning neural architectures, scalable NLP pipelines, and production full-stack systems.",
                location="Dhaka, Bangladesh",
                email="abdullahcse.cou14@gmail.com",
                phone="+880 1307-886773",
                whatsapp="+8801307886773",
                github_url="https://github.com/nomanabdullah04",
                linkedin_url="https://www.linkedin.com/in/abdullah-al-noman-0540402a8",
                avatar_url="/noman_profile.png"
            )
        else:
            profile.email = "abdullahcse.cou14@gmail.com"
            profile.phone = "+880 1307-886773"
            profile.whatsapp = "+8801307886773"
            profile.linkedin_url = "https://www.linkedin.com/in/abdullah-al-noman-0540402a8"
            profile.avatar_url = "/noman_profile.png"
            profile.bio_quote = "There is no data like more data."
            profile.save()

        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

class SkillCategoryListView(generics.ListAPIView):
    queryset = SkillCategory.objects.prefetch_related('skills').all()
    serializer_class = SkillCategorySerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        
        if category and category != 'All':
            qs = qs.filter(category=category)
        if search:
            qs = qs.filter(title__icontains=search) | qs.filter(tags__icontains=search)
        return qs

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        
        subject_line = f"[Portfolio Contact] {instance.subject or 'New Inquiry'} from {instance.name}"
        email_body = (
            f"You received a new inquiry from your Portfolio website!\n\n"
            f"Sender Name: {instance.name}\n"
            f"Sender Email: {instance.email}\n"
            f"Sender Phone: {instance.phone or 'Not provided'}\n"
            f"Subject: {instance.subject or 'General Inquiry'}\n\n"
            f"Message:\n{instance.message}\n\n"
            f"-----------------------------------------\n"
            f"Received at: {instance.created_at}"
        )
        
        try:
            send_mail(
                subject=subject_line,
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL if hasattr(settings, 'DEFAULT_FROM_EMAIL') else 'noreply@portfolio.com',
                recipient_list=['abdullahcse.cou14@gmail.com'],
                fail_silently=True
            )
        except Exception:
            pass

class AIChatbotView(APIView):
    def post(self, request):
        user_message = request.data.get('message', '')
        if not user_message:
            return Response(
                {"error": "Message parameter is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        reply = process_chat_query(user_message)
        return Response({
            "query": user_message,
            "reply": reply
        })
