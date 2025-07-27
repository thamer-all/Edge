const axios = require('axios');

async function testAdminAccess() {
  try {
    // Login as admin
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@example.com',
      password: 'AdminPass123'
    });

    const adminToken = loginResponse.data.data.token;
    console.log('Admin token:', adminToken);

    // Test admin access to users endpoint
    const usersResponse = await axios.get('http://localhost:5001/api/users', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    console.log('Admin access successful:', usersResponse.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAdminAccess(); 