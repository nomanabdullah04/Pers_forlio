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
      return `Hello! How can I help you explore Abdullah Al Noman's work? You can ask about his **flagship CoU DineX system**, **CampusNexus & Coffee or Tea**, his **Transformer & Deep Learning research**, his **29 GitHub repositories**, or **how to contact him**.`;
    }

    if (q.includes('dinex') || q.includes('cou-dinex') || q.includes('dining') || q.includes('food') || q.includes('cafeteria')) {
      return `**CoU DineX** is Noman's flagship campus dining & smart delivery operating system engineered for Comilla University:
• **Stack:** Next.js 16, TypeScript, PostgreSQL (Neon), Prisma ORM, TailwindCSS.
• **Key Innovations:** Multi-channel ordering (Cafeteria Pickup with 4-digit OTP, Table QR Dining, Hall & Department delivery), Real-time Kitchen Display System (KDS), courier logistics with zero-privacy-leak GPS, Campus Food Radar, and an 18-section university admin command center!
• **GitHub Repo:** [github.com/nomanabdullah04/CoU-DineX](https://github.com/nomanabdullah04/CoU-DineX)`;
    }

    if (q.includes('campusnexus') || q.includes('campus nexus') || q.includes('rent') || q.includes('housing')) {
      return `**CampusNexus** is Noman's full-stack campus accommodation and rental management web platform:
• **Live Demo:** [campus-nexus-six.vercel.app](https://campus-nexus-six.vercel.app)
• **GitHub Repo:** [github.com/nomanabdullah04/CampusNexus](https://github.com/nomanabdullah04/CampusNexus)
• Built with modern React, JavaScript, TailwindCSS, and Node.js for smooth housing discovery and room bookings.`;
    }

    if (q.includes('coffee') || q.includes('tea')) {
      return `**Coffee or Tea** is an interactive, multi-stage gamified web application:
• **Live Demo:** [coffee-or-tea.vercel.app](https://coffee-or-tea.vercel.app)
• **GitHub Repo:** [github.com/nomanabdullah04/Coffee_Or_Tea](https://github.com/nomanabdullah04/Coffee_Or_Tea)
• Crafted with React, Vite, fluid CSS3 keyframe animations, dynamic sound effects via Web Audio APIs, and celebration stages.`;
    }

    if (q.includes('transformer') || q.includes('attention') || q.includes('encoder') || q.includes('decoder') || q.includes('lstm') || q.includes('rnn')) {
      return `Noman has implemented specialized deep neural architectures on GitHub:
1. **Transformer-By-Deep-Learning:** Self-attention, multi-head attention projections, and Transformer blocks.
2. **Encoder-And-Decoder-Attention-Mechnisn-In-RNN:** Sequence-to-sequence neural model with Bahdanau/Luong attention.
3. **Bidirectiona-RNN-Arch-And-Intuition:** Bidirectional recurrent network modeling temporal context.
4. **LSTM-EndToEndPro & RNN_End_to_End:** Production sequential modeling pipelines.
All code is open-source at [github.com/nomanabdullah04](https://github.com/nomanabdullah04).`;
    }

    if (q.includes('sql') || q.includes('database') || q.includes('postgres') || q.includes('mysql') || q.includes('prisma')) {
      return `**Relational Database & Systems Mastery:**
• **The Complete SQL Bootcamp:** [github.com/nomanabdullah04/The-Complete-SQL-Bootcamp-Go-from-Zero-to-Hero-by-Baraa-Khatib](https://github.com/nomanabdullah04/The-Complete-SQL-Bootcamp-Go-from-Zero-to-Hero-by-Baraa-Khatib)
• Deep experience with PostgreSQL (Neon Serverless), MySQL, Prisma ORM schema modeling, complex joins, CTEs, indexing, and query optimization.`;
    }

    if (q.includes('repo') || q.includes('github') || q.includes('projects') || q.includes('portfolio')) {
      return `Noman maintains **29 public repositories** on GitHub spanning:
• **Flagship Full-Stack:** CoU DineX, CampusNexus, Coffee or Tea, Jhalm Student Organization.
• **AI & Deep Learning:** Transformers, Attention RNN, Bidirectional RNN, LSTM, ANN, GenAI with LLMs, NLP, SpamClassifier, Diabetes Prediction.
• **MLOps & DevOps:** MLflow, DVC (Data Version Control), BentoML, Docker.
• **Competitive Coding:** CODEFORCESS_p_Solved (C++).
Explore his complete GitHub profile at [github.com/nomanabdullah04](https://github.com/nomanabdullah04)!`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('technologies') || q.includes('know') || q.includes('language')) {
      return `**Abdullah Al Noman's Technical Arsenal:**
• **Languages:** Python, TypeScript, JavaScript (ES6+), C++, SQL, HTML5/CSS3.
• **Full-Stack & Frameworks:** Next.js 16, React.js, Vite, TailwindCSS, Prisma ORM, Node.js, Django REST Framework.
• **AI, Deep Learning & NLP:** PyTorch, TensorFlow, Transformers, Self-Attention, LSTM/GRU/RNN, Scikit-Learn, NLTK, Hugging Face.
• **MLOps & Infra:** MLflow, DVC, BentoML, Docker, Git/GitHub, Vercel, PostgreSQL Neon, MySQL.`;
    }

    if (q.includes('codeforce') || q.includes('c++') || q.includes('competitive') || q.includes('algorithm') || q.includes('problem')) {
      return `Noman is an active competitive programmer in C++:
• **Codeforces Profile:** [codeforces.com/profile/nomanabdullah04](https://codeforces.com/profile/nomanabdullah04)
• **Solutions Repo:** [github.com/nomanabdullah04/CODEFORCESS_p_Solved](https://github.com/nomanabdullah04/CODEFORCESS_p_Solved)
• Focus areas include Dynamic Programming, Graph Theory, Number Theory, and asymptotic complexity optimization.`;
    }

    if (q.includes('mlops') || q.includes('dvc') || q.includes('mlflow') || q.includes('bentoml') || q.includes('docker')) {
      return `Noman follows production MLOps & DevOps practices:
• **MLflow** for experiment tracking, metric visualization, and model registry.
• **DVC (Data Version Control)** for versioning datasets and reproducible data pipelines.
• **BentoML** for microservice model packaging and REST inference serving.
• **Docker** for reproducible multi-stage containerization.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('message')) {
      return `Connect with Abdullah Al Noman directly:
• **Email:** [abdullahcse.cou14@gmail.com](mailto:abdullahcse.cou14@gmail.com)
• **LinkedIn:** [linkedin.com/in/abdullah-al-noman-0540402a8](https://www.linkedin.com/in/abdullah-al-noman-0540402a8)
• **GitHub:** [github.com/nomanabdullah04](https://github.com/nomanabdullah04)
• **Instagram:** [@nom_an041](https://www.instagram.com/nom_an041?igsh=YXE1eDlmajdpZWJj)
• **Codeforces:** [codeforces.com/profile/nomanabdullah04](https://codeforces.com/profile/nomanabdullah04)
• **Location:** Dhaka / Cumilla, Bangladesh (Available for Worldwide Remote & Onsite roles)`;
    }

    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('college') || q.includes('cou')) {
      return `Abdullah Al Noman holds an academic background in **B.Sc. in Computer Science & Engineering (CSE)** at **Comilla University (CoU)**, Batch 14. He is the author of CoU DineX, the university's official smart dining and campus delivery operating system.`;
    }

    return `Abdullah Al Noman is an AI/ML Architect and Full-Stack Software Engineer with 29 public repositories on GitHub. He builds deep learning transformers, Next.js campus platforms like CoU DineX, MLOps automation pipelines, and competitive C++ algorithms.
Feel free to ask about his specific **GitHub repositories**, **CoU DineX**, **CampusNexus**, or **AI models**!`;
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
