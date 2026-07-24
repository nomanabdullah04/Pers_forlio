// src/pages/teacher/Settings.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiSettings, FiUser, FiLock, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './Settings.module.css';

export default function TeacherSettings() {
  const { user, updateUser } = useAuth();
  const { resetPassword } = useData();

  const [fullName, setFullName] = useState(user?.full_name || 'Dr. Kamal Hossain');
  const [passwordState, setPasswordState] = useState({ current: '', new: '', confirm: '' });

  const handleProfileSave = (e) => {
    e.preventDefault();
    try {
      updateUser({ full_name: fullName });
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
      resetPassword(user.email, passwordState.new);
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
          <h1><FiSettings /> Educator Settings</h1>
          <p className={styles.subtitle}>Manage your profile details, teaching parameters, and secure your educator account.</p>
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
                value={user?.email}
                disabled
                style={{ cursor: 'not-allowed', opacity: 0.65 }}
              />
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
