const { Sequelize } = require('sequelize');
const path = require('path');

// Create SQLite database instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true
  }
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite Database Connected Successfully');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to SQLite database:', error);
    return false;
  }
};

// Sync database (create tables)
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Database synchronized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase
}; 