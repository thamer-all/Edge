const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/progress
// @desc    Get user progress
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // Mock progress data - will be replaced with database query
    const progress = {
      userId: req.user._id,
      lessonsCompleted: req.user.stats.lessonsCompleted,
      totalStudyTime: req.user.stats.totalStudyTime,
      currentStreak: req.user.stats.streak,
      level: req.user.stats.level,
      xp: req.user.stats.xp
    };

    res.json({
      status: 'success',
      data: {
        progress
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/progress/update
// @desc    Update user progress
// @access  Private
router.post('/update', protect, async (req, res) => {
  try {
    const { lessonId, timeSpent, completed } = req.body;

    // Update user stats
    const updates = {};
    
    if (completed) {
      updates.lessonsCompleted = req.user.stats.lessonsCompleted + 1;
      updates.xp = req.user.stats.xp + 50; // 50 XP per completed lesson
    }

    if (timeSpent) {
      updates.totalStudyTime = req.user.stats.totalStudyTime + timeSpent;
    }

    await req.user.updateStats(updates);
    await req.user.calculateLevel();

    const userData = req.user.getPublicProfile();

    res.json({
      status: 'success',
      message: 'Progress updated successfully',
      data: {
        user: userData
      }
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router; 