// src/pages/teacher/ExamList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData, CLASS_LEVELS } from '../../context/DataContext';
import ClassBadge from '../../components/ui/ClassBadge';
import toast from 'react-hot-toast';
import {
  FiEdit2, FiTrash2, FiPlus, FiUsers, FiClock, FiAward,
  FiList, FiFileText, FiUploadCloud, FiFilter
} from 'react-icons/fi';
import styles from './ExamList.module.css';

const TYPE_ICONS = { mcq: <FiList />, cq: <FiEdit2 />, pdf_exam: <FiFileText /> };
const TYPE_LABELS = { mcq: 'MCQ', cq: 'CQ', pdf_exam: 'PDF Exam' };
const TYPE_COLORS = { mcq: '#64ffda', cq: '#a78bfa', pdf_exam: '#fb923c' };

export default function ExamList() {
  const { assessments, deleteAssessment, students } = useData();
  const [classF, setClassF] = useState('all');

  const filtered = assessments.filter(a => classF === 'all' || a.classLevel === classF);

  const getAvgScore = (subs) => {
    if (!subs?.length) return null;
    return Math.round(subs.reduce((s, sub) => s + sub.score, 0) / subs.length);
  };

  const handleDelete = (id, title) => {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteAssessment(id);
      toast.success('Exam deleted');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiList /> Exam Manager</h1>
          <p>Manage all your published exams and view student submissions</p>
        </div>
        <Link to="/teacher/create-exam" id="create-exam-btn" className={styles.createBtn}>
          <FiPlus /> Create New Exam
        </Link>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.stat} style={{ '--c':'#64ffda' }}>
          <div className={styles.statNum}>{assessments.length}</div>
          <div className={styles.statLabel}>Total Exams</div>
        </div>
        <div className={styles.stat} style={{ '--c':'#64ffda' }}>
          <div className={styles.statNum}>{assessments.filter(a=>a.type==='mcq').length}</div>
          <div className={styles.statLabel}>MCQ Quizzes</div>
        </div>
        <div className={styles.stat} style={{ '--c':'#a78bfa' }}>
          <div className={styles.statNum}>{assessments.filter(a=>a.type==='cq').length}</div>
          <div className={styles.statLabel}>CQ Exams</div>
        </div>
        <div className={styles.stat} style={{ '--c':'#fb923c' }}>
          <div className={styles.statNum}>{assessments.filter(a=>a.type==='pdf_exam').length}</div>
          <div className={styles.statLabel}>PDF Exams</div>
        </div>
        <div className={styles.stat} style={{ '--c':'#34d399' }}>
          <div className={styles.statNum}>{assessments.reduce((s,a)=>(a.submissions?.length??0)+s,0)}</div>
          <div className={styles.statLabel}>Total Submissions</div>
        </div>
      </div>

      {/* Filter */}
      <div className={styles.filterRow}>
        <FiFilter className={styles.filterIcon} />
        {[{ value:'all', label:'All Classes' }, ...CLASS_LEVELS].map(c => (
          <button
            key={c.value}
            className={`${styles.ftab} ${classF === c.value ? styles.ftabActive : ''}`}
            style={{ '--fc': c.color ?? '#8892b0' }}
            onClick={() => setClassF(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Exam Cards */}
      <div className={styles.examGrid}>
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span>📭</span>
            <p>No exams found. <Link to="/teacher/create-exam">Create one →</Link></p>
          </div>
        )}
        {filtered.map(exam => {
          const submissions = exam.submissions ?? [];
          const avgScore = getAvgScore(submissions);
          const typeColor = TYPE_COLORS[exam.type] ?? '#8892b0';
          return (
            <div key={exam.id} className={styles.examCard} style={{ '--ec': typeColor }}>
              <div className={styles.cardTop}>
                <div className={styles.typeBadge} style={{ color: typeColor, background: `color-mix(in srgb, ${typeColor} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${typeColor} 25%, transparent)` }}>
                  {TYPE_ICONS[exam.type]} {TYPE_LABELS[exam.type]}
                </div>
                <ClassBadge value={exam.classLevel} size="sm" />
              </div>
              <h3 className={styles.examTitle}>{exam.title}</h3>
              <div className={styles.examMeta}>
                <span className={styles.subject}>{exam.subject}</span>
              </div>
              <div className={styles.examStats}>
                <div className={styles.eStat}>
                  <FiClock />
                  <span>{exam.timeLimit} min</span>
                </div>
                <div className={styles.eStat}>
                  <FiAward />
                  <span>{exam.totalMarks} marks</span>
                </div>
                <div className={styles.eStat}>
                  <FiUsers />
                  <span>{submissions.length} submitted</span>
                </div>
                {avgScore !== null && (
                  <div className={`${styles.eStat} ${styles.avgScore}`}>
                    <span>Avg: {avgScore}%</span>
                  </div>
                )}
              </div>
              <div className={styles.cardDate}>
                Created: {new Date(exam.createdAt).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(exam.id, exam.title)}
                  id={`delete-exam-${exam.id}`}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
