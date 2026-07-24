"""Accounts — URL Patterns"""
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Auth
    path('login/',                  views.LoginView.as_view(),               name='login'),
    path('register/',               views.RegisterView.as_view(),             name='register'),
    path('logout/',                 views.LogoutView.as_view(),               name='logout'),
    path('token/refresh/',          TokenRefreshView.as_view(),               name='token-refresh'),

    # Profile
    path('profile/',                views.ProfileView.as_view(),              name='profile'),
    path('change-password/',        views.PasswordChangeView.as_view(),       name='change-password'),

    # Email Verification
    path('verify-email/',           views.VerifyEmailView.as_view(),          name='verify-email'),

    # Password Reset
    path('password-reset/',         views.PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset/confirm/', views.PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

    # Dashboard Stats
    path('student/stats/',          views.student_dashboard_stats,            name='student-stats'),
    path('teacher/stats/',          views.teacher_dashboard_stats,            name='teacher-stats'),
]
