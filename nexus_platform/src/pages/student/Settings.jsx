// src/pages/student/Settings.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiSettings, FiUser, FiLock, FiBell, FiShield, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './Settings.module.css';

export default function StudentSettings() {
  const { user, updateUser } = useAuth();
  const { students, updateStudentProfile, resetPassword } = useData();

  // Find dynamic record
  const student = students.find(s => s.email === user?.email) || user;

  const [fullName, setFullName] = useState(student?.fullName || student?.full_name || '');
  const [classLevel, setClassLevel] = useState(student?.classLevel || 'class-11-12');
  const [selectedSubjects, setSelectedSubjects] = useState(student?.selectedSubjects || ['Physics', 'Mathematics', 'Chemistry']);
  
  // Password state
  const [passwordState, setPasswordState] = useState({ current: '', new: '', confirm: '' });

  const handleProfileSave = (e) => {
    e.preventDefault();
    try {
      // 1. Update fields in DataContext database list
      updateStudentProfile(student.id, { fullName, classLevel, selectedSubjects });
      // 2. Update user profile inside AuthContext state
      updateUser({ full_name: fullName, classLevel, class_level: classLevel, selectedSubjects });
      toast.success('Profile settings updated successfully!');
    } catch {
      toast.error('Failed to update profile settings.');
    }
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (!passwordState.current || !passwordState.new) {
      toast.error('Please fill in password fields');
      return;
    }
    if (passwordState.new.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (passwordState.new !== passwordState.confirm) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      resetPassword(student.email, passwordState.new);
      toast.success('Password updated successfully!');
      setPasswordState({ current: '', new: '', confirm: '' });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiSettings /> Account Settings</h1>
          <p className={styles.subtitle}>Manage your profile details, select your current class level, and configure security options.</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Profile Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3><FiUser /> Profile Information</h3>
          </div>
          <form onSubmit={handleProfileSave} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                id="settings-name-input"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Registered Email</label>
              <input
                type="email"
                value={student?.email}
                disabled
                style={{ cursor: 'not-allowed', opacity: 0.65 }}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Current Class Level</label>
              <select
                value={classLevel}
                onChange={e => setClassLevel(e.target.value)}
                id="settings-class-select"
              >
                <option value="class-8">Class 8</option>
                <option value="class-9-10">Class 9-10 (SSC)</option>
                <option value="class-11-12">Class 11-12 (HSC)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Select Syllabus Subjects</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.4rem' }}>
                {['Physics', 'Mathematics', 'Chemistry', 'Biology', 'English'].map(sub => {
                  const checked = selectedSubjects.includes(sub);
                  return (
                    <label key={sub} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer', color: '#ccd6f6' }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            setSelectedSubjects(prev => prev.filter(x => x !== sub));
                          } else {
                            setSelectedSubjects(prev => [...prev, sub]);
                          }
                        }}
                      />
                      {sub}
                    </label>
                  );
                })}
              </div>
            </div>

            <button type="submit" className={styles.saveBtn} id="save-profile-btn">
              <FiSave /> Save Profile Settings
            </button>
          </form>
        </div>

        {/* Security / Password Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3><FiLock /> Change Password</h3>
          </div>
          <form onSubmit={handlePasswordSave} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordState.current}
                onChange={e => setPasswordState(p => ({ ...p, current: e.target.value }))}
                required
                id="settings-curr-pw"
              />
            </div>

            <div className={styles.formGroup}>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Min 6 characters"
                value={passwordState.new}
                onChange={e => setPasswordState(p => ({ ...p, new: e.target.value }))}
                required
                id="settings-new-pw"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Repeat new password"
                value={passwordState.confirm}
                onChange={e => setPasswordState(p => ({ ...p, confirm: e.target.value }))}
                required
                id="settings-confirm-pw"
              />
            </div>

            <button type="submit" className={styles.saveBtn} id="save-password-btn">
              <FiLock /> Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
