const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/user
// @desc    Get user analytics
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    // Mock analytics data - will be replaced with database queries
    const analytics = {
      userId: req.user._id,
      studyTime: {
        daily: [2, 3, 1, 4, 2, 5, 3],
        weekly: [15, 18, 12, 20, 16, 22, 19],
        monthly: [65, 72, 58, 80, 70, 85, 75]
      },
      progress: {
        lessonsCompleted: req.user.stats.lessonsCompleted,
        completionRate: 75,
        averageScore: 85
      },
      performance: {
        level: req.user.stats.level,
        xp: req.user.stats.xp,
        streak: req.user.stats.streak
      }
    };

    res.json({
      status: 'success',
      data: {
        analytics
      }
    });
  } catch (error) {
    console.error('Get user analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/analytics/global
// @desc    Get global analytics (admin only)
// @access  Private (Admin)
router.get('/global', protect, authorize('admin'), async (req, res) => {
  try {
    // Mock global analytics data - will be replaced with database queries
    const analytics = {
      totalUsers: 1250,
      activeUsers: 890,
      totalLessonsCompleted: 15600,
      averageCompletionRate: 78,
      popularCategories: [
        { name: 'AI Engineer', completions: 4200 },
        { name: 'Data Analyst', completions: 3800 },
        { name: 'AI Data Scientist', completions: 3200 },
        { name: 'AI Red Teaming', completions: 2800 },
        { name: 'AI Agents', completions: 1600 }
      ]
    };

    res.json({
      status: 'success',
      data: {
        analytics
      }
    });
  } catch (error) {
    console.error('Get global analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router; 