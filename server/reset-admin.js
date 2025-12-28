require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const adminPhone = '01711111111';
        await User.findOneAndDelete({ phone: adminPhone });
        console.log('Old admin deleted');

        // Note: hashing is handled by User model pre-save hook
        // We pass 'passwordHash' as '123456' which triggers the hook to hash it
        await User.create({
            name: 'Super Admin',
            phone: adminPhone,
            passwordHash: '123456',
            role: 'super_admin'
        });
        console.log('New admin created successfully');
        process.exit();
    } catch (error) {
        console.error('Reset Admin Error:', error);
        process.exit(1);
    }
};

resetAdmin();
