// src/pages/student/Materials.jsx
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import ClassBadge from '../../components/ui/ClassBadge';
import { FiBook, FiSearch, FiYoutube, FiFile, FiEye, FiDownload, FiX, FiFilter } from 'react-icons/fi';
import styles from './Materials.module.css';

const SUBJECTS_ALL = ['All Subjects','Math','Physics','Chemistry','Biology','English','Bangla','Science','History','Geography','ICT','Religion','Economics'];

export default function Materials() {
  const { user } = useAuth();
  const { materials } = useData();
  const studentClass = user?.classLevel ?? user?.class_level ?? 'class-11-12';

  const [search,  setSearch]  = useState('');
  const [subject, setSubject] = useState('All Subjects');
  const [typeF,   setTypeF]   = useState('all');
  const [preview, setPreview] = useState(null); // { type, url, title }

  const myMaterials = materials
    .filter(m => m.classLevel === studentClass)
    .filter(m => subject === 'All Subjects' || m.subject === subject)
    .filter(m => typeF === 'all' || m.type === typeF)
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()));

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiBook /> Study Materials</h1>
          <div className={styles.classInfo}>
            <span>Your class:</span>
            <ClassBadge value={studentClass} size="md" />
            <span className={styles.matCount}>— {myMaterials.length} materials available</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <FiSearch />
          <input id="mat-search" placeholder="Search materials…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className={styles.typeTabs}>
          {[{v:'all',l:'All'},{v:'pdf',l:'📄 PDF'},{v:'youtube',l:'▶ Video'}].map(t => (
            <button key={t.v} className={`${styles.ttab} ${typeF===t.v?styles.ttabActive:''}`} onClick={() => setTypeF(t.v)}>
              {t.l}
            </button>
          ))}
        </div>
        <select className={styles.subjectSelect} value={subject} onChange={e => setSubject(e.target.value)} id="subject-filter">
          {SUBJECTS_ALL.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {myMaterials.length === 0 && (
          <div className={styles.empty}>
            <span>📭</span>
            <p>No materials found for your class yet. Check back soon!</p>
          </div>
        )}
        {myMaterials.map(m => (
          <div key={m.id} className={`${styles.card} ${m.type === 'youtube' ? styles.videoCard : styles.pdfCard}`}>
            <div className={styles.cardThumb}>
              {m.type === 'youtube'
                ? <div className={styles.ytThumb}><FiYoutube /><span>Video</span></div>
                : <div className={styles.pdfThumb}><FiFile /><span>PDF</span></div>
              }
              {m.type === 'youtube' && (
                <button className={styles.playOverlay} onClick={() => setPreview({ type:'youtube', url:m.url, title:m.title })} id={`play-${m.id}`}>
                  ▶
                </button>
              )}
            </div>
            <div className={styles.cardBody}>
              <div className={styles.subjectTag}>{m.subject}</div>
              <h3 className={styles.title}>{m.title}</h3>
              <p className={styles.desc}>{m.description}</p>
              <div className={styles.meta}>
                <span className={styles.date}>{fmtDate(m.createdAt)}</span>
                <span className={styles.views}><FiEye /> {m.views}</span>
              </div>
            </div>
            <div className={styles.cardFooter}>
              {m.type === 'youtube' ? (
                <button
                  className={styles.watchBtn}
                  onClick={() => setPreview({ type:'youtube', url:m.url, title:m.title })}
                  id={`watch-${m.id}`}
                >
                  <FiYoutube /> Watch Video
                </button>
              ) : (
                <a
                  href={m.url ?? '#'}
                  download={m.fileName}
                  className={styles.downloadBtn}
                  id={`download-${m.id}`}
                  onClick={e => { if (!m.url) { e.preventDefault(); alert('PDF preview not available in demo. In production, the actual file would be served here.'); } }}
                >
                  <FiDownload /> Download PDF
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Video Preview Modal */}
      {preview && (
        <div className={styles.modalOverlay} onClick={() => setPreview(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{preview.title}</h3>
              <button className={styles.closeBtn} onClick={() => setPreview(null)} id="close-preview"><FiX /></button>
            </div>
            <div className={styles.videoWrap}>
              <iframe
                src={preview.url}
                title={preview.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
