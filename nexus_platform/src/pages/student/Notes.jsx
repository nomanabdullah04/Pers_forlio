// src/pages/student/Notes.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiEdit3, FiTrash2, FiBookmark, FiPlus, FiSave, FiSearch, FiFileText } from 'react-icons/fi';
import styles from './Notes.module.css';

const SEED_NOTES = [
  { id: 'n1', title: 'Calculus Integration Formula', subject: 'Math', content: 'Formula for Integration by Parts: \n\n∫ u dv = uv - ∫ v du \n\nUse LIATE rule to choose u: \nL = Logarithmic \nI = Inverse Trig \nA = Algebraic \nT = Trigonometric \nE = Exponential', date: '2026-07-16' },
  { id: 'n2', title: 'Newton\'s 2nd Law Definition', subject: 'Physics', content: 'F = ma. Force equals mass times acceleration. \nAcceleration is direct to Force, inverse to Mass.', date: '2026-07-15' },
];

const SEED_BOOKMARKS = [
  { id: 'bk1', title: 'Calculus Integration — Lecture Video', type: 'youtube', subject: 'Math', url: 'https://www.youtube.com/embed/HfACrKJ_Y2w' },
  { id: 'bk2', title: 'Newton\'s Laws — Chapter Notes', type: 'pdf', subject: 'Physics', fileName: 'newton_laws.pdf' },
];

export default function StudentNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // Form states
  const [newNote, setNewNote] = useState({ title: '', subject: 'Math', content: '' });
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('notes');

  useEffect(() => {
    // Load from local storage
    const storedNotes = localStorage.getItem(`nx_notes_${user?.email}`);
    const storedBks = localStorage.getItem(`nx_bks_${user?.email}`);

    if (storedNotes) setNotes(JSON.parse(storedNotes));
    else {
      localStorage.setItem(`nx_notes_${user?.email}`, JSON.stringify(SEED_NOTES));
      setNotes(SEED_NOTES);
    }

    if (storedBks) setBookmarks(JSON.parse(storedBks));
    else {
      localStorage.setItem(`nx_bks_${user?.email}`, JSON.stringify(SEED_BOOKMARKS));
      setBookmarks(SEED_BOOKMARKS);
    }
  }, [user]);

  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem(`nx_notes_${user?.email}`, JSON.stringify(updated));
  };

  const saveBookmarks = (updated) => {
    setBookmarks(updated);
    localStorage.setItem(`nx_bks_${user?.email}`, JSON.stringify(updated));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const added = [
      { id: Math.random().toString(), ...newNote, date: new Date().toISOString().slice(0, 10) },
      ...notes
    ];
    saveNotes(added);
    setNewNote({ title: '', subject: 'Math', content: '' });
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  const handleDeleteBookmark = (id) => {
    const updated = bookmarks.filter(b => b.id !== id);
    saveBookmarks(updated);
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiFileText /> Study Desk</h1>
          <p className={styles.subtitle}>Compose revision notes and save quick bookmarks of study materials.</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'notes' ? styles.tabActive : ''}`} onClick={() => setActiveTab('notes')}>
          ✏️ My Notes ({notes.length})
        </button>
        <button className={`${styles.tab} ${activeTab === 'bookmarks' ? styles.tabActive : ''}`} onClick={() => setActiveTab('bookmarks')}>
          🔖 Bookmarked Materials ({bookmarks.length})
        </button>
      </div>

      {activeTab === 'notes' && (
        <div className={styles.notesContainer}>
          {/* Note composing form */}
          <div className={styles.formCard}>
            <h3>Create New Note</h3>
            <form onSubmit={handleAddNote}>
              <div className={styles.formGroup}>
                <label>Note Title</label>
                <input
                  type="text"
                  placeholder="e.g. Coulomb's Law notes"
                  value={newNote.title}
                  onChange={e => setNewNote(p => ({ ...p, title: e.target.value }))}
                  required
                  id="note-title-input"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Subject</label>
                <select
                  value={newNote.subject}
                  onChange={e => setNewNote(p => ({ ...p, subject: e.target.value }))}
                  id="note-subject-select"
                >
                  <option value="Math">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="General Science">General Science</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Content</label>
                <textarea
                  placeholder="Write formulas, definitions, key lecture points here..."
                  rows={6}
                  value={newNote.content}
                  onChange={e => setNewNote(p => ({ ...p, content: e.target.value }))}
                  required
                  id="note-content-input"
                />
              </div>

              <button type="submit" className={styles.saveBtn} id="save-note-btn">
                <FiSave /> Save Note
              </button>
            </form>
          </div>

          {/* Saved notes listing */}
          <div className={styles.listSection}>
            <div className={styles.searchBar}>
              <FiSearch />
              <input
                type="text"
                placeholder="Search your notes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="search-notes-input"
              />
            </div>

            <div className={styles.notesGrid}>
              {filteredNotes.length === 0 ? (
                <div className={styles.empty}>
                  <span>📝</span>
                  <p>No notes found. Create your first note on the left!</p>
                </div>
              ) : (
                filteredNotes.map(note => (
                  <div key={note.id} className={styles.noteCard}>
                    <div className={styles.noteHeader}>
                      <span className={`${styles.subjectBadge} ${styles[note.subject.toLowerCase()]}`}>
                        {note.subject}
                      </span>
                      <button className={styles.deleteBtn} onClick={() => handleDeleteNote(note.id)} id={`delete-note-${note.id}`}>
                        <FiTrash2 />
                      </button>
                    </div>
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                    <span className={styles.date}>Saved on: {note.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bookmarks' && (
        <div className={styles.bookmarksContainer}>
          {bookmarks.length === 0 ? (
            <div className={styles.empty}>
              <span>🔖</span>
              <p>No materials bookmarked yet. Bookmark lectures in "Study Materials" to view them here.</p>
            </div>
          ) : (
            <div className={styles.bookmarksGrid}>
              {bookmarks.map(bk => (
                <div key={bk.id} className={styles.bkCard}>
                  <div className={styles.bkHeader}>
                    <span className={styles.bkBadge}>{bk.subject}</span>
                    <button className={styles.deleteBtn} onClick={() => handleDeleteBookmark(bk.id)} id={`delete-bk-${bk.id}`}>
                      <FiTrash2 />
                    </button>
                  </div>
                  <h3 className={styles.bkTitle}>{bk.title}</h3>
                  <div className={styles.bkMeta}>
                    <span>Type: {bk.type === 'youtube' ? '▶ Video Lecture' : '📄 PDF Resource'}</span>
                  </div>
                  <div className={styles.bkFooter}>
                    {bk.type === 'youtube' ? (
                      <a href={bk.url} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
                        Watch Video Replay
                      </a>
                    ) : (
                      <button className={styles.viewBtn} onClick={() => alert('PDF resource loaded from bookmarks.')}>
                        Open PDF Note
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
