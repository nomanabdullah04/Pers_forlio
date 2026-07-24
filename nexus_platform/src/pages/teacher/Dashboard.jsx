// src/pages/teacher/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  FiUsers, FiBook, FiDollarSign, FiStar, FiTrendingUp,
  FiCalendar, FiPlusCircle, FiVideo, FiChevronRight, FiEdit2,
  FiMessageSquare, FiBarChart2, FiCheckCircle, FiAlertCircle, FiFileText
} from 'react-icons/fi';
import styles from './TeacherDashboard.module.css';

const MONTHLY_LECTURES = [
  { month:'Jan', lectures: 24 },
  { month:'Feb', lectures: 32 },
  { month:'Mar', lectures: 28 },
  { month:'Apr', lectures: 42 },
  { month:'May', lectures: 50 },
  { month:'Jun', lectures: 48 },
  { month:'Jul', lectures: 55 },
];

const STUDENT_ACTIVITY = [
  { day:'Mon', active: 145, new: 12 },
  { day:'Tue', active: 178, new: 18 },
  { day:'Wed', active: 134, new: 9  },
  { day:'Thu', active: 198, new: 22 },
  { day:'Fri', active: 210, new: 28 },
  { day:'Sat', active: 167, new: 15 },
  { day:'Sun', active: 132, new: 11 },
];

const COURSE_PERF = [
  { name:'Physics', students:142, rating:4.9, chapters:18, color:'#64ffda' },
  { name:'Chemistry', students:98,  rating:4.7, chapters:14, color:'#a78bfa' },
  { name:'Math',    students:87,  rating:4.8, chapters:16, color:'#fb923c' },
  { name:'Biology', students:115, chapters:12, rating:4.6, color:'#34d399' },
];

const RECENT_REVIEWS = [
  { id:1, student:'Ayesha R.', course:'Advanced Physics', rating:5, text:'"Excellent explanations! The live sessions are incredibly helpful."', time:'2h ago' },
  { id:2, student:'Rahim K.', course:'Chemistry',        rating:5, text:'"Best chemistry course I\'ve ever taken. Very detailed."',         time:'5h ago' },
  { id:3, student:'Priya S.', course:'Higher Math',      rating:4, text:'"Great content. Would love more practice problems."',            time:'1d ago' },
];

const UPCOMING = [
  { id:1, title:'Physics Live Q&A',    students:45, time:'Today, 4:00 PM',    type:'live'   },
  { id:2, title:'Chemistry Problem Set', students:32, time:'Tomorrow, 3:30 PM', type:'session'},
  { id:3, title:'Math Workshop',        students:28, time:'Thu, 5:00 PM',      type:'session'},
];

const CATEGORY_DATA = [
  { name:'Physics',   value:142, color:'#64ffda' },
  { name:'Chemistry', value:98,  color:'#a78bfa' },
  { name:'Math',      value:87,  color:'#fb923c' },
  { name:'Biology',   value:115, color:'#34d399' },
];

const StatCard = ({ icon, label, value, sub, color, trend }) => (
  <div className={styles.statCard} style={{ '--accent': color }}>
    <div className={styles.statTop}>
      <div className={styles.statIcon}>{icon}</div>
      {trend !== undefined && (
        <div className={`${styles.statTrend} ${trend >= 0 ? styles.up : styles.down}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className={styles.statValue}>{value}</div>
    <div className={styles.statLabel}>{label}</div>
    {sub && <div className={styles.statSub}>{sub}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
  return null;
};

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { students, materials, assessments } = useData();
  const firstName = user?.full_name?.split(' ')[0] ?? 'Teacher';
  const [earningPeriod, setEarningPeriod] = useState('monthly');

  // Compute dynamic stats
  const totalStudents = students.length;
  const activeCourses = [...new Set(materials.map(m => m.subject))].length || 4;
  const totalUploaded = materials.length;
  const totalExams = assessments.length;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.verifiedPill}>
            <FiCheckCircle /> Verified Educator
          </div>
          <h1>Welcome back, {firstName} 👩‍🏫</h1>
          <p>Your impact: <strong>{totalStudents} students</strong> learning across <strong>{activeCourses} courses</strong> this month.</p>
          <div className={styles.heroCta}>
            <Link to="/teacher/upload-material" className={styles.ctaPrimary}><FiPlusCircle /> Upload Lecture</Link>
            <Link to="/teacher/sessions" className={styles.ctaSecondary}><FiVideo /> Schedule Session</Link>
            <Link to="/teacher/students" className={styles.ctaGhost}><FiUsers /> View Registry</Link>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.heroStatItem}>
            <span className={styles.heroStatVal}>{totalUploaded}</span>
            <span className={styles.heroStatLabel}>Lectures</span>
          </div>
          <div className={styles.heroStatDiv} />
          <div className={styles.heroStatItem}>
            <span className={styles.heroStatVal}>{totalExams}</span>
            <span className={styles.heroStatLabel}>Exams Created</span>
          </div>
          <div className={styles.heroStatDiv} />
          <div className={styles.heroStatItem}>
            <span className={styles.heroStatVal}>{totalStudents}</span>
            <span className={styles.heroStatLabel}>Students</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className={styles.statsRow}>
        <StatCard icon={<FiUsers />}      label="Total Students"    value={totalStudents}      sub="Active Registry"    color="#64ffda" />
        <StatCard icon={<FiBook />}       label="Active Subjects"    value={activeCourses}        sub="Available"       color="#a78bfa" />
        <StatCard icon={<FiFileText />} label="Uploaded Materials"  value={totalUploaded}  sub="PDFs & Video Lectures"  color="#fb923c" />
        <StatCard icon={<FiStar />}       label="Exams Created" value={totalExams}    sub="MCQs, CQs, PDFs" color="#34d399" />
        <StatCard icon={<FiVideo />}      label="Sessions This Month" value="18"     sub="3 upcoming"       color="#60a5fa" />
        <StatCard icon={<FiBarChart2 />}  label="Completion Rate"   value="78%"      sub="Industry avg: 62%" color="#f472b6" />
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Lectures Chart */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3><FiVideo /> Lectures Conducted</h3>
            <span className={styles.cardBadge}>Active Semester</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_LECTURES} margin={{ top:5, right:10, bottom:0, left:0 }}>
              <defs>
                <linearGradient id="lectureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill:'#8892b0', fontSize:12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#8892b0', fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="lectures" name="Lectures Conducted" stroke="#a78bfa" strokeWidth={2.5} fill="url(#lectureGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Student Activity */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3><FiTrendingUp /> Student Activity</h3>
            <span className={styles.cardBadge}>This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={STUDENT_ACTIVITY} margin={{ top:5, right:10, bottom:0, left:-20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill:'#8892b0', fontSize:12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#8892b0', fontSize:12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="active" name="Active" fill="#64ffda" radius={[4,4,0,0]} fillOpacity={0.8} />
              <Bar dataKey="new"    name="New"    fill="#a78bfa" radius={[4,4,0,0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Middle section */}
      <div className={styles.midRow}>
        {/* Course Performance */}
        <div className={styles.courseTable}>
          <div className={styles.cardHeader}>
            <h3><FiBook /> Course Performance</h3>
            <Link to="/teacher/courses" className={styles.viewAll}>Manage →</Link>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Chapters</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {COURSE_PERF.map(c => (
                <tr key={c.name}>
                  <td>
                    <div className={styles.courseName}>
                      <span className={styles.colorDot} style={{ background: c.color }} />
                      {c.name}
                    </div>
                  </td>
                  <td><span className={styles.badge}>{c.students}</span></td>
                  <td>
                    <span className={styles.ratingBadge}>⭐ {c.rating}</span>
                  </td>
                  <td><span className={styles.revBadge}>{c.chapters} Chapters</span></td>
                  <td>
                    <button className={styles.editBtn}><FiEdit2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Distribution Pie */}
        <div className={styles.pieCard}>
          <div className={styles.cardHeader}>
            <h3>Student Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {CATEGORY_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background:'#1e3a5f', border:'1px solid rgba(100,255,218,0.2)', borderRadius:'10px', color:'#e6f1ff', fontSize:'12px' }} />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color:'#8892b0', fontSize:'12px' }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        {/* Upcoming Sessions */}
        <div className={styles.upcomingCard}>
          <div className={styles.cardHeader}>
            <h3><FiCalendar /> Upcoming Sessions</h3>
            <Link to="/teacher/sessions" className={styles.viewAll}>View all →</Link>
          </div>
          <div className={styles.upcomingList}>
            {UPCOMING.map(s => (
              <div key={s.id} className={styles.upcomingItem}>
                <div className={styles.upcomingIcon}>
                  {s.type === 'live' ? <FiVideo /> : <FiCalendar />}
                </div>
                <div className={styles.upcomingBody}>
                  <div className={styles.upcomingTitle}>{s.title}</div>
                  <div className={styles.upcomingMeta}>{s.students} students · {s.time}</div>
                </div>
                {s.type === 'live' && <div className={styles.livePill}>🔴 LIVE</div>}
                <button className={styles.startBtn}><FiChevronRight /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className={styles.reviewsCard}>
          <div className={styles.cardHeader}>
            <h3><FiStar /> Recent Reviews</h3>
            <span className={styles.cardBadge}>4.9 Avg</span>
          </div>
          <div className={styles.reviewList}>
            {RECENT_REVIEWS.map(r => (
              <div key={r.id} className={styles.reviewItem}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewAvatar}>{r.student[0]}</div>
                  <div>
                    <div className={styles.reviewName}>{r.student}</div>
                    <div className={styles.reviewCourse}>{r.course}</div>
                  </div>
                  <div className={styles.reviewStars}>
                    {'⭐'.repeat(r.rating)}
                  </div>
                  <div className={styles.reviewTime}>{r.time}</div>
                </div>
                <p className={styles.reviewText}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div className={styles.qaGrid}>
          {[
            { to:'/teacher/upload-material',  icon:<FiPlusCircle />,    label:'Upload Material',    color:'#64ffda' },
            { to:'/teacher/create-exam',    icon:<FiEdit2 />,          label:'Create Exam',      color:'#a78bfa' },
            { to:'/teacher/sessions',    icon:<FiVideo />,          label:'Start Live',       color:'#fb923c' },
            { to:'/teacher/messages',    icon:<FiMessageSquare />,  label:'Messages',         color:'#34d399', badge:3 },
            { to:'/teacher/analytics',   icon:<FiBarChart2 />,      label:'Analytics',        color:'#60a5fa' },
            { to:'/teacher/earnings',    icon:<FiDollarSign />,     label:'Earnings',         color:'#f472b6' },
          ].map(q => (
            <Link key={q.to} to={q.to} className={styles.qaCard} style={{ '--qc': q.color }}>
              <div className={styles.qaIcon}>{q.icon}</div>
              <span>{q.label}</span>
              {q.badge && <div className={styles.qaBadge}>{q.badge}</div>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
