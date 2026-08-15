# Abdullah Al Noman - Portfolio & AI / Full-Stack Platform

[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Django](https://img.shields.io/badge/Backend-Django_REST-092E20?logo=django&logoColor=white)](https://www.djangoproject.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS_v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

A high-performance, futuristic portfolio showcasing AI/ML deep learning research, scalable full-stack applications, interactive cyber skill engines, and production MLOps pipelines.

---

## 🚀 Quick Deployment Guide

### Option 1: Deploy Frontend on Vercel (Recommended - 1 Click)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** > **"Project"** and import `nomanabdullah04/Pers_forlio`.
3. In the project configuration:
   - **Root Directory**: Select `frontend` (Click Edit and choose `frontend`).
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **"Deploy"**. Your site will be live in under 30 seconds!

---

### Option 2: Deploy Backend on Render / Railway (Free)

#### Deploying on Render:
1. Go to [render.com](https://render.com) and create a free account.
2. Click **"New +"** > **"Web Service"** and connect `nomanabdullah04/Pers_forlio`.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn nexus_portfolio.wsgi:application`
4. Click **"Create Web Service"**.

---

## 🛠️ Local Development

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs at: `http://localhost:3000`

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Runs at: `http://127.0.0.1:8000`

---

## 📬 Contact & Profiles
- **Email**: [abdullahcse.cou14@gmail.com](mailto:abdullahcse.cou14@gmail.com)
- **LinkedIn**: [linkedin.com/in/abdullah-al-noman-0540402a8](https://www.linkedin.com/in/abdullah-al-noman-0540402a8)
- **Instagram**: [instagram.com/nom_an041](https://www.instagram.com/nom_an041?igsh=YXE1eDlmajdpZWJj)
- **GitHub**: [github.com/nomanabdullah04](https://github.com/nomanabdullah04)
