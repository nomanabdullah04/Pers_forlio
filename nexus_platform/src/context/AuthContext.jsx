// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api/client';

const AuthContext = createContext(null);

// Demo teacher account
const DEMO_TEACHER = {
  id: 't1', email: 'teacher@nexus.com', full_name: 'Dr. Kamal Hossain',
  role: 'teacher', avatar: null,
  subject: 'Physics', total_students: 342, total_courses: 8,
  rating: 4.9, is_verified: true,
};

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const stored = localStorage.getItem('nexus_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('nexus_user'); }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    // 1) Try real API
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem('access_token',  data.access);
      localStorage.setItem('refresh_token', data.refresh);
      const { data: profile } = await authAPI.getProfile();
      localStorage.setItem('nexus_user', JSON.stringify(profile));
      setUser(profile);
      return profile;
    } catch { /* fallthrough to demo */ }

    // 2) Demo teacher
    const demoPw = localStorage.getItem('demo_teacher_password') || 'demo123';
    if (email === DEMO_TEACHER.email && password === demoPw) {
      localStorage.setItem('nexus_user', JSON.stringify(DEMO_TEACHER));
      setUser(DEMO_TEACHER);
      return DEMO_TEACHER;
    }

    // 3) Check DataContext students (stored in localStorage)
    const studentsRaw = localStorage.getItem('nx_students');
    if (studentsRaw) {
      const students = JSON.parse(studentsRaw);
      const student = students.find(s => s.email === email);
      if (student && student.password === password) {
        const profile = { ...student, full_name: student.fullName };
        localStorage.setItem('nexus_user', JSON.stringify(profile));
        setUser(profile);
        return profile;
      }
    }

    throw new Error('Invalid email or password');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('nexus_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    // Navigate handled by caller
  }, []);

  const updateUser = useCallback((patch) => {
    setUser(prev => {
      const updated = { ...prev, ...patch };
      localStorage.setItem('nexus_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
