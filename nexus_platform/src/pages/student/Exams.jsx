// src/pages/student/Exams.jsx
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import ClassBadge from '../../components/ui/ClassBadge';
import toast from 'react-hot-toast';
import {
  FiEdit2, FiClock, FiAward, FiCheck, FiX, FiList,
  FiFileText, FiChevronRight, FiDownload
} from 'react-icons/fi';
import styles from './Exams.module.css';

const TYPE_ICONS  = { mcq:'🔘', cq:'📝', pdf_exam:'📄' };
const TYPE_LABELS = { mcq:'MCQ Quiz', cq:'Creative Question', pdf_exam:'PDF Exam' };

// ─── MCQ Quiz Component ───────────────────────────────────────────
function McqQuiz({ exam, onSubmit }) {
  const totalQ = exam.questions?.length ?? 0;
  const [answers,  setAnswers]  = useState({});
  const [finished, setFinished] = useState(false);
  const [score,    setScore]    = useState(null);

  const handleAnswer = (qi, oi) => {
    if (finished) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < totalQ) {
      toast.error('Please answer all questions before submitting');
      return;
    }
    let correct = 0;
    exam.questions.forEach((q, qi) => { if (answers[qi] === q.correct) correct++; });
    const pct = Math.round((correct / totalQ) * 100);
    setScore({ correct, total: totalQ, pct });
    setFinished(true);
    onSubmit(answers, pct);
  };

  if (finished && score) return (
    <div className={styles.resultCard}>
      <div className={`${styles.resultIcon} ${score.pct >= 50 ? styles.pass : styles.fail}`}>
        {score.pct >= 50 ? '🏆' : '📚'}
      </div>
      <h3>{score.pct >= 50 ? 'Well done!' : 'Keep practising!'}</h3>
      <div className={styles.scoreDisplay}>
        <span className={styles.scoreNum}>{score.pct}%</span>
        <span className={styles.scoreSub}>{score.correct} / {score.total} correct</span>
      </div>
      <div className={styles.answerReview}>
        {exam.questions.map((q, qi) => (
          <div key={q.id} className={`${styles.reviewQ} ${answers[qi] === q.correct ? styles.correctQ : styles.wrongQ}`}>
            <div className={styles.reviewHeader}>
              {answers[qi] === q.correct ? <FiCheck /> : <FiX />}
              <span>Q{qi+1}: {q.text}</span>
            </div>
            <div className={styles.reviewAns}>Your answer: <strong>{q.options[answers[qi]] ?? '—'}</strong></div>
            {answers[qi] !== q.correct && <div className={styles.correctAns}>Correct: <strong style={{color:'#64ffda'}}>{q.options[q.correct]}</strong></div>}
          </div>
        ))}
      </div>
    </div>
  );

  const answered = Object.keys(answers).length;
  return (
    <div className={styles.quizBody}>
      <div className={styles.quizProgress}>
        <div className={styles.progressBar}><div className={styles.progressFill} style={{ width:`${(answered/totalQ)*100}%` }} /></div>
        <span>{answered}/{totalQ} answered</span>
      </div>
      {exam.questions.map((q, qi) => (
        <div key={q.id} className={styles.mcqCard}>
          <div className={styles.mcqHeader}>
            <span className={styles.qNum}>Q{qi+1}</span>
            <p className={styles.qText}>{q.text}</p>
          </div>
          <div className={styles.mcqOptions}>
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                id={`q${qi}-opt${oi}`}
                className={`${styles.option} ${answers[qi] === oi ? styles.optSelected : ''}`}
                onClick={() => handleAnswer(qi, oi)}
              >
                <span className={styles.optBullet}>{String.fromCharCode(65+oi)}</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className={styles.submitQuizBtn} onClick={handleSubmit} id="submit-quiz-btn">
        <FiCheck /> Submit Quiz
      </button>
    </div>
  );
}

// ─── CQ Component ─────────────────────────────────────────────────
function CqExam({ exam, onSubmit }) {
  const [answers,  setAnswers]  = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (Object.values(answers).some(v => !v.trim())) {
      toast.error('Please answer all sub-parts');
      return;
    }
    setSubmitted(true);
    onSubmit(answers, null);
    toast.success('CQ answers submitted! Teacher will review your responses.');
  };

  if (submitted) return (
    <div className={styles.resultCard}>
      <div className={styles.resultIcon}>✅</div>
      <h3>Submitted Successfully!</h3>
      <p style={{ color:'#8892b0', textAlign:'center' }}>Your answers have been submitted. The teacher will review and provide marks.</p>
    </div>
  );

  return (
    <div className={styles.cqBody}>
      {exam.questions.map((q, qi) => (
        <div key={q.id} className={styles.cqCard}>
          <div className={styles.cqScenario}>
            <span className={styles.scenarioLabel}>📖 Scenario</span>
            <p>{q.text}</p>
          </div>
          {q.subParts.map((sp, pi) => (
            <div key={sp.part} className={styles.subPart}>
              <div className={styles.spHeader}>
                <span className={styles.spLetter}>{sp.part})</span>
                <span className={styles.spQ}>{sp.text}</span>
                <span className={styles.spMarks}>[{sp.marks} marks]</span>
              </div>
              <textarea
                id={`cq-ans-q${qi}-sp${pi}`}
                className={styles.cqTextarea}
                placeholder={`Write your answer for part (${sp.part})…`}
                value={answers[`${qi}-${pi}`] ?? ''}
                onChange={e => setAnswers(p => ({ ...p, [`${qi}-${pi}`]: e.target.value }))}
                rows={3}
              />
            </div>
          ))}
        </div>
      ))}
      <button className={styles.submitQuizBtn} onClick={handleSubmit} id="submit-cq-btn">
        <FiCheck /> Submit CQ Answers
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function Exams() {
  const { user } = useAuth();
  const { assessments, submitExam, students } = useData();
  const studentClass = user?.classLevel ?? user?.class_level ?? 'class-11-12';
  const studentId = user?.id;

  // Find the real student record (with examResults)
  const studentRecord = students.find(s => s.email === user?.email);
  const completedIds = (studentRecord?.examResults ?? []).map(r => r.assessmentId);

  const [activeExam, setActiveExam] = useState(null);

  const myExams = assessments.filter(a => a.classLevel === studentClass);

  const handleSubmit = (examId, answers, score) => {
    submitExam(examId, studentId, answers, score ?? 0);
  };

  if (activeExam) {
    const exam = assessments.find(a => a.id === activeExam);
    if (!exam) return null;
    return (
      <div className={styles.page}>
        <div className={styles.examHeader}>
          <button className={styles.backBtn} onClick={() => setActiveExam(null)}>← Back to Exams</button>
          <div className={styles.examMeta}>
            <h1>{exam.title}</h1>
            <div className={styles.examInfo}>
              <span><FiClock /> {exam.timeLimit} min</span>
              <span><FiAward /> {exam.totalMarks} marks</span>
              <ClassBadge value={exam.classLevel} />
            </div>
          </div>
        </div>

        {exam.type === 'mcq'      && <McqQuiz exam={exam} onSubmit={(a,s) => handleSubmit(exam.id, a, s)} />}
        {exam.type === 'cq'       && <CqExam  exam={exam} onSubmit={(a,s) => handleSubmit(exam.id, a, s)} />}
        {exam.type === 'pdf_exam' && (
          <div className={styles.pdfExamCard}>
            <span style={{ fontSize:'3rem' }}>📄</span>
            <h3>Exam PDF</h3>
            <p>Download the exam, complete it, and submit the physical paper in class.</p>
            <a
              href={exam.pdfUrl ?? '#'}
              download={exam.fileName}
              className={styles.downloadBtn}
              id="download-exam-pdf"
              onClick={e => { if (!exam.pdfUrl) { e.preventDefault(); toast.success('PDF download simulated (no backend in demo)'); handleSubmit(exam.id, {}, null); } }}
            >
              <FiDownload /> Download Exam PDF
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiEdit2 /> My Exams</h1>
          <div className={styles.classInfo}>
            <span>Your class:</span>
            <ClassBadge value={studentClass} />
            <span className={styles.examCount}>— {myExams.length} exams</span>
          </div>
        </div>
      </div>

      <div className={styles.examList}>
        {myExams.length === 0 && (
          <div className={styles.empty}><span>📭</span><p>No exams posted for your class yet.</p></div>
        )}
        {myExams.map(exam => {
          const done = completedIds.includes(exam.id);
          const result = studentRecord?.examResults?.find(r => r.assessmentId === exam.id);
          return (
            <div key={exam.id} className={`${styles.examCard} ${done ? styles.doneCard : ''}`}>
              <div className={styles.examThumb}>{TYPE_ICONS[exam.type]}</div>
              <div className={styles.examCardBody}>
                <div className={styles.examCardTop}>
                  <span className={`${styles.typePill} ${styles[`type_${exam.type}`]}`}>
                    {TYPE_LABELS[exam.type]}
                  </span>
                  {done && <span className={styles.donePill}><FiCheck /> Completed</span>}
                  <ClassBadge value={exam.classLevel} size="sm" />
                </div>
                <h3 className={styles.examCardTitle}>{exam.title}</h3>
                <div className={styles.examCardMeta}>
                  <span>{exam.subject}</span>
                  <span><FiClock /> {exam.timeLimit} min</span>
                  <span><FiAward /> {exam.totalMarks} marks</span>
                  {result?.score != null && <span className={styles.scoreTag}>Score: {result.score}%</span>}
                </div>
              </div>
              <button
                className={`${styles.startBtn} ${done ? styles.startBtnDone : ''}`}
                onClick={() => { if (!done) setActiveExam(exam.id); }}
                id={`start-exam-${exam.id}`}
                disabled={done}
              >
                {done ? <><FiCheck /> Done</> : <>Start <FiChevronRight /></>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
