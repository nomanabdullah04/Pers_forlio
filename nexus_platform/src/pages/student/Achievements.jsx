// src/pages/student/Achievements.jsx
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiAward, FiStar, FiZap, FiTarget, FiTrendingUp } from 'react-icons/fi';
import styles from './Achievements.module.css';

const BADGES = [
  { id: 'b1', name: 'Fast Learner', desc: 'View 5 study materials', icon: '⚡', unlocked: true, target: 5, current: 5 },
  { id: 'b2', name: 'Quiz Master', desc: 'Score 90% or above in any quiz', icon: '🏆', unlocked: true, target: 1, current: 1 },
  { id: 'b3', name: 'Streak Legend', desc: 'Maintain a 7-day learning streak', icon: '🔥', unlocked: true, target: 7, current: 7 },
  { id: 'b4', name: 'Calculus Conqueror', desc: 'Complete all Math calculus chapters', icon: '📐', unlocked: false, target: 4, current: 2 },
  { id: 'b5', name: 'Physics Pioneer', desc: 'Attempt all Physics exams', icon: '⚛️', unlocked: false, target: 3, current: 1 },
  { id: 'b6', name: 'Perfect Scholar', desc: 'Score 100% on a CQ written test', icon: '🌟', unlocked: false, target: 1, current: 0 },
];

export default function StudentAchievements() {
  const { user } = useAuth();
  const { students } = useData();

  // Find current student
  const student = students.find(s => s.email === user?.email) || user;
  const studentXp = student?.xp_points ?? 1240;

  // Add dummy XP points to other students in the seed so the leaderboard is populated dynamically
  const leaderboardData = students
    .map(s => {
      // Seed XP points dynamically if not present
      let xp = s.xp_points;
      if (!xp) {
        if (s.email === 'ayesha@student.com') xp = 1520;
        else if (s.email === 'rahim@student.com') xp = 1100;
        else if (s.email === 'priya@student.com') xp = 950;
        else if (s.email === 'karim@student.com') xp = 1350;
        else if (s.email === 'sabrina@student.com') xp = 820;
        else if (s.email === 'touhid@student.com') xp = 450;
        else xp = 600;
      }
      // If s is the current logged-in user, use their actual studentXp
      if (s.email === student.email) {
        xp = studentXp;
      }
      return {
        id: s.id,
        name: s.fullName || s.full_name || 'Anonymous Student',
        email: s.email,
        xp,
        classLevel: s.classLevel || 'class-11-12',
      };
    })
    .sort((a, b) => b.xp - a.xp);

  // Find current student's rank
  const myRank = leaderboardData.findIndex(item => item.email === student.email) + 1;

  const unlockedBadges = BADGES.filter(b => b.unlocked).length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiAward /> Achievements & Rank List</h1>
          <p className={styles.subtitle}>Track your learning milestones and compare your rank with other peers.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(100,255,218,0.1)', color: '#64ffda' }}>
            <FiZap />
          </div>
          <div>
            <div className={styles.statVal}>{studentXp} XP</div>
            <div className={styles.statLabel}>Total Points</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(124,58,237,0.1)', color: '#a78bfa' }}>
            <FiAward />
          </div>
          <div>
            <div className={styles.statVal}>{unlockedBadges} / {BADGES.length}</div>
            <div className={styles.statLabel}>Badges Unlocked</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
            <FiTarget />
          </div>
          <div>
            <div className={styles.statVal}>#{myRank}</div>
            <div className={styles.statLabel}>Leaderboard Rank</div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Badges Section */}
        <div className={styles.badgesSection}>
          <h2>Badges & Milestones</h2>
          <div className={styles.badgesGrid}>
            {BADGES.map(badge => (
              <div key={badge.id} className={`${styles.badgeCard} ${!badge.unlocked ? styles.locked : ''}`}>
                <div className={styles.badgeEmoji}>{badge.icon}</div>
                <div className={styles.badgeDetails}>
                  <div className={styles.badgeName}>{badge.name}</div>
                  <div className={styles.badgeDesc}>{badge.desc}</div>
                  <div className={styles.progressBarWrap}>
                    <div className={styles.progressBar} style={{ width: `${(badge.current / badge.target) * 100}%` }} />
                  </div>
                  <div className={styles.progressText}>{badge.current} / {badge.target} completed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className={styles.leaderboardSection}>
          <h2>Peer Leaderboard</h2>
          <div className={styles.leaderboardCard}>
            <div className={styles.leaderboardHeader}>
              <span>Rank</span>
              <span>Student</span>
              <span>XP Points</span>
            </div>
            <div className={styles.leaderboardList}>
              {leaderboardData.map((item, index) => {
                const isMe = item.email === student.email;
                return (
                  <div key={item.id} className={`${styles.leaderboardItem} ${isMe ? styles.activeRow : ''}`}>
                    <div className={styles.rankCol}>
                      {index === 0 && <span className={styles.gold}>🥇</span>}
                      {index === 1 && <span className={styles.silver}>🥈</span>}
                      {index === 2 && <span className={styles.bronze}>🥉</span>}
                      {index > 2 && <span className={styles.rankNum}>{index + 1}</span>}
                    </div>
                    <div className={styles.nameCol}>
                      <span className={styles.studentName}>{item.name}</span>
                      {isMe && <span className={styles.meBadge}>YOU</span>}
                    </div>
                    <div className={styles.xpCol}>
                      <strong>{item.xp}</strong> <span style={{ color: '#8892b0', fontSize: '0.75rem' }}>XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
