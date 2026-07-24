// src/api/client.js — Axios instance with JWT interceptors
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');
        const { data } = await axios.post(`${BASE_URL}/auth/token/refresh/`, { refresh });
        localStorage.setItem('access_token', data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return client(original);
      } catch {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth API ──────────────────────────────────────────────────
export const authAPI = {
  login:                (data) => client.post('/auth/login/', data),
  register:             (data) => client.post('/auth/register/', data),
  logout:               (data) => client.post('/auth/logout/', data),
  getProfile:           ()     => client.get('/auth/profile/'),
  updateProfile:        (data) => client.patch('/auth/profile/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  changePassword:       (data) => client.post('/auth/change-password/', data),
  requestPasswordReset: (data) => client.post('/auth/password-reset/', data),
  confirmPasswordReset: (data) => client.post('/auth/password-reset/confirm/', data),
  verifyEmail:          (data) => client.post('/auth/verify-email/', data),
  getStudentStats:      ()     => client.get('/auth/student/stats/'),
  getTeacherStats:      ()     => client.get('/auth/teacher/stats/'),
};

// ── Courses API ───────────────────────────────────────────────
export const coursesAPI = {
  list:             (params) => client.get('/courses/', { params }),
  get:              (id)     => client.get(`/courses/${id}/`),
  create:           (data)   => client.post('/courses/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:           (id, d)  => client.patch(`/courses/${id}/`, d, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete:           (id)     => client.delete(`/courses/${id}/`),
  enroll:           (id)     => client.post(`/courses/${id}/enroll/`),
  myEnrollments:    (p)      => client.get('/courses/my-enrollments/', { params: p }),
  teacherCourses:   (p)      => client.get('/courses/my-courses/', { params: p }),
  getLessons:       (id)     => client.get(`/courses/${id}/lessons/`),
  createLesson:     (id, d)  => client.post(`/courses/${id}/lessons/`, d),
  updateLesson:     (cid, lid, d) => client.patch(`/courses/${cid}/lessons/${lid}/`, d),
  markLessonDone:   (cid, lid) => client.post(`/courses/${cid}/lessons/${lid}/complete/`),
  addReview:        (id, d)  => client.post(`/courses/${id}/reviews/`, d),
};

// ── Live Sessions API ─────────────────────────────────────────
export const sessionsAPI = {
  list:     (p) => client.get('/sessions/', { params: p }),
  get:      (id) => client.get(`/sessions/${id}/`),
  create:   (d)  => client.post('/sessions/', d),
  update:   (id, d) => client.patch(`/sessions/${id}/`, d),
  delete:   (id) => client.delete(`/sessions/${id}/`),
  join:     (id) => client.post(`/sessions/${id}/join/`),
  upcoming: ()   => client.get('/sessions/upcoming/'),
};

// ── Quiz API ──────────────────────────────────────────────────
export const quizAPI = {
  list:          (p)   => client.get('/quiz/', { params: p }),
  get:           (id)  => client.get(`/quiz/${id}/`),
  create:        (d)   => client.post('/quiz/', d),
  submit:        (id, d) => client.post(`/quiz/${id}/submit/`, d),
  myAttempts:    ()    => client.get('/quiz/my-attempts/'),
  teacherQuizzes:(p)   => client.get('/quiz/teacher/', { params: p }),
};

export default client;
