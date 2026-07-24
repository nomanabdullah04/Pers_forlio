// src/pages/student/MyCourses.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiSearch, FiPlay, FiCheckCircle, FiPlus, FiTrash2, FiBook } from 'react-icons/fi';
import styles from './MyCourses.module.css';

import { BANGLADESH_SYLLABUS } from './Dashboard';

export default function MyCourses() {
  const { user } = useAuth();
  const { students, enrollCourse, unenrollCourse } = useData();
  const [search, setSearch] = useState('');

  const student = students.find(s => s.email === user?.email) || user;
  const studentClass = student?.classLevel || student?.class_level || 'class-11-12';
  const classLabel = studentClass === 'class-8' ? 'Class 8' : studentClass === 'class-9-10' ? 'Class 9-10 (SSC)' : 'Class 11-12 (HSC)';
  const coursesList = BANGLADESH_SYLLABUS[studentClass] || BANGLADESH_SYLLABUS['class-11-12'];

  const enrolledIds = student?.enrolledCourses || [];

  const enrolledList = coursesList.filter(c => enrolledIds.includes(c.id));
  const availableList = coursesList.filter(c => !enrolledIds.includes(c.id));

  const filteredEnrolled = enrolledList.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>My Enrolled Courses</h1>
          <p>Access all courses currently added to your student profile</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <FiSearch />
          <input
            placeholder="Search enrolled courses…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="course-search"
          />
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      <div className={styles.courseGrid}>
        {filteredEnrolled.map(course => (
          <div key={course.id} className={styles.courseCard} style={{ '--cc': course.color }}>
            <div className={styles.thumb}>{course.thumb}</div>
            <div className={styles.cardBody}>
              <h3 className={styles.title}>{course.title}</h3>
              <p className={styles.teacher}>by {course.teacher}</p>
              <div className={styles.meta}>
                <span><FiBook /> {course.lessons} lessons</span>
              </div>
            </div>
            <div className={styles.cardFooter} style={{ gap: '0.5rem' }}>
              <Link to="/student/materials" className={styles.actionBtn} style={{ flex: 1 }}>
                <FiPlay /> Access Materials
              </Link>
              <button
                onClick={() => student?.email && unenrollCourse(student.email, course.id)}
                style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '0 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Remove course from profile"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        {enrolledList.length === 0 && (
          <div className={styles.empty} style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '2.5rem' }}>📚</span>
            <h4 style={{ color: '#e6f1ff', marginTop: '1rem' }}>No Courses Added to Profile Yet</h4>
            <p style={{ color: '#8892b0' }}>Select courses from the Course Catalog below to add them to your profile!</p>
          </div>
        )}
      </div>

      {/* Available Catalog */}
      <div style={{ marginTop: '3rem' }}>
        <h2>Available Course Catalog</h2>
        <p style={{ color: '#8892b0', marginBottom: '1.5rem' }}>Click "Enroll" on any course to add it to your profile</p>
        <div className={styles.courseGrid}>
          {availableList.map(course => (
            <div key={course.id} className={styles.courseCard} style={{ '--cc': course.color }}>
              <div className={styles.thumb}>{course.thumb}</div>
              <div className={styles.cardBody}>
                <h3 className={styles.title}>{course.title}</h3>
                <p className={styles.teacher}>by {course.teacher}</p>
                <div className={styles.meta}>
                  <span><FiBook /> {course.lessons} lessons</span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <button
                  onClick={() => student?.email && enrollCourse(student.email, course.id)}
                  className={styles.actionBtn}
                  style={{ background: 'var(--teal)', color: '#0a192f', fontWeight: 600, width: '100%' }}
                >
                  <FiPlus /> Select & Enroll Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

