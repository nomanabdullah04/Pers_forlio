export const personalInfo = {
  name: "Abdullah Al Noman",
  preferredName: "Noman",
  title: "AI & Machine Learning Specialist | Full-Stack Software Engineer",
  taglines: [
    "Machine Learning & Deep Learning Specialist",
    "Full-Stack Web Architect (React & Django/Node)",
    "MLOps, Data Version Control & Cloud Pipelines",
    "Python Developer"
  ],
  bioQuote: "There is no data like more data.",
  about: "I am a dedicated Machine Learning Specialist and Full-Stack Software Engineer with an academic background in Computer Science and Engineering from Comilla University (CoU). With expertise spanning deep neural network architectures, modern NLP transformers, MLOps orchestration (MLflow, DVC, BentoML), and robust full-stack web applications, I bridge the gap between cutting-edge AI research and production-grade engineering.",
  location: "Dhaka, Bangladesh (Open to Global Remote)",
  email: "abdullahcse.cou14@gmail.com",
  phone: "+880 1307-886773",
  phoneRaw: "+8801307886773",
  whatsapp: "8801307886773",
  github: "https://github.com/nomanabdullah04",
  linkedin: "https://www.linkedin.com/in/abdullah-al-noman-0540402a8",
  instagram: "https://www.instagram.com/nom_an041?igsh=YXE1eDlmajdpZWJj",
  avatar: "/noman_profile.png",
  gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=abdullahcse.cou14@gmail.com&su=Inquiry%20from%20Portfolio",
  stats: [
    { label: "Repositories & Projects", value: "18+", icon: "FolderGit2" },
    { label: "ML & AI Model Pipelines", value: "12+", icon: "Brain" },
    { label: "Full-Stack Applications", value: "6+", icon: "Layers" },
    { label: "Model Accuracy Benchmark", value: "98.5%", icon: "Zap" }
  ]
};

export const skillCategories = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Deep learning neural models, NLP transformers, computer vision, and predictive intelligence",
    accent: "from-cyan-500/20 to-blue-500/20",
    borderAccent: "group-hover:border-cyan-400/50",
    glowColor: "#64FFDA",
    badge: "TENSOR CORE",
    skills: [
      { name: "Python", level: 95, icon: "Code2", tier: "Master", tags: ["NumPy", "OOP", "Async", "Algorithms"] },
      { name: "Deep Learning (PyTorch & TF)", level: 90, icon: "BrainCircuit", tier: "Expert", tags: ["CNN", "RNN", "CUDA", "Backprop"] },
      { name: "Natural Language Processing (NLP)", level: 88, icon: "Sparkles", tier: "Advanced", tags: ["Transformers", "NLTK", "BERT", "Tokenization"] },
      { name: "Scikit-Learn & ML Algorithms", level: 92, icon: "Cpu", tier: "Master", tags: ["SVM", "Random Forests", "Ensembles", "PCA"] },
      { name: "Spam & Sentiment Classification", level: 90, icon: "ShieldCheck", tier: "Expert", tags: ["TF-IDF", "Naive Bayes", "Feature Mining"] },
      { name: "Neural Networks (CNN/RNN)", level: 88, icon: "Network", tier: "Advanced", tags: ["Loss Analysis", "Optimizers", "Vision"] }
    ]
  },
  {
    id: "mlops",
    title: "MLOps & Data Engineering",
    description: "Automated tracking, dataset version control, microservice serving, and reproducible pipelines",
    accent: "from-purple-500/20 to-pink-500/20",
    borderAccent: "group-hover:border-purple-400/50",
    glowColor: "#A855F7",
    badge: "PIPELINE ENGINE",
    skills: [
      { name: "MLflow", level: 85, icon: "Activity", tier: "Advanced", tags: ["Tracking", "Model Registry", "Metrics", "Artifacts"] },
      { name: "DVC (Data Version Control)", level: 85, icon: "GitBranch", tier: "Advanced", tags: ["Data Pipelines", "Remote Storage", "Versioning"] },
      { name: "BentoML Model Serving", level: 82, icon: "Boxes", tier: "Advanced", tags: ["Containerization", "Microservices", "REST Inference"] },
      { name: "Jupyter & Colab Research", level: 95, icon: "FileCode", tier: "Master", tags: ["EDA", "GPU Instances", "Benchmarking"] },
      { name: "Pandas & Data Wrangling", level: 92, icon: "Database", tier: "Master", tags: ["Feature Scaling", "Imputation", "Aggregation"] }
    ]
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    description: "High-performance React interfaces, resilient Django REST APIs, and modern responsive design",
    accent: "from-blue-500/20 to-cyan-500/20",
    borderAccent: "group-hover:border-blue-400/50",
    glowColor: "#00D2FF",
    badge: "MODERN ARCHITECTURE",
    skills: [
      { name: "React.js & JavaScript (ES6+)", level: 90, icon: "Atom", tier: "Expert", tags: ["Hooks", "Vite", "State Management", "SPA"] },
      { name: "HTML5 & Modern CSS / Tailwind", level: 95, icon: "Palette", tier: "Master", tags: ["Glassmorphism", "Responsive Grid", "Animations"] },
      { name: "Django & REST Framework", level: 88, icon: "Server", tier: "Advanced", tags: ["JWT Auth", "ORM", "Serialization", "Endpoints"] },
      { name: "Node.js & Express", level: 82, icon: "Box", tier: "Advanced", tags: ["Middleware", "Microservices", "Routing"] },
      { name: "RESTful API Architecture", level: 90, icon: "Workflow", tier: "Expert", tags: ["HTTP Protocol", "JSON Schema", "Rate Limiting"] }
    ]
  },
  {
    id: "database-tools",
    title: "Databases, Security & Cloud",
    description: "Relational persistence, cybersecurity scanners, socket security, and cloud deployment",
    accent: "from-emerald-500/20 to-cyan-500/20",
    borderAccent: "group-hover:border-emerald-400/50",
    glowColor: "#10B981",
    badge: "CYBER & INFRA",
    skills: [
      { name: "MySQL & Relational Databases", level: 88, icon: "Database", tier: "Advanced", tags: ["Indexing", "Foreign Keys", "Queries", "XAMPP"] },
      { name: "Network Security & Packet Analysis", level: 84, icon: "Lock", tier: "Advanced", tags: ["Sockets", "Threat Auditing", "Port Scanners"] },
      { name: "Git & GitHub Collaboration", level: 95, icon: "GitFork", tier: "Master", tags: ["Branching", "Pull Requests", "CI/CD", "Gitflow"] },
      { name: "Linux / Shell Scripting", level: 82, icon: "Terminal", tier: "Advanced", tags: ["Bash", "Cron Jobs", "Process Management"] },
      { name: "Vercel & Cloud Deployment", level: 90, icon: "Cloud", tier: "Expert", tags: ["Continuous Deployment", "Edge Functions", "DNS"] }
    ]
  }
];

export const featuredProjects = [
  {
    id: "campus-nexus",
    title: "CampusNexus - Campus Rent & Housing Platform",
    category: "Full-Stack Web",
    badge: "Production Live App",
    summary: "A specialized full-stack accommodation and rent management system engineered for university students and campus property owners.",
    description: "CampusNexus streamlines campus housing discovery, room listings, rent payments, and tenant-landlord communication. Built with dynamic modern JavaScript frontend, responsive glassmorphism UI, real-time filtering, and cloud deployment on Vercel.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    tags: ["React.js", "JavaScript", "Node.js", "CSS3", "Vercel", "REST API"],
    liveUrl: "https://campus-nexus-six.vercel.app",
    githubUrl: "https://github.com/nomanabdullah04/CampusNexus",
    featured: true,
    metrics: "Active student users, live on Vercel"
  },
  {
    id: "deep-learning-suite",
    title: "DeepLearning Architecture Framework",
    category: "AI & Deep Learning",
    badge: "Neural Networks",
    summary: "Comprehensive research framework implementing Convolutional Neural Networks (CNNs), RNNs, and custom deep learning architectures.",
    description: "Developed modular deep learning pipelines including computer vision classifiers, image segmentation, backpropagation optimizers, loss function analysis, and model benchmarking across multiple vision datasets.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "PyTorch", "TensorFlow", "CNN", "RNN", "Computer Vision"],
    liveUrl: "https://github.com/nomanabdullah04/DeepLearning",
    githubUrl: "https://github.com/nomanabdullah04/DeepLearning",
    featured: true,
    metrics: "High accuracy multi-layer neural networks"
  },
  {
    id: "nlp-intelligence",
    title: "Natural Language Processing (NLP) Engine",
    category: "AI & Deep Learning",
    badge: "NLP & Transformers",
    summary: "Advanced NLP pipeline encompassing transformer embeddings, sentiment analysis, text classification, and tokenization techniques.",
    description: "Engineered robust natural language processing pipelines using state-of-the-art tokenizers, TF-IDF vectorization, recurrent architectures, and text normalization algorithms for large-scale unstructured textual data.",
    image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "NLP", "NLTK", "Transformers", "Text Processing", "Machine Learning"],
    liveUrl: "https://github.com/nomanabdullah04/Natural-Language-Processing-NLP-",
    githubUrl: "https://github.com/nomanabdullah04/Natural-Language-Processing-NLP-",
    featured: true,
    metrics: "Multitask semantic NLP accuracy"
  },
  {
    id: "mlops-pipeline",
    title: "MLOps Production Lifecycle (MLflow + BentoML + DVC)",
    category: "MLOps & Data",
    badge: "MLOps Ecosystem",
    summary: "End-to-end Machine Learning Operations ecosystem featuring experiment tracking, automated versioning, and microservice model serving.",
    description: "Integrated MLflow for continuous experiment tracking & metric visualization, DVC (Data Version Control) for dataset reproducibility across Git repositories, and BentoML for containerized high-performance model deployment.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["MLflow", "BentoML", "DVC", "Python", "Docker", "Model Serving"],
    liveUrl: "https://github.com/nomanabdullah04/MLFlow",
    githubUrl: "https://github.com/nomanabdullah04/MLFlow",
    featured: true,
    metrics: "Reproducible pipelines & fast inference serving"
  },
  {
    id: "spam-classifier",
    title: "Intelligent Spam Classifier & NLP Filter",
    category: "AI & Deep Learning",
    badge: "ML Classification",
    summary: "High-precision NLP spam detection engine utilizing probabilistic classifiers and machine learning text mining.",
    description: "Trained on thousands of SMS and email messages with TF-IDF / Bag of Words vectorization, Naive Bayes, Support Vector Machines, and ensemble decision algorithms to identify phishing and spam with near-zero false positive rate.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Scikit-Learn", "NLP", "Naive Bayes", "SVM"],
    liveUrl: "https://github.com/nomanabdullah04/SpamClassifier",
    githubUrl: "https://github.com/nomanabdullah04/SpamClassifier",
    featured: false,
    metrics: "98.7% Precision in Spam Identification"
  },
  {
    id: "network-security",
    title: "Network Security & Cyber Threat Analyzer",
    category: "Cyber Security",
    badge: "Cyber Defense",
    summary: "Automated network vulnerability scanner, packet inspector, and malicious traffic detector written in Python.",
    description: "Built network socket analyzers, vulnerability checkers, and automated threat mitigation scripts to audit network protocols, identify port vulnerabilities, and detect malicious payload signatures.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Network Security", "Socket Programming", "Cyber Defense", "Packet Inspection"],
    liveUrl: "https://github.com/nomanabdullah04/Network-Security",
    githubUrl: "https://github.com/nomanabdullah04/Network-Security",
    featured: false,
    metrics: "Real-time socket threat detection"
  },
  {
    id: "diabetes-prediction",
    title: "Diagnostic Diabetes Prediction AI",
    category: "AI & Deep Learning",
    badge: "Healthcare ML",
    summary: "Clinical machine learning predictive model assessing patient diagnostic indicators to forecast diabetes risk.",
    description: "Analyzed clinical medical parameters (insulin, glucose curves, BMI, blood pressure) with feature scaling, hyperparameter optimization, and ensemble classification models to assist healthcare decision support.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Machine Learning", "Healthcare AI", "Scikit-Learn", "Data Analysis"],
    liveUrl: "https://github.com/nomanabdullah04/Diabetes-Prediction",
    githubUrl: "https://github.com/nomanabdullah04/Diabetes-Prediction",
    featured: false,
    metrics: "96.4% Clinical diagnostic accuracy"
  }
];

export const experienceTimeline = [
  {
    period: "2024 - Present",
    role: "Machine Learning Specialist & Full-Stack Engineer",
    company: "Independent Research & Software Development",
    location: "Dhaka, Bangladesh",
    description: "Architecting end-to-end machine learning pipelines, deep learning neural models, and full-stack web applications. Built CampusNexus accommodation platform and deployed MLOps reproducible workflows with MLflow and BentoML.",
    highlights: [
      "Engineered CampusNexus full-stack rent system and deployed to Vercel",
      "Authored custom deep learning vision and NLP transformer architectures in PyTorch & TensorFlow",
      "Designed automated MLOps pipelines with DVC for versioning and BentoML for production serving"
    ]
  },
  {
    period: "2023 - 2024",
    role: "AI & Software Development Researcher",
    company: "Open-Source Projects & Research",
    location: "Bangladesh",
    description: "Conducted hands-on development in computer vision, diagnostic healthcare machine learning, network defense scripting, and database architecture.",
    highlights: [
      "Built diagnostic machine learning models including Diabetes risk prediction",
      "Developed high-precision spam and sentiment classifiers using NLP techniques",
      "Created network security analyzers for automated port auditing and threat detection"
    ]
  },
  {
    period: "Education",
    role: "B.Sc. in Computer Science & Engineering (CSE)",
    company: "Comilla University (CoU)",
    location: "Cumilla, Bangladesh",
    description: "Rigorous coursework focusing on Artificial Intelligence, Machine Learning, Deep Neural Networks, Algorithms, Data Structures, Database Systems (MySQL), and Full-Stack Software Engineering.",
    highlights: [
      "Department of Computer Science and Engineering (CSE), Batch 14",
      "Strong foundation in Algorithms, Object-Oriented Architecture, and Distributed Systems",
      "Technical lead for academic and open-source software engineering teams"
    ]
  }
];

export const chatbotKnowledge = {
  greetings: [
    "Hello! I am Nexus AI, the intelligent assistant for Abdullah Al Noman's portfolio. How can I assist you today?",
    "Welcome! I can tell you all about Noman's machine learning projects, full-stack web development expertise, GitHub repositories, LinkedIn profile, and how to get in touch."
  ],
  presetQuestions: [
    "What are Noman's top skills?",
    "Tell me about CampusNexus",
    "What ML and Deep Learning projects has he built?",
    "How can I contact or hire Noman?",
    "What is Noman's educational background?"
  ]
};
