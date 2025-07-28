const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3002'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'AGI Learning Platform Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Mock data endpoints
app.get('/api/users', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]
  });
});

app.get('/api/lessons', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { id: 1, title: 'Introduction to AI', description: 'Learn the basics of artificial intelligence' },
      { id: 2, title: 'Machine Learning Fundamentals', description: 'Understanding ML algorithms' }
    ]
  });
});

app.get('/api/progress', (req, res) => {
  res.json({
    status: 'success',
    data: {
      completedLessons: 5,
      totalLessons: 20,
      currentStreak: 3
    }
  });
});

app.get('/api/analytics', (req, res) => {
  res.json({
    status: 'success',
    data: {
      totalUsers: 150,
      activeUsers: 45,
      lessonsCompleted: 1200
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AGI Learning Platform Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend should be running on: http://localhost:3002`);
});

module.exports = app; 