import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const exists = await Admin.findOne({ email: 'admin@khadijaandsiblings.com' });
    if (exists) {
      console.log('Admin already exists');
      process.exit(0);
    }
    const hashed = await bcrypt.hash('Admin123', 12);
    const admin = await Admin.create({ name: 'Hamza Badar', email: 'admin@khadijaandsiblings.com', password: hashed });
    console.log('Admin created:', admin.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();

