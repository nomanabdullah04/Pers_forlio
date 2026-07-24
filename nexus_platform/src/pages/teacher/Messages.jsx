// src/pages/teacher/Messages.jsx
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import styles from './Messages.module.css';

const INITIAL_CONVERSATIONS = {
  s1: [
    { sender: 'student', text: 'Hello sir! Can you share the slides for calculus?' },
    { sender: 'teacher', text: 'Sure! I have uploaded them to the Study Materials section.' }
  ],
  s2: [
    { sender: 'student', text: 'Assalamu alaikum sir, when is our next CQ physics quiz due?' },
    { sender: 'teacher', text: 'Wa alaikum assalam. It is scheduled for this Friday.' }
  ],
  s3: [
    { sender: 'student', text: 'Sir, I have a doubt in homework problem #4.' },
    { sender: 'teacher', text: 'Please send a photo of your workings, I will review it.' }
  ]
};

export default function TeacherMessages() {
  const { students } = useData();
  const [activeStudentId, setActiveStudentId] = useState('s1');
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [input, setInput] = useState('');

  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];
  const messages = conversations[activeStudentId] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const updatedMessages = [...messages, { sender: 'teacher', text: input }];
    setConversations(p => ({ ...p, [activeStudentId]: updatedMessages }));
    setInput('');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiMessageSquare /> Classroom Messaging Workspace</h1>
          <p className={styles.subtitle}>Send direct messages and answer academic queries for students.</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Contacts Sidebar */}
        <div className={styles.sidebar}>
          <h3>Student Chats</h3>
          <div className={styles.studentList}>
            {students.slice(0, 4).map(s => {
              const isActive = s.id === activeStudentId;
              const lastMsg = conversations[s.id]?.slice(-1)[0]?.text || 'No message history';
              return (
                <div
                  key={s.id}
                  className={`${styles.studentItem} ${isActive ? styles.activeItem : ''}`}
                  onClick={() => setActiveStudentId(s.id)}
                  id={`chat-${s.id}`}
                >
                  <div className={styles.avatar}>{(s.fullName || s.full_name || 'S')[0]}</div>
                  <div className={styles.studentInfo}>
                    <div className={styles.studentName}>{s.fullName || s.full_name}</div>
                    <div className={styles.lastMsg}>{lastMsg}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className={styles.chatWindow}>
          {activeStudent ? (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.headerAvatar}>{(activeStudent.fullName || activeStudent.full_name || 'S')[0]}</div>
                <div>
                  <div className={styles.headerName}>{activeStudent.fullName || activeStudent.full_name}</div>
                  <div className={styles.headerClass}>{activeStudent.classLevel === 'class-11-12' ? 'HSC Student' : 'SSC Student'}</div>
                </div>
              </div>

              <div className={styles.messageArea}>
                {messages.map((m, i) => {
                  const isTeacher = m.sender === 'teacher';
                  return (
                    <div key={i} className={`${styles.messageWrap} ${isTeacher ? styles.teacher : styles.student}`}>
                      <div className={styles.bubble}>{m.text}</div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSend} className={styles.inputWrap}>
                <input
                  type="text"
                  placeholder={`Reply to ${activeStudent.fullName || activeStudent.full_name}...`}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className={styles.input}
                  id="chat-reply-input"
                />
                <button type="submit" className={styles.sendBtn} id="chat-reply-send">
                  <FiSend /> Send
                </button>
              </form>
            </>
          ) : (
            <div className={styles.noActive}>
              <FiMessageSquare size={48} />
              <p>Select a student chat to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
