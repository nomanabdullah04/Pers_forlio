import re

def process_chat_query(query: str) -> str:
    q = query.lower()

    if re.search(r'\b(hi|hello|hey|greetings|hola|assalamu alaikum|salam)\b', q):
        return (
            "Hello! I am **Nexus AI**, the assistant for **Abdullah Al Noman's** portfolio. "
            "How can I help you today? You can ask about his **Deep Learning models**, "
            "**CampusNexus**, **skills**, **education at Comilla University**, or **how to contact him**."
        )

    if any(k in q for k in ['skill', 'stack', 'tech', 'technologies', 'know', 'language', 'tools']):
        return (
            "**Abdullah Al Noman's Technical Arsenal:**\n"
            "• **AI & Machine Learning:** Python, PyTorch, TensorFlow, Scikit-Learn, NLP & Transformers, CNN/RNN Deep Learning.\n"
            "• **Full-Stack Development:** React.js, JavaScript (ES6+), HTML5/CSS3, Django & Django REST Framework, Node.js.\n"
            "• **MLOps & Data:** MLflow, BentoML, DVC (Data Version Control), Docker.\n"
            "• **Databases & Tools:** MySQL (XAMPP), Git, Linux, Vercel."
        )

    if any(k in q for k in ['campusnexus', 'campus nexus', 'rent', 'housing', 'campus']):
        return (
            "**CampusNexus** is Noman's full-stack campus accommodation and rental platform:\n"
            "• **Live App:** https://campus-nexus-six.vercel.app\n"
            "• **GitHub:** https://github.com/nomanabdullah04/CampusNexus\n"
            "Features include streamlined room listings, real-time filtering, and modern responsive UI."
        )

    if any(k in q for k in ['machine learning', 'ml', 'deep learning', 'deeplearning', 'ai', 'nlp', 'model', 'neural', 'cnn', 'rnn']):
        return (
            "Noman has developed notable AI & ML open-source projects:\n"
            "1. **DeepLearning Suite:** CNN/RNN research architectures & computer vision classifiers.\n"
            "2. **Natural Language Processing (NLP) Engine:** Text classification, sentiment analysis & transformer embeddings.\n"
            "3. **SpamClassifier:** 98.7% precise SMS/Email phishing and spam filter.\n"
            "4. **Diabetes Prediction AI:** Machine learning clinical diagnostic classifier.\n"
            "Explore all repositories at https://github.com/nomanabdullah04."
        )

    if any(k in q for k in ['mlops', 'dvc', 'mlflow', 'bentoml', 'pipeline', 'serving']):
        return (
            "Noman implements production MLOps engineering:\n"
            "• **MLflow** for experiment tracking, parameter logging, and metrics.\n"
            "• **DVC (Data Version Control)** for dataset and pipeline reproducibility.\n"
            "• **BentoML** for microservice model packaging and production deployment."
        )

    if any(k in q for k in ['contact', 'email', 'hire', 'reach', 'message', 'phone', 'location', 'whatsapp', 'linkedin', 'insta', 'social']):
        return (
            "You can connect with Abdullah Al Noman directly:\n"
            "• **Official Gmail:** abdullahcse.cou14@gmail.com\n"
            "• **Phone & WhatsApp:** +880 1307-886773\n"
            "• **LinkedIn Profile:** https://www.linkedin.com/in/abdullah-al-noman-0540402a8\n"
            "• **Instagram Profile:** https://www.instagram.com/nom_an041?igsh=YXE1eDlmajdpZWJj\n"
            "• **GitHub Profile:** https://github.com/nomanabdullah04\n"
            "• **Location:** Dhaka, Bangladesh (Open to Worldwide Remote & Onsite roles)\n"
            "You can also submit the interactive Contact Form on this website!"
        )

    if any(k in q for k in ['education', 'degree', 'university', 'college', 'study', 'academic', 'cou', 'comilla']):
        return (
            "Abdullah Al Noman holds a **B.Sc. in Computer Science & Engineering (CSE)** from **Comilla University (CoU)**, "
            "Batch 14. His academic curriculum focused on Artificial Intelligence, Machine Learning, Deep Neural Networks, "
            "Algorithms, Data Structures, Database Systems (MySQL), and Full-Stack Software Engineering."
        )

    return (
        "Abdullah Al Noman is an AI/ML Specialist and Full-Stack Software Engineer (B.Sc. in CSE from Comilla University). "
        "He builds deep learning pipelines, NLP systems, full-stack web applications like CampusNexus, and MLOps workflows. "
        "Feel free to ask about his specific **GitHub repositories**, **LinkedIn profile**, or **tech stack**!"
    )
