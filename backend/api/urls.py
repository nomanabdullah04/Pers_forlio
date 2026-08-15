from django.urls import path
from .views import (
    ApiRootView, HealthCheckView, ProfileView, SkillCategoryListView,
    ProjectListView, ProjectDetailView, ExperienceListView,
    ContactMessageCreateView, AIChatbotView
)

urlpatterns = [
    path('', ApiRootView.as_view(), name='api-root'),
    path('health/', HealthCheckView.as_view(), name='api-health'),
    path('profile/', ProfileView.as_view(), name='api-profile'),
    path('skills/', SkillCategoryListView.as_view(), name='api-skills'),
    path('projects/', ProjectListView.as_view(), name='api-projects'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='api-project-detail'),
    path('experience/', ExperienceListView.as_view(), name='api-experience'),
    path('contact/', ContactMessageCreateView.as_view(), name='api-contact'),
    path('chat/', AIChatbotView.as_view(), name='api-chat'),
]
