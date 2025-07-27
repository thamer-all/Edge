#!/usr/bin/env node

/**
 * Database Migration Script
 * Handles database schema setup and updates
 */

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs').promises;

// Load environment variables
require('dotenv').config({
  path: path.join(__dirname, '../config.env')
});

// Database configuration
const config = {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || path.join(__dirname, '../database.sqlite'),
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// Create Sequelize instance
const sequelize = new Sequelize(config);

// Migration tracking table
const Migration = sequelize.define('Migration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  executedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'migrations',
  timestamps: false
});

// Define all models/tables
const defineModels = async () => {
  console.log('📋 Defining database models...');

  // Users table
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('student', 'instructor', 'admin'),
      defaultValue: 'student'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastLoginAt: {
      type: DataTypes.DATE
    },
    preferences: {
      type: DataTypes.JSON,
      defaultValue: {}
    }
  });

  // Lessons table
  const Lesson = sequelize.define('Lesson', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    content: {
      type: DataTypes.TEXT
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner'
    },
    duration: {
      type: DataTypes.INTEGER // in minutes
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  // User Progress table
  const UserProgress = sequelize.define('UserProgress', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Lesson,
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
      defaultValue: 'not_started'
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    timeSpent: {
      type: DataTypes.INTEGER,
      defaultValue: 0 // in seconds
    },
    lastAccessedAt: {
      type: DataTypes.DATE
    },
    completedAt: {
      type: DataTypes.DATE
    },
    score: {
      type: DataTypes.FLOAT
    }
  });

  // Quizzes table
  const Quiz = sequelize.define('Quiz', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Lesson,
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: false
    },
    timeLimit: {
      type: DataTypes.INTEGER // in seconds
    },
    passingScore: {
      type: DataTypes.FLOAT,
      defaultValue: 70
    },
    maxAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  // Quiz Attempts table
  const QuizAttempt = sequelize.define('QuizAttempt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quiz,
        key: 'id'
      }
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    timeSpent: {
      type: DataTypes.INTEGER // in seconds
    },
    isPassed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Analytics table
  const Analytics = sequelize.define('Analytics', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventData: {
      type: DataTypes.JSON
    },
    sessionId: {
      type: DataTypes.STRING
    },
    userAgent: {
      type: DataTypes.STRING
    },
    ipAddress: {
      type: DataTypes.STRING
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  // Define associations
  User.hasMany(UserProgress, { foreignKey: 'userId' });
  UserProgress.belongsTo(User, { foreignKey: 'userId' });

  Lesson.hasMany(UserProgress, { foreignKey: 'lessonId' });
  UserProgress.belongsTo(Lesson, { foreignKey: 'lessonId' });

  Lesson.hasMany(Quiz, { foreignKey: 'lessonId' });
  Quiz.belongsTo(Lesson, { foreignKey: 'lessonId' });

  User.hasMany(QuizAttempt, { foreignKey: 'userId' });
  QuizAttempt.belongsTo(User, { foreignKey: 'userId' });

  Quiz.hasMany(QuizAttempt, { foreignKey: 'quizId' });
  QuizAttempt.belongsTo(Quiz, { foreignKey: 'quizId' });

  User.hasMany(Analytics, { foreignKey: 'userId' });
  Analytics.belongsTo(User, { foreignKey: 'userId' });

  return {
    User,
    Lesson,
    UserProgress,
    Quiz,
    QuizAttempt,
    Analytics
  };
};

// Migration functions
const migrations = [
  {
    name: '001_initial_schema',
    up: async () => {
      console.log('📊 Running migration: 001_initial_schema');
      await defineModels();
      await sequelize.sync({ force: false });
      console.log('✅ Initial schema created');
    }
  },
  {
    name: '002_add_indexes',
    up: async () => {
      console.log('📊 Running migration: 002_add_indexes');
      const queryInterface = sequelize.getQueryInterface();
      
      // Add indexes for performance
      await queryInterface.addIndex('Users', ['email']);
      await queryInterface.addIndex('Lessons', ['category', 'isPublished']);
      await queryInterface.addIndex('UserProgresses', ['userId', 'lessonId']);
      await queryInterface.addIndex('QuizAttempts', ['userId', 'quizId']);
      await queryInterface.addIndex('Analytics', ['userId', 'eventType', 'timestamp']);
      
      console.log('✅ Indexes added');
    }
  },
  {
    name: '003_seed_demo_data',
    up: async () => {
      console.log('📊 Running migration: 003_seed_demo_data');
      const models = await defineModels();
      
      // Check if demo data already exists
      const userCount = await models.User.count();
      if (userCount > 0) {
        console.log('⏭️  Demo data already exists, skipping seed');
        return;
      }
      
      // Create demo admin user
      await models.User.create({
        email: 'admin@agi-platform.com',
        password: '$2b$12$example.hash.for.demo.password', // Should be properly hashed
        name: 'Demo Admin',
        role: 'admin',
        isVerified: true
      });
      
      // Create demo lessons
      const lessons = [
        {
          title: 'Introduction to AI',
          slug: 'intro-to-ai',
          description: 'Basic concepts of Artificial Intelligence',
          content: 'This lesson covers the fundamentals of AI...',
          category: 'fundamentals',
          difficulty: 'beginner',
          duration: 30,
          isPublished: true,
          order: 1
        },
        {
          title: 'Machine Learning Basics',
          slug: 'ml-basics',
          description: 'Understanding machine learning principles',
          content: 'Machine learning is a subset of AI...',
          category: 'machine-learning',
          difficulty: 'beginner',
          duration: 45,
          isPublished: true,
          order: 2
        }
      ];
      
      for (const lesson of lessons) {
        await models.Lesson.create(lesson);
      }
      
      console.log('✅ Demo data seeded');
    }
  }
];

// Main migration function
async function runMigrations() {
  try {
    console.log('🚀 Starting database migrations...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    // Create migrations table if it doesn't exist
    await Migration.sync();
    console.log('✅ Migration tracking table ready');
    
    // Get executed migrations
    const executedMigrations = await Migration.findAll({
      attributes: ['name'],
      raw: true
    });
    const executedNames = executedMigrations.map(m => m.name);
    
    // Run pending migrations
    let migrationsRun = 0;
    for (const migration of migrations) {
      if (!executedNames.includes(migration.name)) {
        console.log(`🔄 Running migration: ${migration.name}`);
        
        try {
          await migration.up();
          await Migration.create({ name: migration.name });
          migrationsRun++;
          console.log(`✅ Migration completed: ${migration.name}`);
        } catch (error) {
          console.error(`❌ Migration failed: ${migration.name}`, error.message);
          throw error;
        }
      } else {
        console.log(`⏭️  Migration already executed: ${migration.name}`);
      }
    }
    
    console.log(`\n🎉 Migration complete! ${migrationsRun} new migrations executed.`);
    return true;
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// CLI execution
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('✅ All migrations completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Migration process failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations, migrations }; 