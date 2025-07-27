import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// XP requirements for each level
const XP_REQUIREMENTS = [
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950,
  6750, 7600, 8500, 9450, 10450, 11500, 12600, 13750, 14950, 16200, 17500, 18850, 20250,
  21700, 23200, 24750, 26350, 28000, 29700, 31450, 33250, 35100, 37000, 38950, 40950,
  43000, 45100, 47250, 49450, 51700, 54000, 56350, 58750, 61200, 63700, 66250, 68850,
  71500, 74200, 76950, 79750, 82600, 85500, 88450, 91450, 94500, 97600, 100750, 103950,
  107200, 110500, 113850, 117250, 120700, 124200, 127750, 131350, 135000, 138700, 142450,
  146250, 150100, 154000, 157950, 161950, 166000, 170100, 174250, 178450, 182700, 187000,
  191350, 195750, 200200, 204700, 209250, 213850, 218500, 223200, 227950, 232750, 237600,
  242500, 247450, 252450, 257500
];

// Achievement definitions
const ACHIEVEMENTS = [
  // Learning Achievements
  { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🚀', xp: 50, type: 'learning' },
  { id: 'lesson-streak-3', name: 'Getting Started', description: 'Complete lessons 3 days in a row', icon: '🔥', xp: 100, type: 'streak' },
  { id: 'lesson-streak-7', name: 'Week Warrior', description: 'Complete lessons 7 days in a row', icon: '⚡', xp: 250, type: 'streak' },
  { id: 'lesson-streak-30', name: 'Monthly Master', description: 'Complete lessons 30 days in a row', icon: '💎', xp: 1000, type: 'streak' },
  { id: 'lessons-5', name: 'Scholar', description: 'Complete 5 lessons', icon: '📚', xp: 150, type: 'learning' },
  { id: 'lessons-25', name: 'Dedicated Learner', description: 'Complete 25 lessons', icon: '🎓', xp: 500, type: 'learning' },
  { id: 'lessons-50', name: 'Knowledge Seeker', description: 'Complete 50 lessons', icon: '🔍', xp: 1000, type: 'learning' },
  { id: 'lessons-100', name: 'Lesson Master', description: 'Complete 100 lessons', icon: '👑', xp: 2500, type: 'learning' },
  
  // Note Taking Achievements
  { id: 'first-note', name: 'Note Taker', description: 'Write your first lesson note', icon: '📝', xp: 25, type: 'notes' },
  { id: 'notes-10', name: 'Diligent Student', description: 'Write 10 lesson notes', icon: '✍️', xp: 100, type: 'notes' },
  { id: 'notes-50', name: 'Prolific Writer', description: 'Write 50 lesson notes', icon: '📖', xp: 500, type: 'notes' },
  { id: 'note-master', name: 'Note Master', description: 'Write 1000+ characters in notes', icon: '📄', xp: 200, type: 'notes' },
  
  // Summary Achievements
  { id: 'first-summary', name: 'Summarizer', description: 'Write your first section summary', icon: '📋', xp: 50, type: 'summaries' },
  { id: 'summaries-10', name: 'Summary Expert', description: 'Write 10 section summaries', icon: '📊', xp: 200, type: 'summaries' },
  { id: 'summaries-25', name: 'Synthesis Master', description: 'Write 25 section summaries', icon: '🧠', xp: 500, type: 'summaries' },
  
  // Quiz Achievements
  { id: 'first-quiz', name: 'Quiz Taker', description: 'Complete your first quiz', icon: '🎯', xp: 50, type: 'quiz' },
  { id: 'quiz-perfect', name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💯', xp: 100, type: 'quiz' },
  { id: 'quiz-streak-5', name: 'Quiz Champion', description: 'Get 5 perfect scores in a row', icon: '🏆', xp: 300, type: 'quiz' },
  
  // Study Time Achievements
  { id: 'study-1h', name: 'Focused Hour', description: 'Study for 1 hour in a single session', icon: '⏰', xp: 100, type: 'time' },
  { id: 'study-marathon', name: 'Study Marathon', description: 'Study for 3 hours in a single day', icon: '🏃', xp: 300, type: 'time' },
  { id: 'study-total-10h', name: 'Dedicated Student', description: 'Study for 10 total hours', icon: '📚', xp: 250, type: 'time' },
  { id: 'study-total-50h', name: 'Study Expert', description: 'Study for 50 total hours', icon: '🎓', xp: 750, type: 'time' },
  
  // Category Achievements
  { id: 'category-math', name: 'Math Wizard', description: 'Complete all Math Foundations lessons', icon: '🔢', xp: 500, type: 'category' },
  { id: 'category-programming', name: 'Code Master', description: 'Complete all Programming lessons', icon: '💻', xp: 500, type: 'category' },
  { id: 'category-ml', name: 'ML Expert', description: 'Complete all Machine Learning lessons', icon: '🤖', xp: 750, type: 'category' },
  
  // Special Achievements
  { id: 'early-bird', name: 'Early Bird', description: 'Study before 8 AM', icon: '🌅', xp: 50, type: 'special' },
  { id: 'night-owl', name: 'Night Owl', description: 'Study after 10 PM', icon: '🦉', xp: 50, type: 'special' },
  { id: 'weekend-warrior', name: 'Weekend Warrior', description: 'Study on both Saturday and Sunday', icon: '💪', xp: 100, type: 'special' },
  { id: 'level-10', name: 'Rising Star', description: 'Reach level 10', icon: '⭐', xp: 500, type: 'level' },
  { id: 'level-25', name: 'Expert Learner', description: 'Reach level 25', icon: '🌟', xp: 1000, type: 'level' },
  { id: 'level-50', name: 'Learning Legend', description: 'Reach level 50', icon: '✨', xp: 2500, type: 'level' }
];

// Daily challenges
const DAILY_CHALLENGES = [
  { id: 'complete-lesson', name: 'Complete a Lesson', description: 'Finish any lesson today', xp: 50, type: 'lesson' },
  { id: 'write-notes', name: 'Take Notes', description: 'Write notes for any lesson', xp: 25, type: 'notes' },
  { id: 'write-summary', name: 'Summarize', description: 'Write a section summary', xp: 40, type: 'summary' },
  { id: 'study-30min', name: 'Study Session', description: 'Study for at least 30 minutes', xp: 30, type: 'time' },
  { id: 'perfect-quiz', name: 'Ace a Quiz', description: 'Get 100% on any quiz', xp: 75, type: 'quiz' }
];

export const GamificationProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    xp: 0,
    level: 1,
    lessonsCompleted: 0,
    notesWritten: 0,
    summariesWritten: 0,
    quizzesTaken: 0,
    perfectQuizzes: 0,
    studyTimeTotal: 0, // in minutes
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [challengeProgress, setChallengeProgress] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('gamification_stats');
    const savedAchievements = localStorage.getItem('gamification_achievements');
    const savedChallenges = localStorage.getItem('gamification_daily_challenges');
    const savedProgress = localStorage.getItem('gamification_challenge_progress');

    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
    if (savedAchievements) {
      setUnlockedAchievements(JSON.parse(savedAchievements));
    }
    if (savedChallenges) {
      const challenges = JSON.parse(savedChallenges);
      const today = new Date().toDateString();
      if (challenges.date === today) {
        setDailyChallenges(challenges.challenges);
      } else {
        generateDailyChallenges();
      }
    } else {
      generateDailyChallenges();
    }
    if (savedProgress) {
      setChallengeProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('gamification_stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('gamification_achievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  useEffect(() => {
    localStorage.setItem('gamification_challenge_progress', JSON.stringify(challengeProgress));
  }, [challengeProgress]);

  const generateDailyChallenges = () => {
    const today = new Date().toDateString();
    const shuffled = [...DAILY_CHALLENGES].sort(() => 0.5 - Math.random());
    const selectedChallenges = shuffled.slice(0, 3); // 3 daily challenges
    
    setDailyChallenges(selectedChallenges);
    setChallengeProgress({});
    
    localStorage.setItem('gamification_daily_challenges', JSON.stringify({
      date: today,
      challenges: selectedChallenges
    }));
  };

  const calculateLevel = (xp) => {
    for (let i = XP_REQUIREMENTS.length - 1; i >= 0; i--) {
      if (xp >= XP_REQUIREMENTS[i]) {
        return i + 1;
      }
    }
    return 1;
  };

  const getXpForNextLevel = (currentLevel) => {
    if (currentLevel >= XP_REQUIREMENTS.length) {
      return XP_REQUIREMENTS[XP_REQUIREMENTS.length - 1];
    }
    return XP_REQUIREMENTS[currentLevel];
  };

  const addXP = (amount, source = 'general') => {
    setUserStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const leveledUp = newLevel > prev.level;

      // Check for level achievements
      if (leveledUp) {
        checkLevelAchievements(newLevel);
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });

    // Show XP notification (could be implemented with a toast system)
    console.log(`+${amount} XP from ${source}`);
  };

  const checkLevelAchievements = (level) => {
    const levelAchievements = ACHIEVEMENTS.filter(a => 
      a.type === 'level' && 
      ((a.id === 'level-10' && level >= 10) ||
       (a.id === 'level-25' && level >= 25) ||
       (a.id === 'level-50' && level >= 50))
    );

    levelAchievements.forEach(achievement => {
      if (!unlockedAchievements.find(a => a.id === achievement.id)) {
        unlockAchievement(achievement);
      }
    });
  };

  const unlockAchievement = (achievement) => {
    setUnlockedAchievements(prev => [...prev, { ...achievement, unlockedAt: new Date().toISOString() }]);
    addXP(achievement.xp, 'achievement');
    // Show achievement notification
    console.log(`🏆 Achievement Unlocked: ${achievement.name}!`);
  };

  const checkAchievements = (action, data = {}) => {
    ACHIEVEMENTS.forEach(achievement => {
      if (unlockedAchievements.find(a => a.id === achievement.id)) return;

      let shouldUnlock = false;

      switch (achievement.id) {
        case 'first-lesson':
          shouldUnlock = action === 'complete_lesson' && userStats.lessonsCompleted === 0;
          break;
        case 'first-note':
          shouldUnlock = action === 'write_note' && userStats.notesWritten === 0;
          break;
        case 'first-summary':
          shouldUnlock = action === 'write_summary' && userStats.summariesWritten === 0;
          break;
        case 'first-quiz':
          shouldUnlock = action === 'complete_quiz' && userStats.quizzesTaken === 0;
          break;
        case 'lessons-5':
          shouldUnlock = action === 'complete_lesson' && userStats.lessonsCompleted + 1 >= 5;
          break;
        case 'lessons-25':
          shouldUnlock = action === 'complete_lesson' && userStats.lessonsCompleted + 1 >= 25;
          break;
        case 'lessons-50':
          shouldUnlock = action === 'complete_lesson' && userStats.lessonsCompleted + 1 >= 50;
          break;
        case 'lessons-100':
          shouldUnlock = action === 'complete_lesson' && userStats.lessonsCompleted + 1 >= 100;
          break;
        case 'notes-10':
          shouldUnlock = action === 'write_note' && userStats.notesWritten + 1 >= 10;
          break;
        case 'notes-50':
          shouldUnlock = action === 'write_note' && userStats.notesWritten + 1 >= 50;
          break;
        case 'summaries-10':
          shouldUnlock = action === 'write_summary' && userStats.summariesWritten + 1 >= 10;
          break;
        case 'summaries-25':
          shouldUnlock = action === 'write_summary' && userStats.summariesWritten + 1 >= 25;
          break;
        case 'quiz-perfect':
          shouldUnlock = action === 'perfect_quiz';
          break;
        case 'quiz-streak-5':
          shouldUnlock = action === 'perfect_quiz' && (data.perfectStreak || 0) >= 5;
          break;
        case 'lesson-streak-3':
          shouldUnlock = action === 'update_streak' && data.streak >= 3;
          break;
        case 'lesson-streak-7':
          shouldUnlock = action === 'update_streak' && data.streak >= 7;
          break;
        case 'lesson-streak-30':
          shouldUnlock = action === 'update_streak' && data.streak >= 30;
          break;
        // Add more achievement checks as needed
      }

      if (shouldUnlock) {
        unlockAchievement(achievement);
      }
    });
  };

  const updateDailyChallenge = (challengeId, progress = 1) => {
    setChallengeProgress(prev => ({
      ...prev,
      [challengeId]: (prev[challengeId] || 0) + progress
    }));

    // Check if challenge is completed
    const challenge = dailyChallenges.find(c => c.id === challengeId);
    if (challenge && (challengeProgress[challengeId] || 0) + progress >= 1) {
      addXP(challenge.xp, 'daily_challenge');
      console.log(`Daily Challenge Completed: ${challenge.name}!`);
    }
  };

  const recordAction = (action, data = {}) => {
    checkAchievements(action, data);

    switch (action) {
      case 'complete_lesson':
        setUserStats(prev => ({ ...prev, lessonsCompleted: prev.lessonsCompleted + 1 }));
        addXP(50, 'lesson_completion');
        updateDailyChallenge('complete-lesson');
        break;
      
      case 'write_note':
        setUserStats(prev => ({ ...prev, notesWritten: prev.notesWritten + 1 }));
        addXP(10, 'note_writing');
        updateDailyChallenge('write-notes');
        break;
      
      case 'write_summary':
        setUserStats(prev => ({ ...prev, summariesWritten: prev.summariesWritten + 1 }));
        addXP(25, 'summary_writing');
        updateDailyChallenge('write-summary');
        break;
      
      case 'complete_quiz':
        setUserStats(prev => ({ ...prev, quizzesTaken: prev.quizzesTaken + 1 }));
        addXP(20, 'quiz_completion');
        break;
      
      case 'perfect_quiz':
        setUserStats(prev => ({ ...prev, perfectQuizzes: prev.perfectQuizzes + 1 }));
        addXP(50, 'perfect_quiz');
        updateDailyChallenge('perfect-quiz');
        break;
      
                   case 'study_time': {
               const minutes = data.minutes || 1;
        setUserStats(prev => ({ ...prev, studyTimeTotal: prev.studyTimeTotal + minutes }));
        if (minutes >= 30) {
          updateDailyChallenge('study-30min');
        }
                       // Award XP for study time (1 XP per 5 minutes)
               addXP(Math.floor(minutes / 5), 'study_time');
               break;
             }
      
      case 'update_streak':
        setUserStats(prev => ({
          ...prev,
          currentStreak: data.streak,
          longestStreak: Math.max(prev.longestStreak, data.streak),
          lastStudyDate: data.date
        }));
        break;
    }
  };

  const resetDailyChallenges = () => {
    generateDailyChallenges();
  };

  const resetAllProgress = () => {
    const resetStats = {
      xp: 0,
      level: 1,
      lessonsCompleted: 0,
      notesWritten: 0,
      summariesWritten: 0,
      quizzesTaken: 0,
      perfectQuizzes: 0,
      studyTimeTotal: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null
    };
    
    setUserStats(resetStats);
    setUnlockedAchievements([]);
    setChallengeProgress({});
    generateDailyChallenges();
    
    // Clear localStorage
    localStorage.removeItem('user_stats');
    localStorage.removeItem('unlocked_achievements');
    localStorage.removeItem('challenge_progress');
    localStorage.removeItem('daily_challenges');
    
    // Clear all lesson progress
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('notes_') || key.startsWith('summaries_') || key.startsWith('progress_')) {
        localStorage.removeItem(key);
      }
    });
    
    console.log('All progress has been reset!');
  };

  const value = {
    userStats,
    unlockedAchievements,
    dailyChallenges,
    challengeProgress,
    achievements: ACHIEVEMENTS,
    xpRequirements: XP_REQUIREMENTS,
    addXP,
    recordAction,
    calculateLevel,
    getXpForNextLevel,
    resetDailyChallenges,
    resetAllProgress,
    unlockAchievement
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}; 