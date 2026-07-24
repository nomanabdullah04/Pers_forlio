// src/context/DataContext.jsx
// Global state store — students, materials, assessments, notifications
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext(null);

// ── Class helpers ────────────────────────────────────────────────
export const CLASS_LEVELS = [
  { value: 'class-8',    label: 'Class 8',          short: 'Cl.8', color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.25)'  },
  { value: 'class-9-10', label: 'Class 9-10 (SSC)',  short: 'SSC',  color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.25)'  },
  { value: 'class-11-12',label: 'Class 11-12 (HSC)', short: 'HSC',  color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)' },
];
export const getClassInfo = (val) => CLASS_LEVELS.find(c => c.value === val) ?? CLASS_LEVELS[0];

// ── Seed data ───────────────────────────────────────────────────
const SEED_STUDENTS = [
  { id:'s1', fullName:'Ayesha Rahman',  email:'ayesha@student.com', phone:'01711000001', classLevel:'class-11-12', joinDate:'2026-06-15', status:'active',   password:'demo123', role:'student', notifications:[], examResults:[] },
  { id:'s2', fullName:'Rahim Hossain',  email:'rahim@student.com',  phone:'01711000002', classLevel:'class-9-10',  joinDate:'2026-06-18', status:'active',   password:'demo123', role:'student', notifications:[], examResults:[] },
  { id:'s3', fullName:'Priya Sharma',   email:'priya@student.com',  phone:'01711000003', classLevel:'class-8',     joinDate:'2026-06-20', status:'active',   password:'demo123', role:'student', notifications:[], examResults:[] },
  { id:'s4', fullName:'Karim Ahmed',    email:'karim@student.com',  phone:'01711000004', classLevel:'class-9-10',  joinDate:'2026-07-01', status:'active',   password:'demo123', role:'student', notifications:[], examResults:[] },
  { id:'s5', fullName:'Sabrina Akter',  email:'sabrina@student.com',phone:'01711000005', classLevel:'class-11-12', joinDate:'2026-07-03', status:'active',   password:'demo123', role:'student', notifications:[], examResults:[] },
  { id:'s6', fullName:'Touhid Islam',   email:'touhid@student.com', phone:'01711000006', classLevel:'class-8',     joinDate:'2026-07-05', status:'inactive', password:'demo123', role:'student', notifications:[], examResults:[] },
];

const SEED_MATERIALS = [
  { id:'m1', title:"Newton's Laws — Chapter Notes",      classLevel:'class-11-12', subject:'Physics',   type:'pdf',     url:null, fileName:'newton_laws.pdf',       description:'Complete notes on all three Newton\'s laws with examples.',    createdAt:'2026-07-10T10:00:00Z', views:42 },
  { id:'m2', title:'Calculus Integration — Lecture Video', classLevel:'class-11-12', subject:'Math',    type:'youtube', url:'https://www.youtube.com/embed/HfACrKJ_Y2w', fileName:null, description:'Full lecture on integration techniques for HSC.', createdAt:'2026-07-09T14:00:00Z', views:78 },
  { id:'m3', title:'SSC Chemistry — Periodic Table Guide', classLevel:'class-9-10',  subject:'Chemistry',type:'pdf',    url:null, fileName:'periodic_table.pdf',    description:'Visual guide to the periodic table for SSC students.',        createdAt:'2026-07-08T09:00:00Z', views:55 },
  { id:'m4', title:'Class 8 — Bangladesh History Notes',   classLevel:'class-8',     subject:'History',  type:'pdf',    url:null, fileName:'bd_history.pdf',         description:'Full notes from Chapter 1-4 of Bangladesh history.',          createdAt:'2026-07-07T11:00:00Z', views:30 },
  { id:'m5', title:'SSC English — Essay Writing Guide',    classLevel:'class-9-10',  subject:'English',  type:'pdf',    url:null, fileName:'essay_guide.pdf',        description:'Structure and technique for SSC essay writing.',              createdAt:'2026-07-06T15:00:00Z', views:91 },
  { id:'m6', title:'HSC Biology — Cell Division Video',    classLevel:'class-11-12', subject:'Biology',  type:'youtube',url:'https://www.youtube.com/embed/Q2fPxTavoc0', fileName:null, description:'Mitosis and meiosis explained with animations.', createdAt:'2026-07-05T13:00:00Z', views:64 },
];

const SEED_ASSESSMENTS = [
  {
    id:'a1', title:'HSC Physics — Mid-Term MCQ', classLevel:'class-11-12', subject:'Physics',
    type:'mcq', totalMarks:50, timeLimit:30, createdAt:'2026-07-11T09:00:00Z', status:'published',
    questions:[
      { id:'q1', text:'What is the unit of force?',           options:['Joule','Newton','Watt','Pascal'],                   correct:1 },
      { id:'q2', text:'Which law states F = ma?',             options:['First Law','Second Law','Third Law','Gravitation'],  correct:1 },
      { id:'q3', text:'Speed of light in vacuum (approx)?',  options:['3×10⁶ m/s','3×10⁸ m/s','3×10¹⁰ m/s','3×10⁴ m/s'], correct:1 },
      { id:'q4', text:'Which quantity is a vector?',          options:['Mass','Temperature','Velocity','Speed'],             correct:2 },
      { id:'q5', text:'SI unit of pressure?',                 options:['Newton','Pascal','Joule','Bar'],                    correct:1 },
    ], submissions:[]
  },
  {
    id:'a2', title:'SSC Math — Algebra CQ Test', classLevel:'class-9-10', subject:'Math',
    type:'cq', totalMarks:20, timeLimit:40, createdAt:'2026-07-10T10:00:00Z', status:'published',
    questions:[
      { id:'q1', text:'A train travels 360 km in 4 hours.', subParts:[
        { part:'a', text:'What is the speed of the train?',                                                                        marks:2 },
        { part:'b', text:'How long will it take to travel 540 km at the same speed?',                                             marks:4 },
        { part:'c', text:'If the speed increases by 20%, what is the new time for 540 km?',                                       marks:6 },
        { part:'d', text:'Explain how relative speed affects passengers on a parallel train moving at 40 km/h in the same direction.', marks:8 },
      ]},
    ], submissions:[]
  },
  {
    id:'a3', title:'Class 8 — Science Exam PDF', classLevel:'class-8', subject:'Science',
    type:'pdf_exam', totalMarks:100, timeLimit:120, createdAt:'2026-07-09T08:00:00Z', status:'published',
    pdfUrl:null, fileName:'class8_science_exam.pdf', submissions:[]
  },
];

// ── Helpers ─────────────────────────────────────────────────────
const genId   = () => Math.random().toString(36).slice(2, 9);
const nowStr  = () => new Date().toISOString();
const makeNotif = (title, body, type = 'info') => ({ id: genId(), title, body, type, time: nowStr(), read: false });

// ── Provider ─────────────────────────────────────────────────────
export function DataProvider({ children }) {
  const load = (key, seed) => {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? seed; } catch { return seed; }
  };

  const [students,    setStudents]    = useState(() => load('nx_students',    SEED_STUDENTS));
  const [materials,   setMaterials]   = useState(() => load('nx_materials',   SEED_MATERIALS));
  const [assessments, setAssessments] = useState(() => load('nx_assessments', SEED_ASSESSMENTS));

  useEffect(() => { localStorage.setItem('nx_students',    JSON.stringify(students));    }, [students]);
  useEffect(() => { localStorage.setItem('nx_materials',   JSON.stringify(materials));   }, [materials]);
  useEffect(() => { localStorage.setItem('nx_assessments', JSON.stringify(assessments)); }, [assessments]);

  // ── Notif helpers ─────────────────────────────────────────────
  const pushNotifToClass = useCallback((classLevel, notif) => {
    setStudents(prev => prev.map(s =>
      s.classLevel === classLevel ? { ...s, notifications: [notif, ...(s.notifications || [])] } : s
    ));
  }, []);

  // ── Student actions ───────────────────────────────────────────
  const registerStudent = useCallback((data) => {
    const exists = students.find(s => s.email === data.email);
    if (exists) throw new Error('Email already registered');
    const student = {
      id: genId(), ...data, role: 'student',
      joinDate: nowStr().slice(0, 10), status: 'active',
      notifications: [makeNotif('Welcome to Nexus! 🎉', `You are now enrolled in ${getClassInfo(data.classLevel).label}. Your teacher will post materials soon.`, 'welcome')],
      examResults: [],
    };
    setStudents(prev => [...prev, student]);
    return student;
  }, [students]);

  const updateStudentClass  = useCallback((id, cls)  => setStudents(p => p.map(s => s.id === id ? { ...s, classLevel: cls }                          : s)), []);
  const updateStudentProfile = useCallback((id, updates) => setStudents(p => p.map(s => s.id === id ? { ...s, ...updates } : s)), []);
  const toggleStudentStatus = useCallback((id)       => setStudents(p => p.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s)), []);
  const getStudentByEmail   = useCallback((email)    => students.find(s => s.email === email) ?? null, [students]);

  // ── Notif actions ─────────────────────────────────────────────
  const markNotifRead    = useCallback((sid, nid) => setStudents(p => p.map(s => s.id === sid ? { ...s, notifications: s.notifications.map(n => n.id === nid ? { ...n, read: true } : n) } : s)), []);
  const markAllRead      = useCallback((sid)      => setStudents(p => p.map(s => s.id === sid ? { ...s, notifications: s.notifications.map(n => ({ ...n, read: true }))               } : s)), []);

  // ── Material actions ──────────────────────────────────────────
  const uploadMaterial = useCallback((data) => {
    const mat = { id: genId(), ...data, createdAt: nowStr(), views: 0 };
    setMaterials(prev => [mat, ...prev]);
    pushNotifToClass(data.classLevel, makeNotif(
      `📚 New ${data.type === 'youtube' ? 'Video' : 'PDF'} — ${data.title}`,
      `New ${data.subject} material posted for ${getClassInfo(data.classLevel).label}.`,
      'material'
    ));
    return mat;
  }, [pushNotifToClass]);

  const deleteMaterial = useCallback((id) => setMaterials(p => p.filter(m => m.id !== id)), []);

  // ── Assessment actions ────────────────────────────────────────
  const createAssessment = useCallback((data) => {
    const exam = { id: genId(), ...data, createdAt: nowStr(), status: 'published', submissions: [] };
    setAssessments(prev => [exam, ...prev]);
    const typeLabel = data.type === 'mcq' ? 'MCQ Quiz' : data.type === 'cq' ? 'CQ Exam' : 'Exam PDF';
    pushNotifToClass(data.classLevel, makeNotif(
      `📝 New ${typeLabel} — ${data.title}`,
      `Exam published for ${getClassInfo(data.classLevel).label}. ${data.timeLimit} min | ${data.totalMarks} marks.`,
      'exam'
    ));
    return exam;
  }, [pushNotifToClass]);

  const submitExam = useCallback((aId, sId, answers, score) => {
    setAssessments(p => p.map(a => a.id === aId ? { ...a, submissions: [...(a.submissions || []), { id: genId(), studentId: sId, answers, score, submittedAt: nowStr() }] } : a));
    setStudents(p    => p.map(s => s.id === sId ? { ...s, examResults: [...(s.examResults || []), { assessmentId: aId, score, submittedAt: nowStr() }]                   } : s));
  }, []);

  const deleteAssessment = useCallback((id) => setAssessments(p => p.filter(a => a.id !== id)), []);

  const resetPassword = useCallback((email, newPassword) => {
    // 1. Try to find student
    const studentIdx = students.findIndex(s => s.email === email);
    if (studentIdx !== -1) {
      setStudents(prev => prev.map((s, idx) => idx === studentIdx ? { ...s, password: newPassword } : s));
      return true;
    }
    // 2. Try demo teacher
    if (email === 'teacher@nexus.com') {
      localStorage.setItem('demo_teacher_password', newPassword);
      return true;
    }
    throw new Error('Email address not registered');
  }, [students]);

  const enrollCourse = useCallback((email, course) => {
    setStudents(prev => prev.map(s => {
      if (s.email === email) {
        const enrolled = s.enrolledCourses || [];
        if (!enrolled.includes(course)) {
          return { ...s, enrolledCourses: [...enrolled, course] };
        }
      }
      return s;
    }));
  }, []);

  const unenrollCourse = useCallback((email, course) => {
    setStudents(prev => prev.map(s => {
      if (s.email === email) {
        const enrolled = s.enrolledCourses || [];
        return { ...s, enrolledCourses: enrolled.filter(c => c !== course) };
      }
      return s;
    }));
  }, []);

  return (
    <DataContext.Provider value={{
      students, materials, assessments,
      registerStudent, updateStudentClass, updateStudentProfile, toggleStudentStatus, getStudentByEmail,
      enrollCourse, unenrollCourse,
      markNotifRead, markAllRead,
      uploadMaterial, deleteMaterial,
      createAssessment, submitExam, deleteAssessment,
      resetPassword,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside <DataProvider>');
  return ctx;
}
