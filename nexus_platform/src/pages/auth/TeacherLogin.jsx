// src/pages/auth/TeacherLogin.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiX, FiCheckCircle } from 'react-icons/fi';
import styles from './Login.module.css';
import teacherStyles from './TeacherLogin.module.css';

export default function TeacherLogin() {
  const { login }   = useAuth();
  const { resetPassword } = useData();
  const navigate    = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});

  // Forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPw, setForgotNewPw] = useState('');
  const [forgotConfirmPw, setForgotConfirmPw] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.role !== 'teacher') {
        toast.error('Please use the student login portal');
        return;
      }
      toast.success(`Welcome back, ${user.full_name}! 👩‍🏫`);
      navigate('/teacher/dashboard');
    } catch (err) {
      const msg = err.response?.data?.detail || 'Invalid email or password';
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    if (forgotStep === 1) {
      if (!forgotEmail) {
        setForgotError('Please enter your email address');
        return;
      }
      if (forgotEmail !== 'teacher@nexus.com') {
        setForgotError('No teacher account registered with this email address');
        return;
      }
      setForgotLoading(true);
      setTimeout(() => {
        setForgotLoading(false);
        setForgotStep(2);
        toast.success('verification OTP code sent to email!');
      }, 1200);
    } else if (forgotStep === 2) {
      if (forgotOtp.length !== 6) {
        setForgotError('Please enter a valid 6-digit verification code');
        return;
      }
      setForgotLoading(true);
      setTimeout(() => {
        setForgotLoading(false);
        setForgotStep(3);
      }, 800);
    } else if (forgotStep === 3) {
      if (!forgotNewPw) {
        setForgotError('Please enter a new password');
        return;
      }
      if (forgotNewPw.length < 6) {
        setForgotError('Password must be at least 6 characters');
        return;
      }
      if (forgotNewPw !== forgotConfirmPw) {
        setForgotError('Passwords do not match');
        return;
      }
      setForgotLoading(true);
      try {
        resetPassword(forgotEmail, forgotNewPw);
        toast.success('Password reset successful!');
        setShowForgot(false);
        setForgotStep(1);
        setForgotEmail('');
        setForgotOtp('');
        setForgotNewPw('');
        setForgotConfirmPw('');
      } catch (err) {
        setForgotError(err.message);
      } finally {
        setForgotLoading(false);
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Left Panel */}
      <div className={`${styles.leftPanel} ${teacherStyles.teacherLeft}`}>
        <div className={styles.leftContent}>
          <div className={styles.brandMark}>
            <span className={styles.brandIcon}>N×</span>
            <span className={styles.brandName}>Nexus<span>Lab</span></span>
          </div>
          <h1 className={styles.leftHeading}>
            Empower students,<br />
            <span className={teacherStyles.teacherGrad}>inspire minds.</span>
          </h1>
          <p className={styles.leftSub}>
            Create courses, host live sessions, track student progress, and earn while doing what you love — teaching.
          </p>

          <div className={teacherStyles.featureList}>
            {[
              { icon: '📚', text: 'Create & manage unlimited courses' },
              { icon: '🎥', text: 'Host live video tutoring sessions' },
              { icon: '📊', text: 'Advanced student analytics dashboard' },
              { icon: '💰', text: 'Earn monthly payments automatically' },
              { icon: '🤖', text: 'AI-assisted content recommendations' },
            ].map((f, i) => (
              <div key={i} className={teacherStyles.featureItem}>
                <span className={teacherStyles.featureEmoji}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.leftBg}></div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={`${styles.portalBadge} ${teacherStyles.teacherBadge}`}>
              <span className={styles.badgeDot}></span>
              Teacher Portal
            </div>
            <h2>Teacher Sign In</h2>
            <p>Access your teaching dashboard</p>
          </div>

          {errors.general && (
            <div className={styles.errorAlert}>
              <span>⚠ {errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div style={{
              background: 'rgba(124,58,237,0.1)', border: '1px dashed rgba(124,58,237,0.3)',
              borderRadius: '8px', padding: '0.75rem', fontSize: '0.8rem', color: '#a78bfa',
              marginBottom: '1.25rem', lineHeight: '1.4'
            }}>
              💡 <strong>Demo Teacher Account:</strong><br />
              Email: <code>teacher@nexus.com</code><br />
              Password: <code>demo123</code>
            </div>

            <div className={`${styles.inputGroup} ${errors.email ? styles.hasError : ''}`}>
              <label>Email Address</label>
              <div className={styles.inputWrap}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  id="teacher-email"
                  placeholder="teacher@nexus.com"
                  value={form.email}
                  onChange={e => { setForm(p=>({...p,email:e.target.value})); setErrors(p=>({...p,email:''})); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={`${styles.inputGroup} ${errors.password ? styles.hasError : ''}`}>
              <div className={styles.labelRow}>
                <label>Password</label>
                <button type="button" onClick={() => { setShowForgot(true); setForgotStep(1); setForgotError(''); }} className={styles.forgotLink}>Forgot?</button>
              </div>
              <div className={styles.inputWrap}>
                <FiLock className={styles.inputIcon} />
                <input
                  type={showPw ? 'text' : 'password'}
                  id="teacher-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => { setForm(p=>({...p,password:e.target.value})); setErrors(p=>({...p,password:''})); }}
                  autoComplete="current-password"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPw(p=>!p)} tabIndex={-1}>
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            <button type="submit" className={`${styles.submitBtn} ${teacherStyles.teacherBtn}`} disabled={loading} id="teacher-submit-btn">
              {loading ? <span className={styles.spinner}></span> : <>Sign In <FiArrowRight /></>}
            </button>
          </form>

          <p className={styles.switchLink} style={{marginTop:'1.5rem'}}>
            New teacher? <Link to="/teacher/register">Apply to teach →</Link>
          </p>

          <div className={styles.portalSwitch}>
            Are you a student? <Link to="/student/login">Student Portal →</Link>
          </div>
        </div>
      </div>
      {/* Forgot Password Modal */}
      {showForgot && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(10,25,47,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }} onClick={() => setShowForgot(false)}>
          <div style={{
            background: '#112240', border: '1px solid rgba(100,255,218,0.2)',
            borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '450px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            <button style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              color: '#8892b0', fontSize: '1.2rem', cursor: 'pointer'
            }} onClick={() => setShowForgot(false)} id="close-forgot-modal">
              <FiX />
            </button>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', color: '#e6f1ff', fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Password Recovery
              </h3>
              <p style={{ color: '#8892b0', fontSize: '0.85rem' }}>
                Recover your teacher account password using your email.
              </p>
            </div>

            {forgotError && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '8px', color: '#ef4444', padding: '0.75rem', fontSize: '0.8rem',
                marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <span>⚠ {forgotError}</span>
              </div>
            )}

            <form onSubmit={handleForgotSubmit}>
              {forgotStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ color: '#ccd6f6', fontSize: '0.8rem', fontWeight: 600 }}>Enter Registered Email</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <FiMail style={{ position: 'absolute', left: '1rem', color: '#64ffda' }} />
                      <input
                        type="email"
                        style={{
                          width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem',
                          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(100,255,218,0.15)',
                          borderRadius: '8px', color: '#e6f1ff', outline: 'none', fontSize: '0.9rem'
                        }}
                        placeholder="teacher@nexus.com"
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={forgotLoading} style={{
                    background: 'linear-gradient(135deg, #64ffda, #7c3aed)', color: '#0a192f',
                    border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    {forgotLoading ? <span className={styles.spinner}></span> : 'Send Verification Code'}
                  </button>
                </div>
              )}

              {forgotStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ color: '#8892b0', fontSize: '0.8rem' }}>
                    A 6-digit OTP code has been sent to <strong>{forgotEmail}</strong>. (For demo purposes, enter any 6 digits e.g. <code>123456</code>).
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ color: '#ccd6f6', fontSize: '0.8rem', fontWeight: 600 }}>6-Digit Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', textAlign: 'center', letterSpacing: '0.5rem', fontWeight: 700,
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(100,255,218,0.15)',
                        borderRadius: '8px', color: '#64ffda', outline: 'none', fontSize: '1.2rem'
                      }}
                      placeholder="000000"
                      value={forgotOtp}
                      onChange={e => setForgotOtp(e.target.value.replace(/\D/g,''))}
                      required
                    />
                  </div>
                  <button type="submit" disabled={forgotLoading} style={{
                    background: 'linear-gradient(135deg, #64ffda, #7c3aed)', color: '#0a192f',
                    border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    {forgotLoading ? <span className={styles.spinner}></span> : 'Verify OTP Code'}
                  </button>
                </div>
              )}

              {forgotStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ color: '#ccd6f6', fontSize: '0.8rem', fontWeight: 600 }}>New Password</label>
                    <input
                      type="password"
                      style={{
                        width: '100%', padding: '0.75rem 1rem',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(100,255,218,0.15)',
                        borderRadius: '8px', color: '#e6f1ff', outline: 'none', fontSize: '0.9rem'
                      }}
                      placeholder="Min 6 characters"
                      value={forgotNewPw}
                      onChange={e => setForgotNewPw(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ color: '#ccd6f6', fontSize: '0.8rem', fontWeight: 600 }}>Confirm New Password</label>
                    <input
                      type="password"
                      style={{
                        width: '100%', padding: '0.75rem 1rem',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(100,255,218,0.15)',
                        borderRadius: '8px', color: '#e6f1ff', outline: 'none', fontSize: '0.9rem'
                      }}
                      placeholder="Repeat new password"
                      value={forgotConfirmPw}
                      onChange={e => setForgotConfirmPw(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" disabled={forgotLoading} style={{
                    background: 'linear-gradient(135deg, #64ffda, #7c3aed)', color: '#0a192f',
                    border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    {forgotLoading ? <span className={styles.spinner}></span> : 'Reset Password'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
