"""Nexus Learning Lab — Accounts App Models"""
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user  = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', User.ADMIN)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    STUDENT = 'student'
    TEACHER = 'teacher'
    ADMIN   = 'admin'
    ROLE_CHOICES = [
        (STUDENT, 'Student'),
        (TEACHER, 'Teacher'),
        (ADMIN,   'Admin'),
    ]

    email        = models.EmailField(unique=True)
    first_name   = models.CharField(max_length=60)
    last_name    = models.CharField(max_length=60)
    role         = models.CharField(max_length=10, choices=ROLE_CHOICES, default=STUDENT)
    avatar       = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone        = models.CharField(max_length=20, blank=True)
    bio          = models.TextField(blank=True)
    is_active    = models.BooleanField(default=True)
    is_staff     = models.BooleanField(default=False)
    is_verified  = models.BooleanField(default=False)
    date_joined  = models.DateTimeField(default=timezone.now)
    last_login   = models.DateTimeField(null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-date_joined']

    def __str__(self):
        return f'{self.get_full_name()} ({self.role})'

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'.strip()


class StudentProfile(models.Model):
    CLASS_8     = 'class-8'
    CLASS_9_10  = 'class-9-10'
    CLASS_11_12 = 'class-11-12'
    CLASS_CHOICES = [
        (CLASS_8,     'Class 8'),
        (CLASS_9_10,  'Class 9-10 (SSC)'),
        (CLASS_11_12, 'Class 11-12 (HSC)'),
    ]

    user             = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    class_level      = models.CharField(max_length=12, choices=CLASS_CHOICES, default=CLASS_11_12)
    institute        = models.CharField(max_length=150, blank=True)
    guardian_name    = models.CharField(max_length=100, blank=True)
    guardian_phone   = models.CharField(max_length=20, blank=True)
    study_streak     = models.PositiveIntegerField(default=0)
    total_study_time = models.PositiveIntegerField(default=0, help_text='Minutes')
    points           = models.PositiveIntegerField(default=0)
    level            = models.PositiveSmallIntegerField(default=1)
    created_at       = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.get_full_name()} — {self.get_class_level_display()}'

    @property
    def full_name(self):
        return self.user.get_full_name()


class TeacherProfile(models.Model):
    user              = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    subject           = models.CharField(max_length=100)
    qualification     = models.CharField(max_length=200)
    experience_years  = models.PositiveSmallIntegerField(default=0)
    institute         = models.CharField(max_length=200, blank=True)
    nid_number        = models.CharField(max_length=20, blank=True)
    is_verified       = models.BooleanField(default=False)
    rating            = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_students    = models.PositiveIntegerField(default=0)
    total_earnings    = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    payout_method     = models.CharField(max_length=50, blank=True)
    payout_account    = models.CharField(max_length=100, blank=True)
    created_at        = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.get_full_name()} — Teacher Profile'


class OTPVerification(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE)
    otp        = models.CharField(max_length=6)
    purpose    = models.CharField(max_length=20, default='verify')  # verify | reset
    created_at = models.DateTimeField(auto_now_add=True)
    is_used    = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def is_valid(self):
        from datetime import timedelta
        return not self.is_used and timezone.now() < self.created_at + timedelta(minutes=10)
