// src/pages/teacher/Sessions.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ClassBadge from '../../components/ui/ClassBadge';
import { FiVideo, FiPlus, FiClock, FiCalendar, FiTrash2, FiSave, FiTv } from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './Sessions.module.css';

const SEED_SESSIONS = [
  { id: 'se1', title: 'Advanced Physics — Mechanics & Waves Q&A', teacher: 'Dr. Kamal', classLevel: 'class-11-12', status: 'live', time: 'Active Now', url: 'https://www.youtube.com/embed/HfACrKJ_Y2w', duration: '60 min', subject: 'Physics' },
  { id: 'se2', title: 'Higher Math — Integration Tips & Tricks', teacher: 'Ms. Sadia', classLevel: 'class-11-12', status: 'upcoming', time: 'Tomorrow, 4:00 PM', duration: '90 min', subject: 'Math' },
  { id: 'se3', title: 'SSC Chemistry — Periodic Table Q&A', teacher: 'Mr. Rafiq', classLevel: 'class-9-10', status: 'live', time: 'Active Now', url: 'https://www.youtube.com/embed/HfACrKJ_Y2w', duration: '60 min', subject: 'Chemistry' },
  { id: 'se4', title: 'English Grammar — Common Mistakes', teacher: 'Ms. Nadia', classLevel: 'class-9-10', status: 'completed', time: 'Yesterday, 3:00 PM', duration: '50 min', subject: 'English' },
];

export default function TeacherSessions() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '', classLevel: 'class-11-12', date: '', time: '', duration: '60 min', subject: 'Physics'
  });

  useEffect(() => {
    const stored = localStorage.getItem('nx_sessions');
    if (stored) {
      setSessions(JSON.parse(stored));
    } else {
      localStorage.setItem('nx_sessions', JSON.stringify(SEED_SESSIONS));
      setSessions(SEED_SESSIONS);
    }
  }, []);

  const saveSessions = (updated) => {
    setSessions(updated);
    localStorage.setItem('nx_sessions', JSON.stringify(updated));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newSession.title.trim() || !newSession.date || !newSession.time) {
      toast.error('Please fill in all session details');
      return;
    }

    const sessionDateTime = `${newSession.date}, ${newSession.time}`;
    const added = {
      id: Math.random().toString(),
      title: newSession.title,
      teacher: user?.full_name || 'Dr. Kamal Hossain',
      classLevel: newSession.classLevel,
      status: 'upcoming',
      time: sessionDateTime,
      duration: newSession.duration,
      subject: newSession.subject,
      url: 'https://www.youtube.com/embed/HfACrKJ_Y2w'
    };

    const updated = [added, ...sessions];
    saveSessions(updated);
    toast.success('Live tutoring session scheduled successfully!');
    setShowForm(false);
    setNewSession({ title: '', classLevel: 'class-11-12', date: '', time: '', duration: '60 min', subject: 'Physics' });
  };

  const handleDelete = (id) => {
    const updated = sessions.filter(s => s.id !== id);
    saveSessions(updated);
    toast.success('Session deleted successfully!');
  };

  const handleStartLive = (id) => {
    const updated = sessions.map(s => s.id === id ? { ...s, status: 'live', time: 'Active Now' } : s);
    saveSessions(updated);
    toast.success(' Tutoring class is now LIVE!');
  };

  const handleEndLive = (id) => {
    const updated = sessions.map(s => s.id === id ? { ...s, status: 'completed', time: 'Ended' } : s);
    saveSessions(updated);
    toast.success('Tutoring class completed!');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiVideo /> Live Sessions Coordinator</h1>
          <p className={styles.subtitle}>Schedule, start, and delete live online virtual lectures for students.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowForm(!showForm)} id="toggle-session-form-btn">
          <FiPlus /> {showForm ? 'Cancel' : 'Schedule Live Session'}
        </button>
      </div>

      <div className={styles.container}>
        {showForm && (
          <div className={styles.formCard}>
            <h3>Schedule Live Tutoring Session</h3>
            <form onSubmit={handleCreate}>
              <div className={styles.formGroup}>
                <label>Class Topic / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Integration Techniques"
                  value={newSession.title}
                  onChange={e => setNewSession(p => ({ ...p, title: e.target.value }))}
                  required
                  id="session-title-input"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Subject</label>
                <select
                  value={newSession.subject}
                  onChange={e => setNewSession(p => ({ ...p, subject: e.target.value }))}
                  id="session-subject-select"
                >
                  <option value="Physics">Physics</option>
                  <option value="Math">Mathematics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Target Class Level</label>
                <select
                  value={newSession.classLevel}
                  onChange={e => setNewSession(p => ({ ...p, classLevel: e.target.value }))}
                  id="session-class-select"
                >
                  <option value="class-8">Class 8</option>
                  <option value="class-9-10">Class 9-10 (SSC)</option>
                  <option value="class-11-12">Class 11-12 (HSC)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Date</label>
                <input
                  type="date"
                  value={newSession.date}
                  onChange={e => setNewSession(p => ({ ...p, date: e.target.value }))}
                  required
                  id="session-date-input"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Time</label>
                <input
                  type="time"
                  value={newSession.time}
                  onChange={e => setNewSession(p => ({ ...p, time: e.target.value }))}
                  required
                  id="session-time-input"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Duration</label>
                <select
                  value={newSession.duration}
                  onChange={e => setNewSession(p => ({ ...p, duration: e.target.value }))}
                  id="session-duration-select"
                >
                  <option value="45 min">45 min</option>
                  <option value="60 min">60 min</option>
                  <option value="90 min">90 min</option>
                  <option value="120 min">120 min</option>
                </select>
              </div>

              <button type="submit" className={styles.submitBtn} id="save-session-btn">
                <FiSave /> Schedule Class
              </button>
            </form>
          </div>
        )}

        <div className={styles.listSection}>
          <h2>Scheduled & Active Classes</h2>
          <div className={styles.listGrid}>
            {sessions.length === 0 ? (
              <div className={styles.empty}>
                <span>📹</span>
                <p>No tutoring sessions scheduled. Click "Schedule Live Session" above to create one.</p>
              </div>
            ) : (
              sessions.map(s => (
                <div key={s.id} className={`${styles.card} ${styles[s.status]}`}>
                  <div className={styles.cardHeader}>
                    <ClassBadge value={s.classLevel} size="sm" />
                    <span className={`${styles.statusBadge} ${styles[`status_${s.status}`]}`}>
                      {s.status.toUpperCase()}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <h4>{s.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#8892b0' }}>Subject: <strong>{s.subject}</strong> | Duration: {s.duration}</p>
                    <p className={styles.timeVal}>📅 {s.time}</p>
                  </div>

                  <div className={styles.cardActions}>
                    {s.status === 'upcoming' && (
                      <button className={styles.startBtn} onClick={() => handleStartLive(s.id)} id={`start-${s.id}`}>
                        🚀 Start Live
                      </button>
                    )}
                    {s.status === 'live' && (
                      <button className={styles.endBtn} onClick={() => handleEndLive(s.id)} id={`end-${s.id}`}>
                        ⏹ End Live
                      </button>
                    )}
                    {s.status === 'completed' && (
                      <span className={styles.endedText}>Replay Available</span>
                    )}

                    <button className={styles.deleteBtn} onClick={() => handleDelete(s.id)} id={`delete-${s.id}`}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
