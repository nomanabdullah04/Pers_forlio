// src/pages/student/Sessions.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ClassBadge from '../../components/ui/ClassBadge';
import { FiVideo, FiClock, FiUser, FiPlay, FiX, FiCheckCircle } from 'react-icons/fi';
import styles from './Sessions.module.css';

const SEED_SESSIONS = [
  { id: 'se1', title: 'Advanced Physics — Mechanics & Waves Q&A', teacher: 'Dr. Kamal', classLevel: 'class-11-12', status: 'live', time: 'Active Now', url: 'https://www.youtube.com/embed/HfACrKJ_Y2w', duration: '60 min' },
  { id: 'se2', title: 'Higher Math — Integration Tips & Tricks', teacher: 'Ms. Sadia', classLevel: 'class-11-12', status: 'upcoming', time: 'Tomorrow, 4:00 PM', duration: '90 min' },
  { id: 'se3', title: 'SSC Chemistry — Periodic Table Q&A', teacher: 'Mr. Rafiq', classLevel: 'class-9-10', status: 'live', time: 'Active Now', url: 'https://www.youtube.com/embed/HfACrKJ_Y2w', duration: '60 min' },
  { id: 'se4', title: 'English Grammar — Common Mistakes', teacher: 'Ms. Nadia', classLevel: 'class-9-10', status: 'completed', time: 'Yesterday, 3:00 PM', duration: '50 min' },
  { id: 'se5', title: 'Class 8 Math — Algebra Foundation', teacher: 'Ms. Sadia', classLevel: 'class-8', status: 'live', time: 'Active Now', url: 'https://www.youtube.com/embed/HfACrKJ_Y2w', duration: '45 min' },
  { id: 'se6', title: 'Science General Q&A', teacher: 'Mr. Rafiq', classLevel: 'class-8', status: 'completed', time: '2 days ago', duration: '60 min' },
];

export default function StudentSessions() {
  const { user } = useAuth();
  const studentClass = user?.classLevel ?? user?.class_level ?? 'class-11-12';
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);

  useEffect(() => {
    // Load from local storage or fallback to seed list
    const stored = localStorage.getItem('nx_sessions');
    if (stored) {
      setSessions(JSON.parse(stored));
    } else {
      localStorage.setItem('nx_sessions', JSON.stringify(SEED_SESSIONS));
      setSessions(SEED_SESSIONS);
    }
  }, []);

  const classSessions = sessions.filter(s => s.classLevel === studentClass);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiVideo /> Live Tutoring Sessions</h1>
          <div className={styles.classInfo}>
            <span>Active Class:</span>
            <ClassBadge value={studentClass} size="md" />
            <span className={styles.count}>— {classSessions.length} classes scheduled</span>
          </div>
        </div>
      </div>

      <div className={styles.sessionsGrid}>
        {classSessions.length === 0 && (
          <div className={styles.empty}>
            <span>📭</span>
            <p>No live tutoring sessions scheduled yet for your class.</p>
          </div>
        )}

        {classSessions.map(session => (
          <div key={session.id} className={`${styles.card} ${styles[session.status]}`}>
            <div className={styles.cardStatus}>
              {session.status === 'live' && <span className={styles.liveBadge}><span className={styles.pulseDot}></span> LIVE NOW</span>}
              {session.status === 'upcoming' && <span className={styles.upcomingBadge}>UPCOMING</span>}
              {session.status === 'completed' && <span className={styles.completedBadge}>COMPLETED</span>}
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.title}>{session.title}</h3>
              <div className={styles.meta}>
                <span><FiUser /> {session.teacher}</span>
                <span><FiClock /> {session.duration}</span>
              </div>
              <div className={styles.timeTag}>
                📅 {session.time}
              </div>
            </div>

            <div className={styles.cardFooter}>
              {session.status === 'live' && (
                <button
                  className={styles.joinBtn}
                  onClick={() => setActiveSession(session)}
                  id={`join-${session.id}`}
                >
                  <FiPlay /> Join Live Class
                </button>
              )}
              {session.status === 'upcoming' && (
                <button className={styles.notifyBtn} disabled id={`notify-${session.id}`}>
                  🔔 Set Reminder
                </button>
              )}
              {session.status === 'completed' && (
                <button
                  className={styles.replayBtn}
                  onClick={() => setActiveSession({ ...session, title: `${session.title} (Recorded Replay)` })}
                  id={`replay-${session.id}`}
                >
                  <FiPlay /> Watch Replay
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Classroom Video Iframe Modal */}
      {activeSession && (
        <div className={styles.overlay} onClick={() => setActiveSession(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalIndicator}>🟢 Interactive Lecture Screen</span>
                <h3>{activeSession.title}</h3>
              </div>
              <button className={styles.closeBtn} onClick={() => setActiveSession(null)} id="close-classroom"><FiX /></button>
            </div>
            <div className={styles.contentArea}>
              <div className={styles.videoPane}>
                <iframe
                  src={activeSession.url || 'https://www.youtube.com/embed/HfACrKJ_Y2w'}
                  title={activeSession.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className={styles.chatPane}>
                <div className={styles.chatHeader}>Classroom Live Chat 💬</div>
                <div className={styles.chatMessages}>
                  <div className={styles.msg}><span className={styles.user}>System:</span> Class started! Welcome everyone.</div>
                  <div className={styles.msg}><span className={styles.user}>Ayesha:</span> Assalamu Alaikum sir, can you explain slide 4 again?</div>
                  <div className={styles.msg}><span className={styles.user}>Teacher:</span> Sure, let me load slide 4 for you.</div>
                  <div className={styles.msg}><span className={styles.user}>Rahim:</span> The sound is clear now. Thank you.</div>
                </div>
                <div className={styles.chatInputWrap}>
                  <input type="text" placeholder="Send a message to class..." className={styles.chatInput} disabled />
                  <button className={styles.sendBtn} disabled>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
