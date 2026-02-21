# Abishake A – Data Analyst Portfolio

Premium portfolio website with React, Tailwind CSS, Framer Motion, Three.js, and Node.js backend.

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
# Copy .env.example to .env and fill in your credentials
cp .env.example .env
node server.js
```

## 🌐 Deployment

- **Frontend**: Deploy `frontend/` folder to [Vercel](https://vercel.com)
- **Backend**: Deploy `backend/` folder to [Render](https://render.com)

## 📧 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `EMAIL_USER` | Gmail address for notifications |
| `EMAIL_PASS` | Gmail App Password (16-char) |
| `MONGODB_URI` | MongoDB Atlas connection string (optional) |
| `FRONTEND_URL` | Frontend URL for CORS |
| `PORT` | Server port (default: 5000) |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Backend API URL |

## 📁 Tech Stack
- React.js + Vite
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
- Node.js + Express
- Nodemailer
- jsPDF
