#!/usr/bin/env node

/**
 * Database Health Check Script
 * Verifies database connectivity and basic operations
 */

const { Sequelize } = require('sequelize');
const path = require('path');

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

async function checkDatabaseHealth() {
  const results = {
    timestamp: new Date().toISOString(),
    status: 'unknown',
    checks: {},
    errors: []
  };

  try {
    console.log('🔍 Starting database health check...');
    
    // Test 1: Database Connection
    console.log('1. Testing database connection...');
    await sequelize.authenticate();
    results.checks.connection = { status: 'passed', message: 'Database connection successful' };
    console.log('✅ Database connection successful');

    // Test 2: Basic Query
    console.log('2. Testing basic query...');
    const [queryResults] = await sequelize.query('SELECT 1 as test');
    if (queryResults && queryResults[0] && queryResults[0].test === 1) {
      results.checks.basicQuery = { status: 'passed', message: 'Basic query executed successfully' };
      console.log('✅ Basic query successful');
    } else {
      throw new Error('Basic query returned unexpected result');
    }

    // Test 3: Database Info
    console.log('3. Retrieving database information...');
    const databaseVersion = await sequelize.getDatabaseVersion();
    results.checks.databaseInfo = { 
      status: 'passed', 
      message: `Database version: ${databaseVersion}`,
      version: databaseVersion 
    };
    console.log(`✅ Database version: ${databaseVersion}`);

    // Test 4: Table Existence (if tables exist)
    console.log('4. Checking table structure...');
    try {
      const tables = await sequelize.getQueryInterface().showAllTables();
      results.checks.tablesExist = { 
        status: 'passed', 
        message: `Found ${tables.length} tables`,
        tableCount: tables.length,
        tables: tables
      };
      console.log(`✅ Found ${tables.length} tables: ${tables.join(', ')}`);
    } catch (error) {
      results.checks.tablesExist = { 
        status: 'warning', 
        message: 'No tables found or unable to check tables (this might be expected for a fresh database)',
        error: error.message
      };
      console.log('⚠️  No tables found (this might be expected for a fresh database)');
    }

    // Test 5: Write Operation (if tables exist)
    console.log('5. Testing write operations...');
    try {
      // Try to create a simple test table
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS health_check_test (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          test_value TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      // Insert test data
      await sequelize.query(`
        INSERT INTO health_check_test (test_value) VALUES ('health_check_${Date.now()}')
      `);
      
      // Read test data
      const [testResults] = await sequelize.query('SELECT COUNT(*) as count FROM health_check_test');
      
      // Cleanup test table
      await sequelize.query('DROP TABLE health_check_test');
      
      results.checks.writeOperation = { 
        status: 'passed', 
        message: 'Write operations working correctly',
        testRecords: testResults[0].count
      };
      console.log('✅ Write operations successful');
    } catch (error) {
      results.checks.writeOperation = { 
        status: 'failed', 
        message: 'Write operation failed',
        error: error.message
      };
      console.log('❌ Write operation failed:', error.message);
    }

    // Test 6: Performance Check
    console.log('6. Testing database performance...');
    const startTime = Date.now();
    for (let i = 0; i < 10; i++) {
      await sequelize.query('SELECT 1');
    }
    const endTime = Date.now();
    const avgResponseTime = (endTime - startTime) / 10;
    
    results.checks.performance = { 
      status: avgResponseTime < 100 ? 'passed' : avgResponseTime < 500 ? 'warning' : 'failed',
      message: `Average query response time: ${avgResponseTime}ms`,
      avgResponseTime: avgResponseTime
    };
    
    if (avgResponseTime < 100) {
      console.log(`✅ Performance good: ${avgResponseTime}ms average response time`);
    } else if (avgResponseTime < 500) {
      console.log(`⚠️  Performance acceptable: ${avgResponseTime}ms average response time`);
    } else {
      console.log(`❌ Performance poor: ${avgResponseTime}ms average response time`);
    }

    // Overall Status
    const failedChecks = Object.values(results.checks).filter(check => check.status === 'failed');
    const warningChecks = Object.values(results.checks).filter(check => check.status === 'warning');
    
    if (failedChecks.length === 0) {
      results.status = warningChecks.length === 0 ? 'healthy' : 'degraded';
    } else {
      results.status = 'unhealthy';
    }

    console.log('\n📋 Health Check Summary:');
    console.log(`Status: ${results.status.toUpperCase()}`);
    console.log(`Passed: ${Object.values(results.checks).filter(c => c.status === 'passed').length}`);
    console.log(`Warnings: ${warningChecks.length}`);
    console.log(`Failed: ${failedChecks.length}`);

    return results;

  } catch (error) {
    console.error('❌ Database health check failed:', error.message);
    results.status = 'unhealthy';
    results.errors.push(error.message);
    results.checks.connection = { status: 'failed', message: error.message };
    return results;
  } finally {
    await sequelize.close();
  }
}

// Main execution
if (require.main === module) {
  checkDatabaseHealth()
    .then(results => {
      console.log('\n🏥 Database Health Check Complete');
      
      // Output JSON for programmatic use
      if (process.argv.includes('--json')) {
        console.log('\n--- JSON OUTPUT ---');
        console.log(JSON.stringify(results, null, 2));
      }
      
      // Exit with appropriate code
      if (results.status === 'healthy') {
        process.exit(0);
      } else if (results.status === 'degraded') {
        process.exit(1);
      } else {
        process.exit(2);
      }
    })
    .catch(error => {
      console.error('💥 Unexpected error during health check:', error);
      process.exit(3);
    });
}

module.exports = { checkDatabaseHealth }; 