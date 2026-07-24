// src/pages/student/AiTutor.jsx
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiCpu, FiSend, FiInfo, FiTrash2 } from 'react-icons/fi';
import styles from './AiTutor.module.css';

const MOCK_BOT_RESPONSES = {
  integration: `### How Integration by Parts Works 📚

Integration by parts is a special rule in calculus used to integrate the product of two functions. It is based on the product rule for differentiation.

The formula is:
$$\\int u \\, dv = u v - \\int v \\, du$$

#### Step-by-Step Example:
Evaluate $\\int x \\cos(x) \\, dx$

1. **Choose $u$ and $dv$** using the **LIATE** rule (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential):
   * Let $u = x$ (Algebraic) $\\implies du = dx$
   * Let $dv = \\cos(x) \\, dx$ (Trigonometric) $\\implies v = \\sin(x)$

2. **Apply the formula**:
   $$\\int x \\cos(x) \\, dx = x \\sin(x) - \\int \\sin(x) \\, dx$$

3. **Solve the remaining integral**:
   $$\\int x \\cos(x) \\, dx = x \\sin(x) - (-\\cos(x)) + C$$
   $$\\int x \\cos(x) \\, dx = x \\sin(x) + \\cos(x) + C$$

Let me know if you would like another practice problem to test your understanding! 🧠`,

  newton: `### Newton's Second Law: $F = ma$ ⚛️

Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass.

$$\\text{Force } (F) = \\text{Mass } (m) \\times \\text{Acceleration } (a)$$

* **Force ($F$)** is measured in Newtons (N)
* **Mass ($m$)** is measured in Kilograms (kg)
* **Acceleration ($a$)** is measured in meters per second squared ($m/s^2$)

#### Practice Problem:
A toy car of mass $2 \\text{ kg}$ is pushed with a net force of $10 \\text{ N}$. What is its acceleration?

**Solution:**
1. Identify the given values:
   * $F = 10 \\text{ N}$
   * $m = 2 \\text{ kg}$
2. Rearrange the formula to solve for acceleration ($a$):
   * $a = F / m$
3. Substitute the values:
   * $a = 10 \\text{ N} / 2 \\text{ kg} = 5 \\text{ m/s}^2$

Thus, the toy car accelerates at **$5 \\text{ m/s}^2$**. Let me know if you want to try a harder multi-force problem! 🏎️`,

  english: `### Formal Email Template: Requesting Leave 📧

Here is a standard, polite template you can use to request leave from your teachers or institution:

***

**Subject:** Leave of Absence Request — [Your Name] — Roll: [Your Roll Number]

Dear [Teacher's Name/Principal],

I am writing to formally request a leave of absence for [Number of Days] days, starting from [Start Date] to [End Date]. The reason for this request is [briefly explain, e.g., a family medical emergency / my own illness].

I will ensure that I catch up on all class materials and notes uploaded to the Nexus Portal during my absence. I have also requested my classmate [Classmate Name] to keep me updated on any homework or daily quiz guidelines.

Thank you for your time and understanding.

Sincerely,  
[Your Name]  
Class: [Your Class Level]  
Roll Number: [Your Roll Number]

***
Let me know if you would like me to rewrite or adjust this template for a specific scenario! ✍️`,

  default: `I'm Nexus AI 🤖, your personal study tutor! I can help you:
1. Explain complex topics (Math, Physics, Chemistry).
2. Generate step-by-step answers for academic questions.
3. Build email and essay templates.
4. Give you practice quizzes.

What topic would you like to study today? Feel free to ask or click one of the quick chips above!`
};

export default function StudentAiTutor() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 'm1', sender: 'bot', text: MOCK_BOT_RESPONSES.default, time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const handleSend = (textToSend) => {
    const userText = textToSend || input;
    if (!userText.trim()) return;

    // Add user message
    const newMsg = { id: Math.random().toString(), sender: 'user', text: userText, time: new Date() };
    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInput('');

    // Trigger bot response
    setTyping(true);

    setTimeout(() => {
      let botText = '';
      const lowercase = userText.toLowerCase();

      if (lowercase.includes('integration') || lowercase.includes('parts')) {
        botText = MOCK_BOT_RESPONSES.integration;
      } else if (lowercase.includes('newton') || lowercase.includes('force') || lowercase.includes('f=ma')) {
        botText = MOCK_BOT_RESPONSES.newton;
      } else if (lowercase.includes('email') || lowercase.includes('leave') || lowercase.includes('template')) {
        botText = MOCK_BOT_RESPONSES.english;
      } else {
        botText = `Thank you for asking about **"${userText}"**! As your Nexus AI Study Buddy, I've analyzed this topic. Here is the key concept:\n\n* This subject is covered in your class syllabus.\n* To master it, try practicing past year board questions.\n* Make sure to check the study notes uploaded in your "Study Materials" folder.\n\nLet me know if you would like a step-by-step example on this or another query! 🌟`;
      }

      setMessages(prev => [...prev, { id: Math.random().toString(), sender: 'bot', text: botText, time: new Date() }]);
      setTyping(false);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([{ id: 'm1', sender: 'bot', text: MOCK_BOT_RESPONSES.default, time: new Date() }]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiCpu /> Nexus AI Study Buddy</h1>
          <p className={styles.subtitle}>Ask questions, solve equations, and generate study templates in real-time.</p>
        </div>
        <button className={styles.clearBtn} onClick={clearChat} title="Clear conversation" id="clear-chat-btn">
          <FiTrash2 /> Clear Chat
        </button>
      </div>

      <div className={styles.chatContainer}>
        {/* Suggestion chips */}
        <div className={styles.chipsRow}>
          <button className={styles.chip} onClick={() => handleSend('Explain integration by parts with formula')} id="chip-integration">
            📐 Integration by parts
          </button>
          <button className={styles.chip} onClick={() => handleSend('Explain F=ma with acceleration problem')} id="chip-newton">
            ⚛️ Newton's 2nd Law (F=ma)
          </button>
          <button className={styles.chip} onClick={() => handleSend('Generate leave request email template')} id="chip-email">
            📧 Leave email template
          </button>
        </div>

        {/* Chat area */}
        <div className={styles.chatArea}>
          {messages.map(msg => (
            <div key={msg.id} className={`${styles.messageWrap} ${styles[msg.sender]}`}>
              <div className={styles.avatar}>
                {msg.sender === 'bot' ? <FiCpu /> : (user?.full_name || 'U')[0]}
              </div>
              <div className={styles.bubble}>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                  {msg.text}
                </div>
                <span className={styles.time}>
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {typing && (
            <div className={`${styles.messageWrap} ${styles.bot}`}>
              <div className={styles.avatar}><FiCpu /></div>
              <div className={styles.bubble}>
                <div className={styles.typingIndicator}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className={styles.inputWrap}>
          <input
            type="text"
            className={styles.input}
            placeholder="Ask anything (e.g. explain gravity, write leave email)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={typing}
            id="ai-tutor-input"
          />
          <button type="submit" className={styles.sendBtn} disabled={!input.trim() || typing} id="ai-tutor-send">
            <FiSend />
          </button>
        </form>

        <div className={styles.footerNote}>
          <FiInfo /> Nexus AI generates educational explanations instantly. Double-check important facts.
        </div>
      </div>
    </div>
  );
}
