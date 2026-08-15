from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=200, default="Abdullah Al Noman")
    title = models.CharField(max_length=250, default="AI & Machine Learning Specialist | Full-Stack Engineer")
    bio_quote = models.CharField(max_length=300, default="There is no data like more data.")
    about_text = models.TextField()
    location = models.CharField(max_length=200, default="Dhaka, Bangladesh")
    email = models.EmailField(default="abdullahcse.cou14@gmail.com")
    phone = models.CharField(max_length=50, default="+880 1307-886773", blank=True)
    whatsapp = models.CharField(max_length=50, default="+8801307886773", blank=True)
    github_url = models.URLField(default="https://github.com/nomanabdullah04")
    linkedin_url = models.URLField(default="https://www.linkedin.com/in/abdullah-al-noman-0540402a8", blank=True, null=True)
    instagram_url = models.URLField(default="https://www.instagram.com/nom_an041?igsh=YXE1eDlmajdpZWJj", blank=True, null=True)
    avatar_url = models.URLField(default="/noman_profile.png")
    resume_file = models.FileField(upload_to="resumes/", blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class SkillCategory(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.CharField(max_length=250, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Skill Categories"
        ordering = ['order', 'title']

    def __str__(self):
        return self.title

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    level = models.IntegerField(default=85, help_text="Proficiency percentage (0-100)")
    icon = models.CharField(max_length=50, default="Code2")
    is_featured = models.BooleanField(default=True)

    class Meta:
        ordering = ['-level', 'name']

    def __str__(self):
        return f"{self.name} ({self.level}%)"

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('AI & Deep Learning', 'AI & Deep Learning'),
        ('Full-Stack Web', 'Full-Stack Web'),
        ('MLOps & Data', 'MLOps & Data'),
        ('Cyber Security', 'Cyber Security'),
    ]

    title = models.CharField(max_length=250)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='AI & Deep Learning')
    badge = models.CharField(max_length=100, blank=True, help_text="e.g. 'Production Live App', 'Neural Networks'")
    summary = models.TextField(help_text="Short card summary")
    description = models.TextField(help_text="Full detailed modal description")
    image_url = models.URLField(default="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80")
    tags = models.CharField(max_length=300, help_text="Comma-separated tags (e.g. Python, PyTorch, React)")
    live_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(default="https://github.com/nomanabdullah04")
    metrics = models.CharField(max_length=200, blank=True, help_text="e.g. '98.5% Accuracy'")
    featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def get_tags_list(self):
        return [t.strip() for t in self.tags.split(',') if t.strip()]

class Experience(models.Model):
    period = models.CharField(max_length=100, help_text="e.g. '2024 - Present' or 'Education'")
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=150, default="Dhaka, Bangladesh")
    description = models.TextField()
    highlights = models.TextField(blank=True, help_text="Newline-separated bullet achievements")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.role} at {self.company}"

    def get_highlights_list(self):
        return [h.strip() for h in self.highlights.split('\n') if h.strip()]

class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, default="")
    subject = models.CharField(max_length=250, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
