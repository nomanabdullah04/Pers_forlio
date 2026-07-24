// src/pages/student/Notifications.jsx
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { FiBell, FiCheck, FiCheckCircle, FiBook, FiEdit2, FiInfo } from 'react-icons/fi';
import styles from './Notifications.module.css';

const TYPE_ICONS = {
  material: <FiBook />,
  exam:     <FiEdit2 />,
  welcome:  '🎉',
  info:     <FiInfo />,
};
const TYPE_COLORS = {
  material: '#64ffda',
  exam:     '#a78bfa',
  welcome:  '#fb923c',
  info:     '#60a5fa',
};

function fmtTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60)   return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff/3600)}h ago`;
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short' });
}

export default function Notifications() {
  const { user } = useAuth();
  const { students, markNotifRead, markAllRead } = useData();

  const studentRecord = students.find(s => s.email === user?.email);
  const notifs = studentRecord?.notifications ?? [];
  const unread = notifs.filter(n => !n.read).length;

  const handleMarkAll = () => {
    if (studentRecord) markAllRead(studentRecord.id);
  };

  const handleRead = (nid) => {
    if (studentRecord) markNotifRead(studentRecord.id, nid);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiBell /> Notifications</h1>
          <p>{unread > 0 ? <><strong className={styles.unreadBadge}>{unread} unread</strong> notifications</> : 'All caught up!'}</p>
        </div>
        {unread > 0 && (
          <button className={styles.markAllBtn} onClick={handleMarkAll} id="mark-all-read-btn">
            <FiCheckCircle /> Mark all as read
          </button>
        )}
      </div>

      {notifs.length === 0 && (
        <div className={styles.empty}>
          <span>🔔</span>
          <p>No notifications yet. Your teacher will notify you when new content is posted.</p>
        </div>
      )}

      <div className={styles.notifList}>
        {notifs.map(n => (
          <div
            key={n.id}
            id={`notif-${n.id}`}
            className={`${styles.notifItem} ${!n.read ? styles.unread : ''}`}
            style={{ '--nc': TYPE_COLORS[n.type] ?? '#8892b0' }}
            onClick={() => !n.read && handleRead(n.id)}
          >
            <div className={styles.notifDot} />
            <div className={styles.notifIcon}>
              {typeof TYPE_ICONS[n.type] === 'string'
                ? <span>{TYPE_ICONS[n.type]}</span>
                : TYPE_ICONS[n.type] ?? <FiInfo />
              }
            </div>
            <div className={styles.notifBody}>
              <div className={styles.notifTitle}>{n.title}</div>
              <div className={styles.notifText}>{n.body}</div>
              <div className={styles.notifTime}>{fmtTime(n.time)}</div>
            </div>
            {!n.read && (
              <button
                className={styles.readBtn}
                onClick={e => { e.stopPropagation(); handleRead(n.id); }}
                title="Mark as read"
              >
                <FiCheck />
              </button>
            )}
            {n.read && <div className={styles.readMark}><FiCheckCircle /></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
