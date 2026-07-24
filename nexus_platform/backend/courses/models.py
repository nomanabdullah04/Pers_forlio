"""Courses App — Models"""
from django.db import models
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self): return self.name


class Course(models.Model):
    DRAFT     = 'draft'
    PUBLISHED = 'published'
    ARCHIVED  = 'archived'
    STATUS_CHOICES = [(DRAFT,'Draft'),(PUBLISHED,'Published'),(ARCHIVED,'Archived')]

    teacher      = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='courses', limit_choices_to={'role':'teacher'})
    category     = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='courses')
    title        = models.CharField(max_length=200)
    slug         = models.SlugField(unique=True, max_length=220)
    description  = models.TextField()
    thumbnail    = models.ImageField(upload_to='course_thumbs/', null=True, blank=True)
    level        = models.CharField(max_length=10, default='10')   # class level
    price        = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    is_free      = models.BooleanField(default=False)
    status       = models.CharField(max_length=10, choices=STATUS_CHOICES, default=DRAFT)
    duration_hrs = models.PositiveSmallIntegerField(default=0, help_text='Estimated hours')
    language     = models.CharField(max_length=20, default='Bengali')
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self): return self.title

    @property
    def enrolled_count(self):
        return self.enrollments.count()

    @property
    def rating_avg(self):
        reviews = self.reviews.all()
        return round(sum(r.rating for r in reviews) / len(reviews), 2) if reviews else 0


class Lesson(models.Model):
    VIDEO = 'video'
    TEXT  = 'text'
    QUIZ  = 'quiz'
    TYPE_CHOICES = [(VIDEO,'Video'),(TEXT,'Text'),(QUIZ,'Quiz')]

    course       = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title        = models.CharField(max_length=200)
    lesson_type  = models.CharField(max_length=10, choices=TYPE_CHOICES, default=VIDEO)
    video_url    = models.URLField(blank=True)
    content      = models.TextField(blank=True)
    duration_min = models.PositiveSmallIntegerField(default=0)
    order        = models.PositiveSmallIntegerField(default=0)
    is_free_preview = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self): return f'{self.course.title} — {self.title}'


class Enrollment(models.Model):
    PENDING    = 'pending'
    ACTIVE     = 'active'
    IN_PROGRESS= 'in_progress'
    COMPLETED  = 'completed'
    STATUS_CHOICES = [(PENDING,'Pending'),(ACTIVE,'Active'),(IN_PROGRESS,'In Progress'),(COMPLETED,'Completed')]

    student    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments', limit_choices_to={'role':'student'})
    course     = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    status     = models.CharField(max_length=15, choices=STATUS_CHOICES, default=ACTIVE)
    progress   = models.PositiveSmallIntegerField(default=0)  # 0–100 %
    enrolled_at= models.DateTimeField(auto_now_add=True)
    completed_at= models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('student','course')
        ordering = ['-enrolled_at']

    def __str__(self): return f'{self.student} → {self.course}'


class LessonProgress(models.Model):
    student    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson     = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed  = models.BooleanField(default=False)
    watched_pct= models.PositiveSmallIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student','lesson')


class Review(models.Model):
    course     = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews')
    student    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating     = models.PositiveSmallIntegerField(default=5)
    comment    = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('course','student')
        ordering = ['-created_at']

    def __str__(self): return f'{self.student} → {self.course} ({self.rating}★)'
