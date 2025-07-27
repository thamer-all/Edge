const express = require('express');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/lessons
// @desc    Get all lessons
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    // For now, return mock data - will be replaced with database queries
    const lessons = [
      {
        id: 'ai-engineer-intro',
        title: 'Introduction to AI Engineering',
        description: 'Learn the fundamentals of AI engineering',
        category: 'AI Engineer',
        difficulty: 'beginner',
        duration: 30,
        topics: ['Machine Learning', 'Python', 'Mathematics']
      }
    ];

    res.json({
      status: 'success',
      data: {
        lessons
      }
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/lessons/:id
// @desc    Get lesson by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Mock lesson data - will be replaced with database query
    const lesson = {
      id,
      title: 'Introduction to AI Engineering',
      description: 'Learn the fundamentals of AI engineering',
      content: 'This is the lesson content...',
      category: 'AI Engineer',
      difficulty: 'beginner',
      duration: 30,
      topics: ['Machine Learning', 'Python', 'Mathematics']
    };

    res.json({
      status: 'success',
      data: {
        lesson
      }
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router; 