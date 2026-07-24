// src/pages/teacher/Analytics.jsx
import { useData } from '../../context/DataContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { FiBarChart2, FiUsers, FiTrendingUp, FiCheckSquare } from 'react-icons/fi';
import styles from './Analytics.module.css';

export default function TeacherAnalytics() {
  const { students, assessments } = useData();

  // Dynamic calculations
  const totalStudents = students.length;
  
  // Calculate average score across all student exam submissions
  let totalScoreSum = 0;
  let totalSubmissionsCount = 0;
  
  assessments.forEach(exam => {
    if (exam.submissions) {
      exam.submissions.forEach(sub => {
        totalScoreSum += sub.score || 0;
        totalSubmissionsCount++;
      });
    }
  });

  const averageClassScore = totalSubmissionsCount > 0 
    ? Math.round((totalScoreSum / (totalSubmissionsCount * 100)) * 100) 
    : 82; // Fallback score average

  // Map student counts per class level
  const classLevelsCount = students.reduce((acc, curr) => {
    const lvl = curr.classLevel === 'class-8' ? 'Class 8' : curr.classLevel === 'class-9-10' ? 'SSC' : 'HSC';
    acc[lvl] = (acc[lvl] || 0) + 1;
    return acc;
  }, {});

  const distributionData = Object.keys(classLevelsCount).map(key => ({
    name: key,
    students: classLevelsCount[key]
  }));

  // Mock performance trend data
  const trendData = [
    { exam: 'Quiz 1', avg: 72 },
    { exam: 'Quiz 2', avg: 78 },
    { exam: 'Quiz 3', avg: 85 },
    { exam: 'Quiz 4', avg: 81 },
    { exam: 'Mid-term', avg: averageClassScore },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiBarChart2 /> Academic Performance Analytics</h1>
          <p className={styles.subtitle}>Track classroom exam metrics, class averages, and student enrollment trends.</p>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(100,255,218,0.1)', color: '#64ffda' }}>
            <FiUsers />
          </div>
          <div>
            <div className={styles.statVal}>{totalStudents}</div>
            <div className={styles.statLabel}>Enrolled Students</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(124,58,237,0.1)', color: '#a78bfa' }}>
            <FiTrendingUp />
          </div>
          <div>
            <div className={styles.statVal}>{averageClassScore}%</div>
            <div className={styles.statLabel}>Class Exam Average</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
            <FiCheckSquare />
          </div>
          <div>
            <div className={styles.statVal}>{totalSubmissionsCount}</div>
            <div className={styles.statLabel}>Total Test Submissions</div>
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        {/* Class distribution */}
        <div className={styles.chartCard}>
          <h3>Student Distribution by Class</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={distributionData.length > 0 ? distributionData : [{ name: 'HSC', students: 4 }, { name: 'SSC', students: 3 }]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#8892b0', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892b0', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#112240', border: '1px solid rgba(100,255,218,0.2)', color: '#e6f1ff' }} />
              <Bar dataKey="students" fill="#64ffda" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Score trend */}
        <div className={styles.chartCard}>
          <h3>Exam Performance Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="exam" tick={{ fill: '#8892b0', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892b0', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: '#112240', border: '1px solid rgba(124,58,237,0.2)', color: '#e6f1ff' }} />
              <Area type="monotone" dataKey="avg" name="Class Average" stroke="#a78bfa" strokeWidth={2} fill="url(#scoreGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
