// src/components/layout/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  FiHome, FiBook, FiVideo, FiBarChart2, FiFileText,
  FiMessageSquare, FiSettings, FiLogOut, FiUsers,
  FiDollarSign, FiCalendar, FiAward, FiPlusCircle, FiCpu,
  FiBell, FiUploadCloud, FiEdit2, FiList
} from 'react-icons/fi';
import styles from './Sidebar.module.css';

const STUDENT_MENU = [
  { label: 'MAIN', items: [
    { to: '/student/dashboard',    icon: <FiHome />,        label: 'Dashboard'     },
    { to: '/student/courses',      icon: <FiBook />,        label: 'My Courses'    },
    { to: '/student/materials',    icon: <FiFileText />,    label: 'Study Materials' },
    { to: '/student/exams',        icon: <FiEdit2 />,       label: 'Exams'         },
    { to: '/student/sessions',     icon: <FiVideo />,       label: 'Live Sessions', badge: 2, badgeType: 'rose' },
  ]},
  { label: 'TOOLS', items: [
    { to: '/student/notifications',icon: <FiBell />,        label: 'Notifications', badgeKey: 'unread' },
    { to: '/student/ai-tutor',     icon: <FiCpu />,         label: 'AI Tutor',     badge: 'NEW', badgeType: 'cyan' },
    { to: '/student/achievements', icon: <FiAward />,       label: 'Achievements'  },
  ]},
  { label: 'ACCOUNT', items: [
    { to: '/student/settings',     icon: <FiSettings />,    label: 'Settings'      },
  ]},
];

const TEACHER_MENU = [
  { label: 'MAIN', items: [
    { to: '/teacher/dashboard',      icon: <FiHome />,        label: 'Dashboard'       },
    { to: '/teacher/students',       icon: <FiUsers />,       label: 'Student Registry'},
    { to: '/teacher/courses',        icon: <FiBook />,        label: 'My Courses'      },
    { to: '/teacher/sessions',       icon: <FiVideo />,       label: 'Live Sessions'   },
  ]},
  { label: 'CREATE', items: [
    { to: '/teacher/upload-material',icon: <FiUploadCloud />, label: 'Upload Material' },
    { to: '/teacher/create-exam',    icon: <FiEdit2 />,       label: 'Create Exam'     },
    { to: '/teacher/exams',          icon: <FiList />,        label: 'Exam Manager'    },
  ]},
  { label: 'INSIGHTS', items: [
    { to: '/teacher/analytics',      icon: <FiBarChart2 />,   label: 'Analytics'       },
    { to: '/teacher/schedule',       icon: <FiCalendar />,    label: 'Schedule'        },
  ]},
  { label: 'ACCOUNT', items: [
    { to: '/teacher/messages',       icon: <FiMessageSquare />, label: 'Messages', badge: 3, badgeType: 'rose' },
    { to: '/teacher/settings',       icon: <FiSettings />,    label: 'Settings'        },
  ]},
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const { students }     = useData();
  const navigate         = useNavigate();

  const menu = user?.role === 'teacher' ? TEACHER_MENU : STUDENT_MENU;

  // Count unread notifications for this student
  const studentRecord = user?.role === 'student'
    ? students.find(s => s.email === user.email)
    : null;
  const unreadCount = studentRecord?.notifications?.filter(n => !n.read).length ?? 0;

  const handleLogout = () => {
    logout();
    navigate('/student/login');
  };

  const getBadge = (item) => {
    if (item.badgeKey === 'unread') return unreadCount > 0 ? unreadCount : null;
    return item.badge ?? null;
  };
  const getBadgeType = (item) => {
    if (item.badgeKey === 'unread') return 'rose';
    return item.badgeType ?? 'cyan';
  };

  return (
    <>
      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`} onClick={onClose} />
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>N×</div>
          <div>
            <div className={styles.brandName}>Nexus<span>Lab</span></div>
            <div className={styles.brandRole}>
              {user?.role === 'teacher' ? '👩‍🏫 Teacher Portal' : '🎓 Student Portal'}
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>
            {user?.avatar
              ? <img src={user.avatar} alt="avatar" />
              : <span>{(user?.full_name ?? user?.fullName ?? 'U')[0]}</span>
            }
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.full_name ?? user?.fullName ?? 'User'}</div>
            <div className={styles.userEmail}>{user?.email}</div>
            {user?.role === 'teacher' && (
              <div className={styles.verifiedBadge}><span>✓ Verified</span></div>
            )}
            {user?.role === 'student' && studentRecord?.classLevel && (
              <div className={styles.classBadgeSm} style={{
                color: ['#34d399','#60a5fa','#a78bfa'][['class-8','class-9-10','class-11-12'].indexOf(studentRecord.classLevel)],
              }}>
                {['Class 8','SSC (9-10)','HSC (11-12)'][['class-8','class-9-10','class-11-12'].indexOf(studentRecord.classLevel)]}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {menu.map(section => (
            <div key={section.label} className={styles.navSection}>
              <div className={styles.sectionLabel}>{section.label}</div>
              {section.items.map(item => {
                const badge = getBadge(item);
                const badgeType = getBadgeType(item);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                    onClick={onClose}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    {badge && (
                      <span className={`${styles.navBadge} ${styles[`badge_${badgeType}`]}`}>
                        {badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout} id="sidebar-logout-btn">
            <FiLogOut /> Sign Out
          </button>
          <div className={styles.versionTag}>v2.0.0 — Nexus Learning Lab</div>
        </div>
      </aside>
    </>
  );
}
