const { sequelize } = require('./config/database-sqlite');
const User = require('./models/User-sqlite');

async function updateAdminRole() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Update admin user role
    const adminUser = await User.findOne({
      where: { email: 'admin@example.com' }
    });

    if (adminUser) {
      adminUser.role = 'admin';
      await adminUser.save();
      console.log('Admin role updated successfully for:', adminUser.email);
    } else {
      console.log('Admin user not found');
    }

    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

updateAdminRole(); 