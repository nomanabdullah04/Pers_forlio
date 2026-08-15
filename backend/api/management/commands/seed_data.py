from django.core.management.base import BaseCommand
from api.models import Profile, SkillCategory, Skill, Project, Experience

class Command(BaseCommand):
    help = "Seeds the database with Abdullah Al Noman's portfolio data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting database seeding...")

        Profile.objects.all().delete()
        profile = Profile.objects.create(
            name="Abdullah Al Noman",
            title="AI & Machine Learning Specialist | Full-Stack Engineer",
            bio_quote="There is no data like more data.",
            about_text=(
                "I am a dedicated Machine Learning Specialist and Full-Stack Software Engineer "
                "focused on crafting intelligent, scalable, and impact-driven digital solutions. "
                "With expertise spanning deep neural network architectures, modern NLP transformers, "
                "MLOps orchestration (MLflow, DVC, BentoML), and robust full-stack web applications, "
                "I bridge the gap between cutting-edge AI research and production-grade engineering."
            ),
            location="Dhaka, Bangladesh",
            email="abdullahcse.cou14@gmail.com",
            phone="+880 1307-886773",
            whatsapp="+8801307886773",
            github_url="https://github.com/nomanabdullah04",
            linkedin_url="https://www.linkedin.com/in/abdullah-al-noman-0540402a8",
            instagram_url="https://www.instagram.com/nom_an041?igsh=YXE1eDlmajdpZWJj",
            avatar_url="/noman_profile.png"
        )
        self.stdout.write(self.style.SUCCESS(f"Created Profile: {profile.name}"))

        SkillCategory.objects.all().delete()
        
        categories_data = [
            {
                "title": "AI & Machine Learning",
                "slug": "ai-ml",
                "description": "Deep learning models, NLP transformers, computer vision, and predictive analytics",
                "order": 1,
                "skills": [
                    {"name": "Python", "level": 95, "icon": "Code2"},
                    {"name": "Deep Learning (PyTorch & TF)", "level": 90, "icon": "BrainCircuit"},
                    {"name": "Natural Language Processing (NLP)", "level": 88, "icon": "Sparkles"},
                    {"name": "Scikit-Learn & ML Algorithms", "level": 92, "icon": "Cpu"},
                    {"name": "Spam & Sentiment Classification", "level": 90, "icon": "ShieldCheck"},
                    {"name": "Neural Networks (CNN/RNN)", "level": 88, "icon": "Network"},
                ]
            },
            {
                "title": "MLOps & Data Engineering",
                "slug": "mlops",
                "description": "Model tracking, containerization, reproducible pipelines, and versioning",
                "order": 2,
                "skills": [
                    {"name": "MLflow", "level": 85, "icon": "Activity"},
                    {"name": "DVC (Data Version Control)", "level": 85, "icon": "GitBranch"},
                    {"name": "BentoML Model Serving", "level": 82, "icon": "Boxes"},
                    {"name": "Jupyter & Colab Research", "level": 95, "icon": "FileCode"},
                    {"name": "Pandas, NumPy & Data Wrangling", "level": 92, "icon": "Database"},
                ]
            },
            {
                "title": "Full-Stack Web Development",
                "slug": "fullstack",
                "description": "Modern, responsive frontend interfaces and high-throughput REST APIs",
                "order": 3,
                "skills": [
                    {"name": "React.js & JavaScript (ES6+)", "level": 90, "icon": "Atom"},
                    {"name": "HTML5 & CSS3 / Modern Design", "level": 95, "icon": "Palette"},
                    {"name": "Django & Django REST Framework", "level": 88, "icon": "Server"},
                    {"name": "Node.js & Express", "level": 82, "icon": "Box"},
                    {"name": "RESTful API Architecture", "level": 90, "icon": "Workflow"},
                ]
            },
            {
                "title": "Databases, Security & Tools",
                "slug": "database-tools",
                "description": "Relational persistence, cybersecurity scanners, and version control workflows",
                "order": 4,
                "skills": [
                    {"name": "MySQL & XAMPP Ecosystem", "level": 88, "icon": "Database"},
                    {"name": "Network Security & Packet Analysis", "level": 84, "icon": "Lock"},
                    {"name": "Git & GitHub Collaboration", "level": 95, "icon": "GitFork"},
                    {"name": "Linux / Shell Scripting", "level": 82, "icon": "Terminal"},
                    {"name": "Vercel & Cloud Deployment", "level": 90, "icon": "Cloud"},
                ]
            }
        ]

        for cat_info in categories_data:
            skills = cat_info.pop('skills')
            category = SkillCategory.objects.create(**cat_info)
            for skill_info in skills:
                Skill.objects.create(category=category, **skill_info)
            self.stdout.write(f"Created Category: {category.title} with {len(skills)} skills")

        Project.objects.all().delete()
        projects_data = [
            {
                "title": "CampusNexus - Campus Rent & Housing Platform",
                "category": "Full-Stack Web",
                "badge": "Production Live App",
                "summary": "A specialized full-stack accommodation and rent management system engineered for university students and campus property owners.",
                "description": "CampusNexus streamlines campus housing discovery, room listings, rent payments, and tenant-landlord communication. Built with dynamic modern JavaScript frontend, responsive glassmorphism UI, real-time filtering, and cloud deployment on Vercel.",
                "image_url": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
                "tags": "React.js, JavaScript, Node.js, CSS3, Vercel, REST API",
                "live_url": "https://campus-nexus-six.vercel.app",
                "github_url": "https://github.com/nomanabdullah04/CampusNexus",
                "metrics": "Active student users, live on Vercel",
                "featured": True,
                "order": 1
            },
            {
                "title": "DeepLearning Architecture Framework",
                "category": "AI & Deep Learning",
                "badge": "Neural Networks",
                "summary": "Comprehensive research framework implementing Convolutional Neural Networks (CNNs), RNNs, and custom deep learning architectures.",
                "description": "Developed modular deep learning pipelines including computer vision classifiers, image segmentation, backpropagation optimizers, loss function analysis, and model benchmarking across multiple vision datasets.",
                "image_url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
                "tags": "Python, PyTorch, TensorFlow, CNN, RNN, Computer Vision",
                "live_url": "https://github.com/nomanabdullah04/DeepLearning",
                "github_url": "https://github.com/nomanabdullah04/DeepLearning",
                "metrics": "High accuracy multi-layer neural networks",
                "featured": True,
                "order": 2
            },
            {
                "title": "Natural Language Processing (NLP) Engine",
                "category": "AI & Deep Learning",
                "badge": "NLP & Transformers",
                "summary": "Advanced NLP pipeline encompassing transformer embeddings, sentiment analysis, text classification, and tokenization techniques.",
                "description": "Engineered robust natural language processing pipelines using state-of-the-art tokenizers, TF-IDF vectorization, recurrent architectures, and text normalization algorithms for large-scale unstructured textual data.",
                "image_url": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80",
                "tags": "Python, NLP, NLTK, Transformers, Text Processing, Machine Learning",
                "live_url": "https://github.com/nomanabdullah04/Natural-Language-Processing-NLP-",
                "github_url": "https://github.com/nomanabdullah04/Natural-Language-Processing-NLP-",
                "metrics": "Multitask semantic NLP accuracy",
                "featured": True,
                "order": 3
            },
            {
                "title": "MLOps Production Lifecycle (MLflow + BentoML + DVC)",
                "category": "MLOps & Data",
                "badge": "MLOps Ecosystem",
                "summary": "End-to-end Machine Learning Operations ecosystem featuring experiment tracking, automated versioning, and microservice model serving.",
                "description": "Integrated MLflow for continuous experiment tracking & metric visualization, DVC (Data Version Control) for dataset reproducibility across Git repositories, and BentoML for containerized high-performance model deployment.",
                "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                "tags": "MLflow, BentoML, DVC, Python, Docker, Model Serving",
                "live_url": "https://github.com/nomanabdullah04/MLFlow",
                "github_url": "https://github.com/nomanabdullah04/MLFlow",
                "metrics": "Reproducible pipelines & fast inference serving",
                "featured": True,
                "order": 4
            },
            {
                "title": "Intelligent Spam Classifier & NLP Filter",
                "category": "AI & Deep Learning",
                "badge": "ML Classification",
                "summary": "High-precision NLP spam detection engine utilizing probabilistic classifiers and machine learning text mining.",
                "description": "Trained on thousands of SMS and email messages with TF-IDF / Bag of Words vectorization, Naive Bayes, Support Vector Machines, and ensemble decision algorithms to identify phishing and spam with near-zero false positive rate.",
                "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
                "tags": "Python, Scikit-Learn, NLP, Naive Bayes, SVM",
                "live_url": "https://github.com/nomanabdullah04/SpamClassifier",
                "github_url": "https://github.com/nomanabdullah04/SpamClassifier",
                "metrics": "98.7% Precision in Spam Identification",
                "featured": False,
                "order": 5
            },
            {
                "title": "Network Security & Cyber Threat Analyzer",
                "category": "Cyber Security",
                "badge": "Cyber Defense",
                "summary": "Automated network vulnerability scanner, packet inspector, and malicious traffic detector written in Python.",
                "description": "Built network socket analyzers, vulnerability checkers, and automated threat mitigation scripts to audit network protocols, identify port vulnerabilities, and detect malicious payload signatures.",
                "image_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
                "tags": "Python, Network Security, Socket Programming, Cyber Defense, Packet Inspection",
                "live_url": "https://github.com/nomanabdullah04/Network-Security",
                "github_url": "https://github.com/nomanabdullah04/Network-Security",
                "metrics": "Real-time socket threat detection",
                "featured": False,
                "order": 6
            },
            {
                "title": "Diagnostic Diabetes Prediction AI",
                "category": "AI & Deep Learning",
                "badge": "Healthcare ML",
                "summary": "Clinical machine learning predictive model assessing patient diagnostic indicators to forecast diabetes risk.",
                "description": "Analyzed clinical medical parameters (insulin, glucose curves, BMI, blood pressure) with feature scaling, hyperparameter optimization, and ensemble classification models to assist healthcare decision support.",
                "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
                "tags": "Python, Machine Learning, Healthcare AI, Scikit-Learn, Data Analysis",
                "live_url": "https://github.com/nomanabdullah04/Diabetes-Prediction",
                "github_url": "https://github.com/nomanabdullah04/Diabetes-Prediction",
                "metrics": "96.4% Clinical diagnostic accuracy",
                "featured": False,
                "order": 7
            }
        ]

        for p_data in projects_data:
            Project.objects.create(**p_data)
        self.stdout.write(self.style.SUCCESS(f"Created {len(projects_data)} Projects"))

        Experience.objects.all().delete()
        exp_data = [
            {
                "period": "2024 - Present",
                "role": "Machine Learning Specialist & Full-Stack Engineer",
                "company": "Independent Research & Software Development",
                "location": "Dhaka, Bangladesh",
                "description": "Architecting end-to-end machine learning pipelines, deep learning neural models, and full-stack web applications. Built CampusNexus accommodation platform and deployed MLOps reproducible workflows with MLflow and BentoML.",
                "highlights": "Engineered CampusNexus full-stack rent system and deployed to Vercel\nAuthored custom deep learning vision and NLP transformer architectures in PyTorch & TensorFlow\nDesigned automated MLOps pipelines with DVC for versioning and BentoML for production serving",
                "order": 1
            },
            {
                "period": "2023 - 2024",
                "role": "AI & Software Development Researcher",
                "company": "Academic & Open-Source Projects",
                "location": "Bangladesh",
                "description": "Conducted hands-on development in computer vision, diagnostic healthcare machine learning, network defense scripting, and database architecture.",
                "highlights": "Built diagnostic machine learning models including Diabetes risk prediction\nDeveloped high-precision spam and sentiment classifiers using NLP techniques\nCreated network security analyzers for automated port auditing and threat detection",
                "order": 2
            },
            {
                "period": "Education",
                "role": "Computer Science & Engineering",
                "company": "University Academic Program",
                "location": "Bangladesh",
                "description": "Focused on Algorithms, Data Structures, Machine Learning, Artificial Intelligence, Database Management Systems (MySQL), and Web Technologies.",
                "highlights": "Strong foundation in Discrete Mathematics, OOP, and Software Design Patterns\nLed technical project teams in full-stack web and applied AI development",
                "order": 3
            }
        ]

        for e_info in exp_data:
            Experience.objects.create(**e_info)
        self.stdout.write(self.style.SUCCESS(f"Created {len(exp_data)} Experience & Education milestones"))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
