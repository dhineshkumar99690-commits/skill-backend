const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Base route
app.get('/', (req, res) => {
  res.json({
    message: '✅ SkillDK API is running!',
    routes: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET  /api/auth/profile',
      'PUT  /api/auth/profile',
      'GET  /api/jobs',
      'POST /api/jobs/:id/apply',
      'GET  /api/jobs/my/applications',
      'GET  /api/courses',
      'GET  /api/courses/recommend',
      'POST /api/skills/analyze',
      'GET  /api/skills/gap',
      'GET  /api/quizzes',
      'POST /api/quizzes/:id/submit',
      'POST /api/chat'
    ]
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
  });
}

startServer();
