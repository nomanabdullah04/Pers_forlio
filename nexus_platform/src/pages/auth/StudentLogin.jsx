// src/pages/auth/StudentLogin.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiX, FiCheckCircle } from 'react-icons/fi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import styles from './Login.module.css';

export default function StudentLogin() {
  const { login }   = useAuth();
  const { resetPassword, students } = useData();
  const navigate    = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '', remember: false });
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

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.role !== 'student') {
        toast.error('Please use the teacher login portal');
        return;
      }
      toast.success(`Welcome back, ${user.full_name}! 🎓`);
      navigate('/student/dashboard');
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
      const exists = students.some(s => s.email === forgotEmail);
      if (!exists) {
        setForgotError('No student account registered with this email address');
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
      {/* Left Panel — Decorative */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.brandMark}>
            <span className={styles.brandIcon}>N×</span>
            <span className={styles.brandName}>Nexus<span>Lab</span></span>
          </div>
          <h1 className={styles.leftHeading}>
            Start your<br />learning journey<br />
            <span className={styles.gradText}>today.</span>
          </h1>
          <p className={styles.leftSub}>
            Access thousands of courses taught by expert teachers. Track your progress, attend live sessions, and achieve your goals.
          </p>
          <div className={styles.statsRow}>
            <div className={styles.stat}><strong>1,240+</strong><span>Students</span></div>
            <div className={styles.statDiv}></div>
            <div className={styles.stat}><strong>320+</strong><span>Courses</span></div>
            <div className={styles.statDiv}></div>
            <div className={styles.stat}><strong>86</strong><span>Teachers</span></div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.testAvatar}>আ</div>
            <div>
              <p>"Nexus helped me score A+ in my HSC exams. The live sessions are amazing!"</p>
              <span>— Ayesha Rahman, HSC 2024</span>
            </div>
          </div>
        </div>
        <div className={styles.leftBg}></div>
        <canvas className={styles.bgCanvas} id="loginCanvas"></canvas>
      </div>

      {/* Right Panel — Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={styles.portalBadge}>
              <span className={styles.badgeDot}></span>
              Student Portal
            </div>
            <h2>Welcome back 👋</h2>
            <p>Sign in to continue your learning</p>
          </div>

          {errors.general && (
            <div className={styles.errorAlert}>
              <span>⚠ {errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Email */}
            <div className={`${styles.inputGroup} ${errors.email ? styles.hasError : ''}`}>
              <label>Email Address</label>
              <div className={styles.inputWrap}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  id="student-email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => { setForm(p=>({...p, email: e.target.value})); setErrors(p=>({...p, email:''})); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={`${styles.inputGroup} ${errors.password ? styles.hasError : ''}`}>
              <div className={styles.labelRow}>
                <label>Password</label>
                <button type="button" onClick={() => { setShowForgot(true); setForgotStep(1); setForgotError(''); }} className={styles.forgotLink}>Forgot password?</button>
              </div>
              <div className={styles.inputWrap}>
                <FiLock className={styles.inputIcon} />
                <input
                  type={showPw ? 'text' : 'password'}
                  id="student-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => { setForm(p=>({...p, password: e.target.value})); setErrors(p=>({...p, password:''})); }}
                  autoComplete="current-password"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPw(p=>!p)} tabIndex={-1}>
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            {/* Remember me */}
            <div className={styles.checkRow}>
              <label className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm(p=>({...p, remember: e.target.checked}))}
                  id="student-remember"
                />
                <span className={styles.checkBox}></span>
                Remember me for 7 days
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading} id="student-submit-btn">
              {loading ? (
                <span className={styles.spinner}></span>
              ) : (
                <>Sign In <FiArrowRight /></>
              )}
            </button>
          </form>

          <div className={styles.divider}><span>or continue with</span></div>

          <div className={styles.socialBtns}>
            <button className={styles.socialBtn} id="google-login-btn">
              <FaGoogle /> Google
            </button>
            <button className={styles.socialBtn} id="facebook-login-btn">
              <FaFacebookF /> Facebook
            </button>
          </div>

          <p className={styles.switchLink}>
            Don't have an account?{' '}
            <Link to="/student/register">Create one free →</Link>
          </p>

          <div className={styles.portalSwitch}>
            Are you a teacher?{' '}
            <Link to="/teacher/login">Teacher Portal →</Link>
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
                Recover your student account password using your email.
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
                        placeholder="ayesha@student.com"
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
