import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, chatbotKnowledge } from '../data/portfolioData';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  Brain
} from 'lucide-react';

export default function AIChatbot({ isOpen, onClose, onToggle }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I am **Nexus AI**, the intelligent assistant for Abdullah Al Noman's portfolio. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateBotReply = (query) => {
    const q = query.toLowerCase();

    if (q.match(/\b(hi|hello|hey|greetings|hola)\b/)) {
      return `Hello! How can I help you learn more about Abdullah Al Noman? You can ask about his **ML models**, **CampusNexus**, **skills**, or **how to contact him**.`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('technologies') || q.includes('know') || q.includes('language')) {
      return `**Abdullah Al Noman's Technical Arsenal:**
• **AI & ML:** Python, PyTorch, TensorFlow, Scikit-Learn, NLP & Transformers, CNN/RNN Deep Learning.
• **Full-Stack:** React.js, JavaScript (ES6+), HTML5/CSS3, Django & Django REST Framework, Node.js.
• **MLOps:** MLflow, BentoML, DVC (Data Version Control), Docker.
• **Databases & Tools:** MySQL (via XAMPP), Git, Linux, Vercel.`;
    }

    if (q.includes('campusnexus') || q.includes('campus nexus') || q.includes('rent') || q.includes('housing')) {
      return `**CampusNexus** is Noman's full-stack campus accommodation and rental management web platform. 
• **Live Demo:** [campus-nexus-six.vercel.app](https://campus-nexus-six.vercel.app)
• **GitHub Repo:** [github.com/nomanabdullah04/CampusNexus](https://github.com/nomanabdullah04/CampusNexus)
It provides seamless room listing, student tenant inquiries, and modern UI architecture.`;
    }

    if (q.includes('machine learning') || q.includes('ml') || q.includes('deep learning') || q.includes('ai') || q.includes('nlp') || q.includes('model')) {
      return `Noman has authored several high-impact AI/ML projects:
1. **DeepLearning Suite:** CNN/RNN research architectures & computer vision classifiers.
2. **NLP Engine:** Text transformers, sentiment classifiers, and tokenization models.
3. **SpamClassifier:** 98.7% accurate SMS/Email phishing and spam detection model.
4. **Diabetes Prediction AI:** Clinical diagnostic machine learning model for healthcare.
All code is open-source at [github.com/nomanabdullah04](https://github.com/nomanabdullah04).`;
    }

    if (q.includes('mlops') || q.includes('dvc') || q.includes('mlflow') || q.includes('bentoml') || q.includes('pipeline')) {
      return `Noman follows production MLOps best practices:
• **MLflow** for experiment tracking, hyperparameter logging, and model registry.
• **DVC (Data Version Control)** for versioning datasets and reproducible training pipelines.
• **BentoML** for microservice model packaging and high-throughput inference serving.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('message')) {
      return `You can connect with Abdullah Al Noman directly:
• **Email:** [abdullahcse.cou14@gmail.com](mailto:abdullahcse.cou14@gmail.com)
• **LinkedIn:** [linkedin.com/in/abdullah-al-noman-0540402a8](https://www.linkedin.com/in/abdullah-al-noman-0540402a8)
• **Instagram:** [@nom_an041](https://www.instagram.com/nom_an041?igsh=YXE1eDlmajdpZWJj)
• **GitHub:** [github.com/nomanabdullah04](https://github.com/nomanabdullah04)
• **Location:** Dhaka, Bangladesh (Available for Worldwide Remote & Onsite roles)
You can also fill out the interactive contact form below on this website!`;
    }

    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('college') || q.includes('background')) {
      return `Abdullah Al Noman has a strong foundation in **Computer Science and Engineering (CSE)** with coursework focused on Data Structures, Algorithms, Artificial Intelligence, Deep Learning, Database Systems (MySQL), and Full-Stack Engineering.`;
    }

    return `Noman is an AI/ML Specialist and Full-Stack Software Engineer. He builds deep learning pipelines, NLP systems, full-stack web applications like CampusNexus, and MLOps workflows. 
Feel free to ask about his specific **GitHub repositories**, **projects**, or **tech stack**!`;
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() })
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'bot',
              text: data.reply || data.response,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsTyping(false);
        }, 500);
        return;
      }
    } catch (err) {
    }

    setTimeout(() => {
      const replyText = generateBotReply(query);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onToggle}
          className="relative p-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-2xl hover:shadow-[0_0_30px_rgba(100,255,218,0.6)] transition-all duration-300 hover:scale-105 group flex items-center justify-center font-mono"
          title="Open Nexus AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-slate-950" />
          ) : (
            <>
              <Brain className="w-6 h-6 text-slate-950 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0A192F]" />
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 chat-window animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Nexus AI</span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-500/20">
                    ASSISTANT
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">Trained on Noman's Projects & Stack</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                      isBot
                        ? 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-sm'
                        : 'bg-cyan-500 text-slate-950 font-medium rounded-tr-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {msg.text}
                    </div>
                    <div
                      className={`text-[10px] mt-1 text-right font-mono ${
                        isBot ? 'text-slate-500' : 'text-slate-900/70'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs font-mono">
                <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/50 flex gap-2 overflow-x-auto no-scrollbar">
            {chatbotKnowledge.presetQuestions.slice(0, 3).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(preset)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-400/40 text-[11px] text-slate-300 hover:text-cyan-300 transition-all font-mono"
              >
                {preset}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about Noman's ML models, projects, skills..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 text-slate-950 font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
