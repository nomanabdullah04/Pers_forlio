// src/App.jsx — Full routing with AuthProvider + DataProvider
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import PortalLayout from './components/layout/PortalLayout';

// Auth Pages
import StudentLogin   from './pages/auth/StudentLogin';
import TeacherLogin   from './pages/auth/TeacherLogin';
import StudentRegister from './pages/student/StudentRegister';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import MyCourses        from './pages/student/MyCourses';
import Materials        from './pages/student/Materials';
import Exams            from './pages/student/Exams';
import Notifications    from './pages/student/Notifications';
import StudentSessions  from './pages/student/Sessions';
import StudentAiTutor   from './pages/student/AiTutor';
import StudentAchievements from './pages/student/Achievements';
import StudentNotes     from './pages/student/Notes';
import StudentSettings  from './pages/student/Settings';

// Teacher Pages
import TeacherDashboard  from './pages/teacher/Dashboard';
import StudentRegistry   from './pages/teacher/StudentRegistry';
import UploadMaterial    from './pages/teacher/UploadMaterial';
import CreateExam        from './pages/teacher/CreateExam';
import ExamList          from './pages/teacher/ExamList';
import TeacherSessions   from './pages/teacher/Sessions';
import TeacherAnalytics  from './pages/teacher/Analytics';
import TeacherSchedule   from './pages/teacher/Schedule';
import TeacherMessages   from './pages/teacher/Messages';
import TeacherSettings   from './pages/teacher/Settings';

// ── Protected Route ───────────────────────────────────────────────
function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#0a192f', color:'#64ffda', fontSize:'1rem' }}>
      Loading…
    </div>
  );
  if (!user) return <Navigate to={role === 'teacher' ? '/teacher/login' : '/student/login'} replace />;
  if (user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />;
  return children;
}

// ── Landing redirect ──────────────────────────────────────────────
function Landing() {
  const { user } = useAuth();
  if (user) return <Navigate to={`/${user.role}/dashboard`} replace />;
  return <Navigate to="/student/login" replace />;
}

export default function App() {
  return (
    <HashRouter>
      <DataProvider>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background:'#112240', color:'#e6f1ff', border:'1px solid rgba(100,255,218,0.15)', borderRadius:'12px' },
              success: { iconTheme: { primary:'#64ffda', secondary:'#0a192f' } },
              error:   { iconTheme: { primary:'#ef4444', secondary:'#0a192f' } },
            }}
          />
          <Routes>
            {/* Landing */}
            <Route path="/" element={<Landing />} />

            {/* Public auth */}
            <Route path="/student/login"    element={<StudentLogin />}   />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route path="/teacher/login"    element={<TeacherLogin />}   />

            {/* Student Portal */}
            <Route path="/student" element={
              <ProtectedRoute role="student">
                <PortalLayout />
              </ProtectedRoute>
            }>
              <Route index          element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard"     element={<StudentDashboard />} />
              <Route path="courses"       element={<MyCourses />} />
              <Route path="materials"     element={<Materials />} />
              <Route path="exams"         element={<Exams />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="sessions"      element={<StudentSessions />} />
              <Route path="ai-tutor"      element={<StudentAiTutor />} />
              <Route path="achievements"  element={<StudentAchievements />} />
              <Route path="notes"         element={<StudentNotes />} />
              <Route path="settings"      element={<StudentSettings />} />
            </Route>

            {/* Teacher Portal */}
            <Route path="/teacher" element={
              <ProtectedRoute role="teacher">
                <PortalLayout />
              </ProtectedRoute>
            }>
              <Route index          element={<Navigate to="/teacher/dashboard" replace />} />
              <Route path="dashboard"       element={<TeacherDashboard />} />
              <Route path="students"        element={<StudentRegistry />} />
              <Route path="upload-material" element={<UploadMaterial />} />
              <Route path="create-exam"     element={<CreateExam />} />
              <Route path="exams"           element={<ExamList />} />
              <Route path="sessions"        element={<TeacherSessions />} />
              <Route path="analytics"       element={<TeacherAnalytics />} />
              <Route path="schedule"        element={<TeacherSchedule />} />
              <Route path="messages"        element={<TeacherMessages />} />
              <Route path="settings"        element={<TeacherSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </DataProvider>
    </HashRouter>
  );
}

