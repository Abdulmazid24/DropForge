const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const ADMIN_PHONE = '01711111111'; // From seed-admin.js
const ADMIN_PASS = '123456';

const runLiveTest = async () => {
    console.log('🚀 Starting DropForge Live System Test...');
    const timestamp = Date.now();
    const testUser = {
        name: `Test User ${timestamp}`,
        phone: `019${timestamp.toString().slice(-8)}`, // Unique phone
        password: 'password123'
    };

    try {
        // 1. Registration
        console.log('\n1️⃣  Testing Registration...');
        await axios.post(`${API_URL}/users`, testUser);
        console.log('✅ Registration Successful');

        // 2. Login (Customer)
        console.log('\n2️⃣  Testing Login (Customer)...');
        const loginRes = await axios.post(`${API_URL}/users/login`, {
            phone: testUser.phone,
            password: testUser.password
        });
        const token = loginRes.data.token;
        console.log('✅ Login Successful. Token received.');

        // 3. Update Profile
        console.log('\n3️⃣  Testing Profile Update...');
        const updatedName = `${testUser.name} Updated`;
        const profileRes = await axios.put(`${API_URL}/users/profile`, {
            name: updatedName
        }, { headers: { Authorization: `Bearer ${token}` } });

        if (profileRes.data.name === updatedName) {
            console.log('✅ Profile Update Verified');
        } else {
            console.error('❌ Profile Update Failed');
        }

        // 4. Fetch Products
        console.log('\n4️⃣  Testing Product Fetching...');
        const productsRes = await axios.get(`${API_URL}/products`); // Public or Private? Backend code might be protected or public.
        // If public route exists:
        const products = productsRes.data;
        if (products.length > 0) {
            console.log(`✅ Fetched ${products.length} products.`);
        } else {
            console.warn('⚠️  No products found. Run supplier sync first.');
        }

        // 5. Create Order
        if (products.length > 0) {
            console.log('\n5️⃣  Testing Order Creation...');
            const product = products[0];
            const orderPayload = {
                orderItems: [{ product: product._id, qty: 2 }],
                shippingAddress: {
                    name: updatedName,
                    phone: testUser.phone,
                    address: '123 Test St',
                    city: 'Dhaka'
                },
                paymentMethod: 'COD'
            };
            const orderRes = await axios.post(`${API_URL}/orders`, orderPayload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(`✅ Order Created! ID: ${orderRes.data.localOrderId}`);
        }

        // 6. Admin Verification
        console.log('\n6️⃣  Testing Admin Access...');
        const adminLoginRes = await axios.post(`${API_URL}/users/login`, {
            phone: ADMIN_PHONE,
            password: ADMIN_PASS
        });
        const adminToken = adminLoginRes.data.token;
        console.log('✅ Admin Login Successful');

        // 6a. Get All Orders
        const allOrdersRes = await axios.get(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log(`✅ Admin fetched ${allOrdersRes.data.length} total orders.`);

        // 6b. Get All Users
        const allUsersRes = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        const foundUser = allUsersRes.data.find(u => u.phone === testUser.phone);
        if (foundUser) {
            console.log('✅ Admin verified new user existence.');
        } else {
            console.error('❌ New user not found in Admin list.');
        }

        console.log('\n🎉 ALL SYSTEMS GO! Live Test Completed Successfully.');

    } catch (error) {
        console.error('\n❌ Test Failed:', error.response ? error.response.data : error.message);
    }
};

runLiveTest();
