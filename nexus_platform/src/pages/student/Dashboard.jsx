// src/pages/student/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  FiBook, FiVideo, FiPlay, FiCheckCircle, FiPlus, FiTrash2, FiZap, FiChevronRight, FiFolder
} from 'react-icons/fi';
import styles from './Dashboard.module.css';

export const BANGLADESH_SYLLABUS = {
  'class-8': [
    { id: 801, title: 'Class 8 General Mathematics (গণিত)', teacher: 'Ms. Sadia Islam', subject: 'Math', color: '#64ffda', thumb: '📐', description: 'NCTB Class 8 Math — Algebra, Geometry, Arithmetic, & Pattern.' },
    { id: 802, title: 'Class 8 General Science (সাধারণ বিজ্ঞান)', teacher: 'Dr. Kamal Hossain', subject: 'Science', color: '#a78bfa', thumb: '🔬', description: 'Fundamental principles of Physics, Chemistry, and Biology for Class 8.' },
    { id: 803, title: 'Class 8 English (Grammar & Composition)', teacher: 'Ms. Nadia Ahmed', subject: 'English', color: '#34d399', thumb: '📖', description: 'NCTB English Grammar, Comprehension, & Composition.' },
    { id: 804, title: 'Class 8 Bangla 1st & 2nd Paper (বাংলা)', teacher: 'Mr. Rafiqul Islam', subject: 'Bangla', color: '#fb923c', thumb: '📝', description: 'Sahitya Konika, Anondopath, and Bangla Byakoron.' },
    { id: 805, title: 'Class 8 ICT (তথ্য ও যোগাযোগ প্রযুক্তি)', teacher: 'Mr. Tanvir Rahman', subject: 'ICT', color: '#60a5fa', thumb: '💻', description: 'Computer fundamentals, internet safety, and spreadsheeting.' },
    { id: 806, title: 'Class 8 Bangladesh & Global Studies (BGS)', teacher: 'Dr. Farhan Alam', subject: 'BGS', color: '#f472b6', thumb: '🌏', description: 'History, culture, liberation war, & civic responsibility.' },
  ],

  'class-9-10': [
    { id: 901, title: 'SSC Physics (পদার্থবিজ্ঞান)', teacher: 'Dr. Kamal Hossain', subject: 'Physics', group: 'Science', color: '#64ffda', thumb: '⚛️', description: 'NCTB SSC Physics — Motion, Force, Work, Electricity, Light, & Modern Physics.' },
    { id: 902, title: 'SSC Chemistry (রসায়ন)', teacher: 'Mr. Rafiqul Islam', subject: 'Chemistry', group: 'Science', color: '#fb923c', thumb: '🧪', description: 'SSC Chemistry — Atomic structure, periodic table, chemical bonds, & reactions.' },
    { id: 903, title: 'SSC Higher Mathematics (উচ্চতর গণিত)', teacher: 'Ms. Sadia Islam', subject: 'Higher Math', group: 'Science', color: '#a78bfa', thumb: '📐', description: 'SSC Higher Math — Set & function, algebra, trigonometry, & coordinate geometry.' },
    { id: 904, title: 'SSC Biology (জীববিজ্ঞান)', teacher: 'Dr. Farhan Alam', subject: 'Biology', group: 'Science', color: '#34d399', thumb: '🔬', description: 'SSC Biology — Cells, genetics, ecology, and human body systems.' },
    { id: 905, title: 'SSC General Mathematics (সাধারণ গণিত)', teacher: 'Ms. Sadia Islam', subject: 'Math', group: 'General', color: '#60a5fa', thumb: '📊', description: 'Core General Mathematics syllabus for SSC.' },
    { id: 906, title: 'SSC ICT (তথ্য ও যোগাযোগ প্রযুক্তি)', teacher: 'Mr. Tanvir Rahman', subject: 'ICT', group: 'General', color: '#38bdf8', thumb: '💻', description: 'Database, web programming, & IT fundamentals for SSC.' },
    { id: 907, title: 'SSC Accounting (হিসাববিজ্ঞান)', teacher: 'Mr. Naimur Rahman', subject: 'Accounting', group: 'Commerce', color: '#f59e0b', thumb: '🧾', description: 'SSC Accounting — Journal, ledger, trial balance, and financial statement.' },
    { id: 908, title: 'SSC History of Bangladesh (বাংলাদেশের ইতিহাস)', teacher: 'Dr. Anisur Rahman', subject: 'History', group: 'Arts', color: '#f472b6', thumb: '🏛️', description: 'History of Bengal, 1952 Language Movement, & 1971 Liberation War.' },
  ],

  'class-11-12': [
    { id: 1101, title: 'HSC Physics 1st & 2nd Paper (পদার্থবিজ্ঞান)', teacher: 'Dr. Kamal Hossain', subject: 'Physics', group: 'Science', color: '#64ffda', thumb: '⚛️', description: 'HSC Physics — Vectors, Thermodynamics, Electricity, Magnetism, Optics, & Quantum Physics.' },
    { id: 1102, title: 'HSC Chemistry 1st & 2nd Paper (রসায়ন)', teacher: 'Mr. Rafiqul Islam', subject: 'Chemistry', group: 'Science', color: '#fb923c', thumb: '🧪', description: 'HSC Chemistry — Qualitative chemistry, periodic trends, Electrochemistry, & Organic Chemistry.' },
    { id: 1103, title: 'HSC Higher Math 1st & 2nd Paper (উচ্চতর গণিত)', teacher: 'Ms. Sadia Islam', subject: 'Higher Math', group: 'Science', color: '#a78bfa', thumb: '📐', description: 'HSC Higher Math — Matrix, Straight Lines, Calculus (Differentiation & Integration), & Statics.' },
    { id: 1104, title: 'HSC Biology 1st & 2nd Paper (জীববিজ্ঞান)', teacher: 'Dr. Farhan Alam', subject: 'Biology', group: 'Science', color: '#34d399', thumb: '🔬', description: 'HSC Botany & Zoology — Plant Physiology, Genetics, Animal Diversity, & Biotechnology.' },
    { id: 1105, title: 'HSC ICT (তথ্য ও যোগাযোগ প্রযুক্তি)', teacher: 'Mr. Tanvir Rahman', subject: 'ICT', group: 'General', color: '#60a5fa', thumb: '💻', description: 'HSC ICT — Web Design (HTML), C Programming, Database (SQL), & Communication Networks.' },
    { id: 1106, title: 'HSC Accounting 1st & 2nd Paper (হিসাববিজ্ঞান)', teacher: 'Mr. Naimur Rahman', subject: 'Accounting', group: 'Commerce', color: '#f59e0b', thumb: '📊', description: 'HSC Accounting — Partnership, Company Final Accounts, & Cost Accounting.' },
    { id: 1107, title: 'HSC Finance, Banking & Insurance (ফিন্যান্স)', teacher: 'Ms. Rubaba Khan', subject: 'Finance', group: 'Commerce', color: '#ec4899', thumb: '💰', description: 'HSC Finance — Capital Budgeting, Financial Markets, & Risk Management.' },
    { id: 1108, title: 'HSC Economics (অর্থনীতি)', teacher: 'Dr. Shahabuddin', subject: 'Economics', group: 'Arts', color: '#8b5cf6', thumb: '📈', description: 'HSC Economics — Microeconomics, Macroeconomics, & Bangladesh Economy.' },
  ]
};

export default function StudentDashboard() {
  const { user } = useAuth();
  const { students, enrollCourse, unenrollCourse } = useData();

  // Find actual student record
  const student = students.find(s => s.email === user?.email) || user;
  const firstName = student?.full_name?.split(' ')[0] ?? student?.fullName?.split(' ')[0] ?? 'Student';
  
  // Determine class level (class-8, class-9-10, class-11-12)
  const studentClass = student?.classLevel || student?.class_level || 'class-11-12';
  const classLabel = studentClass === 'class-8' ? 'Class 8 Syllabus' : studentClass === 'class-9-10' ? 'Class 9-10 (SSC Syllabus)' : 'Class 11-12 (HSC Syllabus)';
  
  const availableCourses = BANGLADESH_SYLLABUS[studentClass] || BANGLADESH_SYLLABUS['class-11-12'];

  // Get enrolled course IDs (default empty for new registered students)
  const enrolledIds = student?.enrolledCourses || [];

  const enrolledCourses = availableCourses.filter(c => enrolledIds.includes(c.id));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const handleEnroll = (courseId) => {
    if (student?.email) {
      enrollCourse(student.email, courseId);
    }
  };

  const handleUnenroll = (courseId) => {
    if (student?.email) {
      unenrollCourse(student.email, courseId);
    }
  };

  return (
    <div className={styles.page}>
      {/* Hero greeting */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.greeting}>{greeting}, {firstName} 👋</p>
          <h1 className={styles.heroTitle}>Welcome to your <span>Student Portal</span></h1>
          <p className={styles.heroSub}>
            Enrolled in <strong>{classLabel}</strong>. Select your syllabus subjects below to add them to your profile.
          </p>
          <div className={styles.heroCta}>
            <Link to="/student/materials" className={styles.ctaPrimary}><FiFolder /> View Study Materials</Link>
            <Link to="/student/sessions" className={styles.ctaSecondary}><FiVideo /> Join Live Session</Link>
          </div>
        </div>
      </div>

      {/* My Enrolled Courses Section */}
      <div className={styles.coursesSection}>
        <div className={styles.sectionHeader}>
          <h3>My Enrolled Courses ({enrolledCourses.length})</h3>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h4>No courses added to your profile yet</h4>
            <p>Select any of the official {classLabel} subjects from the Course Catalog below to add them to your profile!</p>
          </div>
        ) : (
          <div className={styles.courseGrid}>
            {enrolledCourses.map(c => (
              <div key={c.id} className={styles.courseCard} style={{ '--cc': c.color }}>
                <div className={styles.courseThumb}>{c.thumb}</div>
                <div className={styles.courseBody}>
                  <div className={styles.courseTitle}>{c.title}</div>
                  <div className={styles.courseTeacher}>by {c.teacher}</div>
                  <p style={{ fontSize: '0.82rem', color: '#8892b0', marginTop: '0.4rem' }}>{c.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '0.8rem' }}>
                  <Link to="/student/materials" className={styles.resumeBtn} style={{ flex: 1 }}>
                    <FiPlay /> Access Materials
                  </Link>
                  <button 
                    onClick={() => handleUnenroll(c.id)}
                    style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '0 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Remove from profile"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Courses Catalog Section */}
      <div className={styles.coursesSection} style={{ marginTop: '2.5rem' }}>
        <div className={styles.sectionHeader}>
          <h3>Official Bangladesh Syllabus — {classLabel}</h3>
        </div>
        <div className={styles.courseGrid}>
          {availableCourses.map(c => {
            const isEnrolled = enrolledIds.includes(c.id);
            return (
              <div key={c.id} className={styles.courseCard} style={{ '--cc': c.color }}>
                <div className={styles.courseThumb}>{c.thumb}</div>
                <div className={styles.courseBody}>
                  <div className={styles.courseTitle}>{c.title}</div>
                  <div className={styles.courseTeacher}>by {c.teacher}</div>
                  <p style={{ fontSize: '0.82rem', color: '#8892b0', marginTop: '0.4rem' }}>{c.description}</p>
                </div>
                <div style={{ marginTop: '0.8rem', width: '100%' }}>
                  {isEnrolled ? (
                    <button 
                      onClick={() => handleUnenroll(c.id)}
                      style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '10px', padding: '0.6rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', width: '100%', fontWeight: 600 }}
                    >
                      <FiCheckCircle /> Enrolled (Click to Remove)
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(c.id)}
                      className={styles.resumeBtn}
                      style={{ background: 'var(--teal)', color: '#0a192f', fontWeight: 600, width: '100%' }}
                    >
                      <FiPlus /> Select & Enroll Course
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Tutor Banner */}
      <div className={styles.aiBanner} style={{ marginTop: '2.5rem' }}>
        <div className={styles.aiLeft}>
          <div className={styles.aiIcon}><FiZap /></div>
          <div>
            <h3>AI Tutor — Ask anything, anytime</h3>
            <p>Get instant explanations, step-by-step solutions, and personalized assistance powered by AI.</p>
          </div>
        </div>
        <Link to="/student/ai-tutor" className={styles.aiBtn}>Try AI Tutor <FiChevronRight /></Link>
      </div>
    </div>
  );
}


