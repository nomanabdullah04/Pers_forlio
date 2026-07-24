// src/components/layout/Header.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiMenu, FiBell, FiSearch, FiSettings, FiLogOut } from 'react-icons/fi';
import styles from './Header.module.css';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { students }     = useData();
  const navigate         = useNavigate();

  const [notifOpen,   setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search,      setSearch]      = useState('');
  const notifRef   = useRef();
  const profileRef = useRef();

  // Get live notifications for this student
  const studentRecord = user?.role === 'student'
    ? students.find(s => s.email === user.email)
    : null;
  const notifs     = studentRecord?.notifications ?? [];
  const unreadCount = notifs.filter(n => !n.read).length;

  // Teacher mock notifs
  const TEACHER_NOTIFS = [
    { id:1, icon:'👥', text:'New student registered: Sabrina Akter (HSC)', time:'1h ago',  unread:true },
    { id:2, icon:'📝', text:'Exam "Physics MCQ" has 3 new submissions',   time:'3h ago',  unread:true },
    { id:3, icon:'⭐', text:'New 5-star review on Advanced Physics',        time:'1d ago',  unread:false },
  ];
  const displayNotifs = user?.role === 'teacher' ? TEACHER_NOTIFS : notifs.slice(0,4);
  const displayUnread = user?.role === 'teacher'
    ? TEACHER_NOTIFS.filter(n => n.unread).length
    : unreadCount;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const portalRoot = user?.role === 'teacher' ? '/teacher' : '/student';

  const displayName = user?.full_name ?? user?.fullName ?? 'User';
  const initials    = displayName[0] ?? 'U';

  return (
    <header className={styles.header}>
      {/* Left */}
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick} id="sidebar-toggle-btn">
          <FiMenu />
        </button>
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search courses, materials…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="portal-search"
          />
        </div>
      </div>

      {/* Right */}
      <div className={styles.right}>
        {/* Notifications */}
        <div className={styles.notifWrap} ref={notifRef}>
          <button
            className={styles.iconBtn}
            onClick={() => { setNotifOpen(p => !p); setProfileOpen(false); }}
            id="notif-btn"
          >
            <FiBell />
            {displayUnread > 0 && (
              <span className={styles.notifBadge}>{displayUnread > 9 ? '9+' : displayUnread}</span>
            )}
          </button>

          {notifOpen && (
            <div className={styles.notifDropdown}>
              <div className={styles.notifHeader}>
                <h4>Notifications</h4>
                {displayUnread > 0 && (
                  <button
                    className={styles.markAllBtn}
                    onClick={() => {
                      if (user?.role === 'student' && studentRecord) {
                        // handled by Notifications page; navigate there
                        navigate('/student/notifications');
                        setNotifOpen(false);
                      }
                    }}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className={styles.notifList}>
                {displayNotifs.length === 0 && (
                  <div style={{ padding:'1.5rem', textAlign:'center', color:'#4a5568', fontSize:'.82rem' }}>
                    No notifications
                  </div>
                )}
                {displayNotifs.map(n => (
                  <div key={n.id} className={`${styles.notifItem} ${(n.unread ?? !n.read) ? styles.unread : ''}`}>
                    <span className={styles.notifIcon}>{n.icon ?? '🔔'}</span>
                    <div className={styles.notifBody}>
                      <p>{n.text ?? n.title}</p>
                      <span>{n.time ?? 'recently'}</span>
                    </div>
                    {(n.unread ?? !n.read) && <div className={styles.unreadDot} />}
                  </div>
                ))}
              </div>
              <div className={styles.notifFooter}>
                <button
                  onClick={() => { navigate(user?.role === 'student' ? '/student/notifications' : '#'); setNotifOpen(false); }}
                >
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className={styles.profileWrap} ref={profileRef}>
          <button
            className={styles.profileBtn}
            onClick={() => { setProfileOpen(p => !p); setNotifOpen(false); }}
            id="profile-menu-btn"
          >
            <div className={styles.avatarSmall}>
              {user?.avatar
                ? <img src={user.avatar} alt="avatar" />
                : <span>{initials}</span>
              }
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{displayName}</span>
              <span className={styles.profileRole}>{user?.role}</span>
            </div>
            <span className={styles.arrow}>▾</span>
          </button>

          {profileOpen && (
            <div className={styles.profileDropdown}>
              <div className={styles.dropdownHeader}>
                <div className={styles.avatarMd}>
                  {user?.avatar
                    ? <img src={user.avatar} alt="avatar" />
                    : <span>{initials}</span>
                  }
                </div>
                <div>
                  <div className={styles.dropdownName}>{displayName}</div>
                  <div className={styles.dropdownEmail}>{user?.email}</div>
                </div>
              </div>
              <div className={styles.dropdownMenu}>
                <button onClick={() => { navigate(`${portalRoot}/settings`); setProfileOpen(false); }}>
                  <FiSettings /> Profile & Settings
                </button>
                <button
                  className={styles.logoutMenuItem}
                  onClick={() => { logout(); navigate('/student/login'); }}
                  id="header-logout-btn"
                >
                  <FiLogOut /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
