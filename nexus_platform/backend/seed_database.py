"""
Nexus Learning Lab — Database Initializer and Seeder
Populates initial sample database for accounts, courses, quizzes, and live sessions.
"""
import os
import sys

def seed():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        import django
        django.setup()
    except Exception as e:
        print(f"Skipping Django ORM seed (Django environment not present): {e}")
        return

    from accounts.models import User, StudentProfile, TeacherProfile
    from courses.models import Course, Material
    from quiz.models import Quiz, Question

    print("Initializing Database Seeding...")

    # Create Teacher User
    teacher_user, created = User.objects.get_or_create(
        email='teacher@nexus.com',
        defaults={
            'first_name': 'Dr. Kamal',
            'last_name': 'Hossain',
            'role': User.TEACHER,
            'is_verified': True
        }
    )
    if created:
        teacher_user.set_password('demo123')
        teacher_user.save()
        TeacherProfile.objects.create(
            user=teacher_user,
            subject='Physics',
            qualification='Ph.D. in Theoretical Physics',
            experience_years=8,
            institute='Dhaka University',
            is_verified=True,
            rating=4.90,
            total_students=342
        )
        print("✔ Teacher account created: teacher@nexus.com / demo123")

    # Create Student Users
    students_data = [
        ('ayesha@student.com', 'Ayesha', 'Rahman', StudentProfile.CLASS_11_12, 'Notredame College'),
        ('rahim@student.com',  'Rahim',  'Hossain', StudentProfile.CLASS_9_10,  'Viqarunnisa School'),
        ('priya@student.com',  'Priya',  'Sharma',  StudentProfile.CLASS_8,     'Ideal School'),
    ]

    for email, fn, ln, cls_level, inst in students_data:
        st_user, created = User.objects.get_or_create(
            email=email,
            defaults={'first_name': fn, 'last_name': ln, 'role': User.STUDENT, 'is_verified': True}
        )
        if created:
            st_user.set_password('demo123')
            st_user.save()
            StudentProfile.objects.create(
                user=st_user,
                class_level=cls_level,
                institute=inst,
                study_streak=5,
                points=120,
                level=2
            )
            print(f"✔ Student account created: {email} / demo123")

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
