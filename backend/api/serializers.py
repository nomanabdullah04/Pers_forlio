from rest_framework import serializers
from .models import Profile, SkillCategory, Skill, Project, Experience, ContactMessage

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'level', 'icon', 'is_featured']

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'title', 'slug', 'description', 'order', 'skills']

class ProjectSerializer(serializers.ModelSerializer):
    tags_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'category', 'badge', 'summary', 'description',
            'image_url', 'tags', 'tags_list', 'live_url', 'github_url',
            'metrics', 'featured', 'order', 'created_at'
        ]

    def get_tags_list(self, obj):
        return obj.get_tags_list()

class ExperienceSerializer(serializers.ModelSerializer):
    highlights_list = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            'id', 'period', 'role', 'company', 'location',
            'description', 'highlights', 'highlights_list', 'order'
        ]

    def get_highlights_list(self, obj):
        return obj.get_highlights_list()

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
