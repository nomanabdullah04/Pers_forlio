// src/pages/teacher/StudentRegistry.jsx
import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import ClassBadge from '../../components/ui/ClassBadge';
import {
  FiUsers, FiSearch, FiFilter, FiEdit2, FiToggleLeft, FiToggleRight,
  FiUserCheck, FiUserX, FiChevronDown, FiCalendar, FiMail, FiPhone
} from 'react-icons/fi';
import styles from './StudentRegistry.module.css';

const CLASS_OPTS = [
  { value: 'all',         label: 'All Classes' },
  { value: 'class-8',     label: 'Class 8'     },
  { value: 'class-9-10',  label: 'Class 9-10 (SSC)'  },
  { value: 'class-11-12', label: 'Class 11-12 (HSC)' },
];

const STATUS_OPTS = ['All', 'Active', 'Inactive'];

export default function StudentRegistry() {
  const { students, updateStudentClass, toggleStudentStatus } = useData();

  const [search,    setSearch]    = useState('');
  const [classF,    setClassF]    = useState('all');
  const [statusF,   setStatusF]   = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [newClass,  setNewClass]  = useState('');

  const filtered = useMemo(() => students.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = s.fullName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    const matchClass  = classF === 'all' || s.classLevel === classF;
    const matchStatus = statusF === 'All' || s.status === statusF.toLowerCase();
    return matchSearch && matchClass && matchStatus;
  }), [students, search, classF, statusF]);

  const counts = useMemo(() => ({
    all:      students.length,
    active:   students.filter(s => s.status === 'active').length,
    class8:   students.filter(s => s.classLevel === 'class-8').length,
    ssc:      students.filter(s => s.classLevel === 'class-9-10').length,
    hsc:      students.filter(s => s.classLevel === 'class-11-12').length,
  }), [students]);

  const handleSaveClass = (id) => {
    if (newClass) updateStudentClass(id, newClass);
    setEditingId(null);
    setNewClass('');
  };

  const fmtDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1><FiUsers /> Student Registry</h1>
          <p>Manage all students registered under your teaching</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryRow}>
        <div className={styles.sumCard} style={{ '--c':'#64ffda' }}>
          <div className={styles.sumNum}>{counts.all}</div>
          <div className={styles.sumLabel}>Total Students</div>
        </div>
        <div className={styles.sumCard} style={{ '--c':'#10b981' }}>
          <div className={styles.sumNum}>{counts.active}</div>
          <div className={styles.sumLabel}>Active</div>
        </div>
        <div className={styles.sumCard} style={{ '--c':'#34d399' }}>
          <div className={styles.sumNum}>{counts.class8}</div>
          <div className={styles.sumLabel}>Class 8</div>
        </div>
        <div className={styles.sumCard} style={{ '--c':'#60a5fa' }}>
          <div className={styles.sumNum}>{counts.ssc}</div>
          <div className={styles.sumLabel}>SSC (9-10)</div>
        </div>
        <div className={styles.sumCard} style={{ '--c':'#a78bfa' }}>
          <div className={styles.sumNum}>{counts.hsc}</div>
          <div className={styles.sumLabel}>HSC (11-12)</div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <FiSearch />
          <input
            id="student-search"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filterRow}>
          <div className={styles.selectWrap}>
            <FiFilter />
            <select value={classF} onChange={e => setClassF(e.target.value)} id="class-filter">
              {CLASS_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <FiChevronDown className={styles.chevron} />
          </div>
          <div className={styles.statusTabs}>
            {STATUS_OPTS.map(s => (
              <button key={s} className={`${styles.stab} ${statusF===s?styles.stabActive:''}`}
                onClick={() => setStatusF(s)}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Class</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className={styles.emptyRow}>No students found</td></tr>
            )}
            {filtered.map((s, i) => (
              <tr key={s.id} className={s.status === 'inactive' ? styles.inactiveRow : ''}>
                <td className={styles.numCell}>{i + 1}</td>
                <td>
                  <div className={styles.studentCell}>
                    <div className={styles.avatar}>{s.fullName[0]}</div>
                    <div>
                      <div className={styles.sName}>{s.fullName}</div>
                      <div className={styles.sEmail}><FiMail />{s.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {editingId === s.id ? (
                    <div className={styles.classEdit}>
                      <select
                        value={newClass || s.classLevel}
                        onChange={e => setNewClass(e.target.value)}
                        id={`class-select-${s.id}`}
                      >
                        <option value="class-8">Class 8</option>
                        <option value="class-9-10">Class 9-10 (SSC)</option>
                        <option value="class-11-12">Class 11-12 (HSC)</option>
                      </select>
                      <button className={styles.saveBtn} onClick={() => handleSaveClass(s.id)}>Save</button>
                      <button className={styles.cancelBtn} onClick={() => setEditingId(null)}>✕</button>
                    </div>
                  ) : (
                    <ClassBadge value={s.classLevel} />
                  )}
                </td>
                <td className={styles.phoneCell}><FiPhone />{s.phone}</td>
                <td className={styles.dateCell}><FiCalendar />{fmtDate(s.joinDate)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[`status_${s.status}`]}`}>
                    {s.status === 'active' ? <><FiUserCheck /> Active</> : <><FiUserX /> Inactive</>}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => { setEditingId(s.id); setNewClass(s.classLevel); }}
                      title="Reassign class"
                      id={`reassign-${s.id}`}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className={`${styles.toggleBtn} ${s.status === 'active' ? styles.deactivate : styles.activate}`}
                      onClick={() => toggleStudentStatus(s.id)}
                      title={s.status === 'active' ? 'Deactivate' : 'Activate'}
                      id={`toggle-${s.id}`}
                    >
                      {s.status === 'active' ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students
      </div>
    </div>
  );
}
