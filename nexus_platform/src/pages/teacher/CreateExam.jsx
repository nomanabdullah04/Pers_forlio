// src/pages/teacher/CreateExam.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, CLASS_LEVELS } from '../../context/DataContext';
import toast from 'react-hot-toast';
import {
  FiEdit2, FiPlus, FiTrash2, FiCheck, FiChevronDown,
  FiClock, FiAward, FiAlertCircle, FiUploadCloud, FiList
} from 'react-icons/fi';
import styles from './CreateExam.module.css';

const SUBJECTS = {
  'class-8':     ['Math','English','Bangla','Science','History','Geography','Religion'],
  'class-9-10':  ['Math','English','Bangla','Physics','Chemistry','Biology','History','Geography','ICT','Religion'],
  'class-11-12': ['Physics','Chemistry','Math','Biology','English','Bangla','ICT','Economics','Accounting'],
};

const blankMcqQ = (id) => ({ id, text: '', options: ['', '', '', ''], correct: 0 });
const blankCqQ  = (id) => ({
  id, text: '',
  subParts: [
    { part: 'a', text: '', marks: 2 },
    { part: 'b', text: '', marks: 4 },
    { part: 'c', text: '', marks: 6 },
    { part: 'd', text: '', marks: 8 },
  ],
});

export default function CreateExam() {
  const { createAssessment, students } = useData();
  const navigate = useNavigate();

  // Step state
  const [step, setStep] = useState(1); // 1 = type select, 2 = builder

  const [meta, setMeta] = useState({
    type: '',
    classLevel: 'class-11-12',
    subject: '',
    title: '',
    totalMarks: 50,
    timeLimit: 30,
  });

  // MCQ state
  const [mcqQs, setMcqQs] = useState([blankMcqQ('q1')]);

  // CQ state
  const [cqQs, setCqQs] = useState([blankCqQ('q1')]);

  // PDF state
  const [pdfFile, setPdfFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const setM = (k, v) => setMeta(p => ({ ...p, [k]: v }));
  const targetCount = students.filter(s => s.classLevel === meta.classLevel && s.status === 'active').length;

  // ── MCQ helpers ───────────────────────────────────────────────
  const addMcqQ = () => setMcqQs(p => [...p, blankMcqQ(`q${p.length + 1}`)]);
  const removeMcqQ = (idx) => setMcqQs(p => p.filter((_, i) => i !== idx));
  const updateMcqQ = (idx, field, val) => setMcqQs(p => p.map((q, i) => i === idx ? { ...q, [field]: val } : q));
  const updateMcqOpt = (qi, oi, val) => setMcqQs(p => p.map((q, i) => i === qi ? { ...q, options: q.options.map((o, j) => j === oi ? val : o) } : q));

  // ── CQ helpers ────────────────────────────────────────────────
  const addCqQ = () => setCqQs(p => [...p, blankCqQ(`q${p.length + 1}`)]);
  const removeCqQ = (idx) => setCqQs(p => p.filter((_, i) => i !== idx));
  const updateCqQ = (idx, val) => setCqQs(p => p.map((q, i) => i === idx ? { ...q, text: val } : q));
  const updateSubPart = (qi, pi, field, val) => setCqQs(p => p.map((q, i) => i === qi ? { ...q, subParts: q.subParts.map((sp, j) => j === pi ? { ...sp, [field]: val } : sp) } : q));

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!meta.title.trim())   return toast.error('Please enter an exam title');
    if (!meta.subject)         return toast.error('Please select a subject');
    if (meta.type === 'pdf_exam' && !pdfFile) return toast.error('Please upload the exam PDF');
    if (meta.type === 'mcq' && mcqQs.some(q => !q.text.trim())) return toast.error('All MCQ questions must have text');
    if (meta.type === 'cq'  && cqQs.some(q => !q.text.trim()))  return toast.error('All CQ questions must have scenario text');

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const payload = {
      ...meta,
      questions: meta.type === 'mcq' ? mcqQs : meta.type === 'cq' ? cqQs : [],
      pdfUrl: null,
      fileName: pdfFile?.name ?? null,
    };
    createAssessment(payload);
    setLoading(false);
    toast.success(`Exam published! ${targetCount} students notified 🔔`);
    navigate('/teacher/exams');
  };

  // ── Step 1: Type Select ───────────────────────────────────────
  if (step === 1) return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1><FiEdit2 /> Create Exam</h1>
        <p>Choose the type of exam you want to create for your students</p>
      </div>
      <div className={styles.typeGrid}>
        {[
          { type:'mcq',      icon:'🔘', label:'MCQ Quiz',           desc:'Multiple choice questions with auto-grading. Perfect for quick assessment.',      color:'#64ffda' },
          { type:'cq',       icon:'📝', label:'Creative Question',  desc:'Open-ended questions with sub-parts (a, b, c, d). Great for in-depth evaluation.', color:'#a78bfa' },
          { type:'pdf_exam', icon:'📄', label:'PDF Exam Upload',    desc:'Upload a prepared exam PDF. Students download and submit on paper.',               color:'#fb923c' },
        ].map(t => (
          <button
            key={t.type}
            id={`type-${t.type}`}
            className={styles.typeCard}
            style={{ '--tc': t.color }}
            onClick={() => { setM('type', t.type); setStep(2); }}
          >
            <div className={styles.typeEmoji}>{t.icon}</div>
            <div className={styles.typeLabel}>{t.label}</div>
            <div className={styles.typeDesc}>{t.desc}</div>
            <div className={styles.typeArrow}>Choose →</div>
          </button>
        ))}
      </div>
    </div>
  );

  const typeLabel = meta.type === 'mcq' ? 'MCQ Quiz' : meta.type === 'cq' ? 'Creative Question Exam' : 'PDF Exam Upload';

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
          <h1><FiEdit2 /> Create {typeLabel}</h1>
          <p>Fill in the details and build your exam</p>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          {/* Meta */}
          <section className={styles.section}>
            <h2 className={styles.secTitle}>Exam Details</h2>
            <div className={styles.row}>
              <div className={styles.group}>
                <label>Target Class <span className={styles.req}>*</span></label>
                <div className={styles.selectWrap}>
                  <select value={meta.classLevel} onChange={e => setM('classLevel', e.target.value)} id="exam-class">
                    {CLASS_LEVELS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  <FiChevronDown className={styles.chevron} />
                </div>
              </div>
              <div className={styles.group}>
                <label>Subject <span className={styles.req}>*</span></label>
                <div className={styles.selectWrap}>
                  <select value={meta.subject} onChange={e => setM('subject', e.target.value)} id="exam-subject">
                    <option value="">— Select —</option>
                    {(SUBJECTS[meta.classLevel] || []).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <FiChevronDown className={styles.chevron} />
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <label>Exam Title <span className={styles.req}>*</span></label>
              <input id="exam-title" className={styles.input} placeholder="e.g. HSC Physics — Mid-Term Exam" value={meta.title} onChange={e => setM('title', e.target.value)} />
            </div>
            <div className={styles.row}>
              <div className={styles.group}>
                <label><FiClock /> Time Limit (minutes)</label>
                <input id="exam-time" type="number" className={styles.input} min={5} max={240} value={meta.timeLimit} onChange={e => setM('timeLimit', +e.target.value)} />
              </div>
              <div className={styles.group}>
                <label><FiAward /> Total Marks</label>
                <input id="exam-marks" type="number" className={styles.input} min={1} value={meta.totalMarks} onChange={e => setM('totalMarks', +e.target.value)} />
              </div>
            </div>
          </section>

          {/* ── MCQ Builder ─────────────────────────────────── */}
          {meta.type === 'mcq' && (
            <section className={styles.section}>
              <div className={styles.secHeader}>
                <h2 className={styles.secTitle}><FiList /> Questions ({mcqQs.length})</h2>
                <button type="button" id="add-mcq-q" className={styles.addBtn} onClick={addMcqQ}><FiPlus /> Add Question</button>
              </div>
              {mcqQs.map((q, qi) => (
                <div key={q.id} className={styles.qCard}>
                  <div className={styles.qTop}>
                    <span className={styles.qNum}>Q{qi + 1}</span>
                    {mcqQs.length > 1 && (
                      <button type="button" className={styles.removeQ} onClick={() => removeMcqQ(qi)}><FiTrash2 /></button>
                    )}
                  </div>
                  <input
                    id={`mcq-q-${qi}`}
                    className={styles.qInput}
                    placeholder={`Question ${qi + 1} text…`}
                    value={q.text}
                    onChange={e => updateMcqQ(qi, 'text', e.target.value)}
                  />
                  <div className={styles.optionsGrid}>
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`${styles.optRow} ${q.correct === oi ? styles.optCorrect : ''}`}
                        onClick={() => updateMcqQ(qi, 'correct', oi)}
                      >
                        <div className={styles.optRadio}>
                          {q.correct === oi && <div className={styles.optRadioFill} />}
                        </div>
                        <span className={styles.optLabel}>{String.fromCharCode(65+oi)}</span>
                        <input
                          id={`mcq-q${qi}-opt${oi}`}
                          className={styles.optInput}
                          placeholder={`Option ${String.fromCharCode(65+oi)}`}
                          value={opt}
                          onChange={e => { e.stopPropagation(); updateMcqOpt(qi, oi, e.target.value); }}
                          onClick={e => e.stopPropagation()}
                        />
                        {q.correct === oi && <FiCheck className={styles.optCheck} />}
                      </div>
                    ))}
                  </div>
                  <p className={styles.optHint}>Click a row to mark the correct answer</p>
                </div>
              ))}
            </section>
          )}

          {/* ── CQ Builder ──────────────────────────────────── */}
          {meta.type === 'cq' && (
            <section className={styles.section}>
              <div className={styles.secHeader}>
                <h2 className={styles.secTitle}><FiList /> Creative Questions ({cqQs.length})</h2>
                <button type="button" id="add-cq-q" className={styles.addBtn} onClick={addCqQ}><FiPlus /> Add Question</button>
              </div>
              {cqQs.map((q, qi) => (
                <div key={q.id} className={styles.qCard}>
                  <div className={styles.qTop}>
                    <span className={styles.qNum}>Question {qi + 1}</span>
                    {cqQs.length > 1 && (
                      <button type="button" className={styles.removeQ} onClick={() => removeCqQ(qi)}><FiTrash2 /></button>
                    )}
                  </div>
                  <textarea
                    id={`cq-scenario-${qi}`}
                    className={styles.qTextarea}
                    placeholder="Write the scenario / stem of the creative question here…"
                    rows={3}
                    value={q.text}
                    onChange={e => updateCqQ(qi, e.target.value)}
                  />
                  <div className={styles.subPartsLabel}>Sub-parts:</div>
                  {q.subParts.map((sp, pi) => (
                    <div key={sp.part} className={styles.subPart}>
                      <span className={styles.spLabel}>{sp.part})</span>
                      <input
                        id={`cq-q${qi}-sp${pi}`}
                        className={styles.spInput}
                        placeholder={`Sub-part (${sp.part}) question…`}
                        value={sp.text}
                        onChange={e => updateSubPart(qi, pi, 'text', e.target.value)}
                      />
                      <div className={styles.marksWrap}>
                        <input
                          id={`cq-q${qi}-sp${pi}-marks`}
                          type="number"
                          className={styles.marksInput}
                          min={1} max={20}
                          value={sp.marks}
                          onChange={e => updateSubPart(qi, pi, 'marks', +e.target.value)}
                        />
                        <span>marks</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          )}

          {/* ── PDF Upload ──────────────────────────────────── */}
          {meta.type === 'pdf_exam' && (
            <section className={styles.section}>
              <h2 className={styles.secTitle}><FiUploadCloud /> Upload Exam PDF</h2>
              <div
                className={`${styles.dropZone} ${pdfFile ? styles.hasFile : ''}`}
                onClick={() => !pdfFile && document.getElementById('exam-pdf-input')?.click()}
              >
                <input id="exam-pdf-input" type="file" accept=".pdf" hidden
                  onChange={e => setPdfFile(e.target.files[0] ?? null)} />
                {pdfFile ? (
                  <div className={styles.filePreview}>
                    <span style={{ fontSize:'2rem' }}>📄</span>
                    <div>
                      <div className={styles.fileName}>{pdfFile.name}</div>
                      <div className={styles.fileSize}>{(pdfFile.size/1024/1024).toFixed(2)} MB</div>
                    </div>
                    <button type="button" className={styles.removeFile} onClick={e => { e.stopPropagation(); setPdfFile(null); }}><FiTrash2 /></button>
                  </div>
                ) : (
                  <>
                    <FiUploadCloud style={{ fontSize:'2.5rem', color:'#4a5568', marginBottom:'.75rem' }} />
                    <p>Click to upload your exam PDF</p>
                    <small>Students will be able to download and print this file</small>
                  </>
                )}
              </div>
              <div className={styles.pdfNote}>
                <FiAlertCircle />
                <span>Students will receive a notification with the option to download the exam PDF. Physical submission is expected in class.</span>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h3>📋 Exam Summary</h3>
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}><span>Type</span><strong>{typeLabel}</strong></div>
              <div className={styles.summaryRow}>
                <span>Class</span>
                <strong style={{ color: CLASS_LEVELS.find(c=>c.value===meta.classLevel)?.color }}>
                  {CLASS_LEVELS.find(c=>c.value===meta.classLevel)?.label}
                </strong>
              </div>
              <div className={styles.summaryRow}><span>Time</span><strong>{meta.timeLimit} min</strong></div>
              <div className={styles.summaryRow}><span>Marks</span><strong>{meta.totalMarks}</strong></div>
              {meta.type === 'mcq' && <div className={styles.summaryRow}><span>Questions</span><strong>{mcqQs.length}</strong></div>}
              {meta.type === 'cq'  && <div className={styles.summaryRow}><span>Questions</span><strong>{cqQs.length}</strong></div>}
              <div className={styles.summaryRow}>
                <span>Will notify</span>
                <strong style={{ color:'#64ffda' }}>{targetCount} students</strong>
              </div>
            </div>
          </div>

          <button
            className={styles.publishBtn}
            onClick={handleSubmit}
            disabled={loading}
            id="publish-exam-btn"
          >
            {loading ? <span className={styles.spinner} /> : <><FiCheck /> Publish Exam</>}
          </button>
        </div>
      </div>
    </div>
  );
}
