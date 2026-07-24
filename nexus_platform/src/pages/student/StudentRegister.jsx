// src/pages/student/StudentRegister.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData, CLASS_LEVELS } from '../../context/DataContext';
import toast from 'react-hot-toast';
import {
  FiUser, FiMail, FiLock, FiPhone, FiArrowRight,
  FiEye, FiEyeOff, FiCheck
} from 'react-icons/fi';
import styles from './StudentRegister.module.css';

export default function StudentRegister() {
  const { registerStudent } = useData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', classLevel: '', password: '', confirmPassword: '',
  });
  const [showPw,    setShowPw]    = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState({});

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())    e.fullName    = 'Full name is required';
    if (!form.email.trim())       e.email       = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.phone.trim())       e.phone       = 'Phone number is required';
    if (!form.classLevel)         e.classLevel  = 'Please select your class';
    if (!form.password)           e.password    = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const student = registerStudent({
        fullName: form.fullName, email: form.email,
        phone: form.phone, classLevel: form.classLevel, password: form.password,
      });
      // Store session
      localStorage.setItem('nexus_user', JSON.stringify({ ...student, full_name: student.fullName }));
      toast.success(`Welcome, ${form.fullName.split(' ')[0]}! 🎉`);
      navigate('/student/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
      setErrors({ email: err.message });
    } finally {
      setLoading(false);
    }
  };

  const selectedClass = CLASS_LEVELS.find(c => c.value === form.classLevel);

  return (
    <div className={styles.page}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>N×</span>
            <span className={styles.brandName}>Nexus<span>Lab</span></span>
          </div>
          <h1>Join thousands of students <span>learning smarter.</span></h1>
          <p>Register once, access all your class materials, exams, and live sessions — instantly.</p>

          <div className={styles.classCards}>
            {CLASS_LEVELS.map(c => (
              <div key={c.value} className={styles.classCard} style={{ '--cc': c.color }}>
                <span className={styles.classCardDot} />
                <div>
                  <div className={styles.classCardLabel}>{c.label}</div>
                  <div className={styles.classCardDesc}>
                    {c.value === 'class-8' ? 'JSC level — all core subjects' :
                     c.value === 'class-9-10' ? 'SSC level — 10 subjects' : 'HSC level — 9 subjects'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.features}>
            {['📚 Class-specific study materials', '📝 MCQ, CQ & PDF exams', '🔔 Instant notifications', '🎥 Live tutoring sessions'].map(f => (
              <div key={f} className={styles.feature}><FiCheck /><span>{f}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.portalBadge}><span className={styles.dot} />Student Registration</div>
            <h2>Create your account</h2>
            <p>It's free — join your class today</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Full Name */}
            <div className={`${styles.group} ${errors.fullName ? styles.err : ''}`}>
              <label htmlFor="reg-name">Full Name</label>
              <div className={styles.inputWrap}>
                <FiUser className={styles.icon} />
                <input id="reg-name" type="text" placeholder="Your full name" value={form.fullName} onChange={e => set('fullName', e.target.value)} />
              </div>
              {errors.fullName && <span className={styles.fieldErr}>{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className={`${styles.group} ${errors.email ? styles.err : ''}`}>
              <label htmlFor="reg-email">Email Address</label>
              <div className={styles.inputWrap}>
                <FiMail className={styles.icon} />
                <input id="reg-email" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              {errors.email && <span className={styles.fieldErr}>{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className={`${styles.group} ${errors.phone ? styles.err : ''}`}>
              <label htmlFor="reg-phone">Phone Number</label>
              <div className={styles.inputWrap}>
                <FiPhone className={styles.icon} />
                <input id="reg-phone" type="tel" placeholder="017XXXXXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
              {errors.phone && <span className={styles.fieldErr}>{errors.phone}</span>}
            </div>

            {/* Class Selection */}
            <div className={`${styles.group} ${errors.classLevel ? styles.err : ''}`}>
              <label>Select Your Class <span className={styles.req}>*</span></label>
              <div className={styles.classOptions}>
                {CLASS_LEVELS.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    id={`class-opt-${c.value}`}
                    className={`${styles.classOpt} ${form.classLevel === c.value ? styles.classOptActive : ''}`}
                    style={{ '--co': c.color }}
                    onClick={() => set('classLevel', c.value)}
                  >
                    <span className={styles.classOptDot} />
                    <span className={styles.classOptLabel}>{c.label}</span>
                    {form.classLevel === c.value && <FiCheck className={styles.classCheck} />}
                  </button>
                ))}
              </div>
              {errors.classLevel && <span className={styles.fieldErr}>{errors.classLevel}</span>}
            </div>

            {/* Password */}
            <div className={`${styles.group} ${errors.password ? styles.err : ''}`}>
              <label htmlFor="reg-password">Password</label>
              <div className={styles.inputWrap}>
                <FiLock className={styles.icon} />
                <input id="reg-password" type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={e => set('password', e.target.value)} />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPw(p => !p)} tabIndex={-1}>
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className={styles.fieldErr}>{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className={`${styles.group} ${errors.confirmPassword ? styles.err : ''}`}>
              <label htmlFor="reg-confirm">Confirm Password</label>
              <div className={styles.inputWrap}>
                <FiLock className={styles.icon} />
                <input id="reg-confirm" type={showPw ? 'text' : 'password'} placeholder="Repeat password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
              </div>
              {errors.confirmPassword && <span className={styles.fieldErr}>{errors.confirmPassword}</span>}
            </div>

            <button type="submit" id="reg-submit-btn" className={styles.submitBtn} disabled={loading}>
              {loading
                ? <span className={styles.spinner} />
                : <>{selectedClass ? `Register for ${selectedClass.label}` : 'Create Account'} <FiArrowRight /></>
              }
            </button>
          </form>

          <p className={styles.loginLink}>
            Already have an account? <Link to="/student/login">Sign in →</Link>
          </p>
          <div className={styles.portalSwitch}>
            Are you a teacher? <Link to="/teacher/login">Teacher Portal →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
