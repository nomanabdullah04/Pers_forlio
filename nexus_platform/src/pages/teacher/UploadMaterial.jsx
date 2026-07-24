// src/pages/teacher/UploadMaterial.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, CLASS_LEVELS } from '../../context/DataContext';
import toast from 'react-hot-toast';
import {
  FiUploadCloud, FiYoutube, FiFile, FiX, FiChevronDown,
  FiBook, FiSend, FiInfo, FiCheck
} from 'react-icons/fi';
import styles from './UploadMaterial.module.css';

const SUBJECTS = {
  'class-8':     ['Math','English','Bangla','Science','History','Geography','Religion'],
  'class-9-10':  ['Math','English','Bangla','Physics','Chemistry','Biology','History','Geography','ICT','Religion'],
  'class-11-12': ['Physics','Chemistry','Math','Biology','English','Bangla','ICT','Economics','Accounting'],
};

export default function UploadMaterial() {
  const { uploadMaterial, students } = useData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    classLevel: 'class-11-12',
    subject: '',
    title: '',
    description: '',
    type: 'pdf',
    url: '',
  });
  const [file,       setFile]       = useState(null);
  const [dragOver,   setDragOver]   = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const fileRef = useRef();

  const subjects = SUBJECTS[form.classLevel] || [];
  const targetCount = students.filter(s => s.classLevel === form.classLevel && s.status === 'active').length;

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') setFile(f);
    else toast.error('Only PDF files are supported');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Please enter a title');
    if (!form.classLevel)   return toast.error('Please select a class');
    if (!form.subject)      return toast.error('Please select a subject');
    if (form.type === 'pdf' && !file)  return toast.error('Please upload a PDF file');
    if (form.type === 'youtube' && !form.url.trim()) return toast.error('Please enter a YouTube URL');

    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // simulate upload
    uploadMaterial({
      ...form,
      fileName: file?.name ?? null,
      url: form.type === 'youtube' ? convertYtUrl(form.url) : null,
    });
    setLoading(false);
    setSubmitted(true);
    toast.success(`Material uploaded! ${targetCount} students notified 🔔`);
  };

  const convertYtUrl = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  if (submitted) return (
    <div className={styles.successPage}>
      <div className={styles.successCard}>
        <div className={styles.successIcon}><FiCheck /></div>
        <h2>Material Uploaded!</h2>
        <p><strong>{targetCount}</strong> students in {CLASS_LEVELS.find(c=>c.value===form.classLevel)?.label} have been notified.</p>
        <div className={styles.successBtns}>
          <button onClick={() => { setSubmitted(false); setForm({ classLevel:'class-11-12', subject:'', title:'', description:'', type:'pdf', url:'' }); setFile(null); }} className={styles.uploadMore}>
            Upload Another
          </button>
          <button onClick={() => navigate('/teacher/materials')} className={styles.viewAll}>
            View All Materials →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiUploadCloud /> Upload Study Material</h1>
          <p>Post PDFs or videos — only students in the selected class will receive it</p>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>

          {/* Class + Subject */}
          <div className={styles.row}>
            <div className={styles.group}>
              <label>Target Class <span className={styles.req}>*</span></label>
              <div className={styles.selectWrap}>
                <select value={form.classLevel} onChange={e => { set('classLevel', e.target.value); set('subject',''); }} id="mat-class">
                  {CLASS_LEVELS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <FiChevronDown className={styles.chevron} />
              </div>
            </div>
            <div className={styles.group}>
              <label>Subject <span className={styles.req}>*</span></label>
              <div className={styles.selectWrap}>
                <FiBook className={styles.selectIcon} />
                <select value={form.subject} onChange={e => set('subject', e.target.value)} id="mat-subject">
                  <option value="">— Select subject —</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <FiChevronDown className={styles.chevron} />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className={styles.group}>
            <label>Title <span className={styles.req}>*</span></label>
            <input
              id="mat-title"
              type="text"
              placeholder="e.g. Newton's Laws — Chapter Notes"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Description */}
          <div className={styles.group}>
            <label>Description</label>
            <textarea
              id="mat-desc"
              placeholder="Brief description of the material…"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              className={styles.textarea}
            />
          </div>

          {/* Type Toggle */}
          <div className={styles.group}>
            <label>Material Type <span className={styles.req}>*</span></label>
            <div className={styles.typeTabs}>
              <button type="button" id="type-pdf"
                className={`${styles.typeTab} ${form.type==='pdf'?styles.typeActive:''}`}
                onClick={() => set('type','pdf')}>
                <FiFile /> Upload PDF
              </button>
              <button type="button" id="type-youtube"
                className={`${styles.typeTab} ${form.type==='youtube'?styles.typeActive:''}`}
                onClick={() => set('type','youtube')}>
                <FiYoutube /> YouTube Video
              </button>
            </div>
          </div>

          {/* PDF Drop Zone */}
          {form.type === 'pdf' && (
            <div
              className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''} ${file ? styles.hasFile : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !file && fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" accept=".pdf" hidden id="mat-file"
                onChange={e => { const f = e.target.files[0]; if(f) setFile(f); }} />
              {file ? (
                <div className={styles.filePreview}>
                  <FiFile className={styles.fileIcon} />
                  <div>
                    <div className={styles.fileName}>{file.name}</div>
                    <div className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                  <button type="button" className={styles.removeFile} onClick={e => { e.stopPropagation(); setFile(null); }}>
                    <FiX />
                  </button>
                </div>
              ) : (
                <>
                  <FiUploadCloud className={styles.dropIcon} />
                  <p>Drag & drop PDF here, or <span>click to browse</span></p>
                  <small>Max file size: 50 MB</small>
                </>
              )}
            </div>
          )}

          {/* YouTube URL */}
          {form.type === 'youtube' && (
            <div className={styles.group}>
              <label>YouTube URL <span className={styles.req}>*</span></label>
              <div className={styles.inputIcon}>
                <FiYoutube className={styles.inputPrependIcon} />
                <input
                  id="mat-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={form.url}
                  onChange={e => set('url', e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading} id="mat-submit-btn">
            {loading
              ? <span className={styles.spinner} />
              : <><FiSend /> Publish & Notify Students</>
            }
          </button>
        </form>

        {/* Sidebar info */}
        <div className={styles.infoPanel}>
          <div className={styles.infoCard}>
            <h3><FiInfo /> Who will receive this?</h3>
            <div className={styles.targetInfo}>
              {CLASS_LEVELS.map(c => (
                <div key={c.value} className={`${styles.targetRow} ${form.classLevel===c.value?styles.targetActive:''}`} style={{ '--tc':c.color }}>
                  <span className={styles.targetDot} />
                  <span>{c.label}</span>
                  <span className={styles.targetCount}>
                    {students.filter(s => s.classLevel === c.value && s.status === 'active').length} students
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.notifNote}>
              <span>🔔</span>
              <p>All <strong>{targetCount} active students</strong> in the selected class will receive an instant notification.</p>
            </div>
          </div>

          <div className={styles.tipsCard}>
            <h3>📌 Tips</h3>
            <ul>
              <li>PDF files work best for notes, exercises, and past papers</li>
              <li>YouTube links are great for lecture recordings</li>
              <li>Use clear titles like "Chapter 3 — Photosynthesis Notes"</li>
              <li>Students can view materials anytime from their portal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
