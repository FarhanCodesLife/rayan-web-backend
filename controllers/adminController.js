import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate tokens
const generateTokens = (admin) => {
  const accessToken = jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

// Register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin exists' });

    const admin = await Admin.create({ name, email, password });
    res.status(201).json({ admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) { next(err); }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(admin);

    // Set HttpOnly refresh cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false in dev
      path: '/', // important!
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) { next(err); }
};

// Refresh access token
const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// Logout
const logout = (req, res) => {
  res.clearCookie('refreshToken', { path: '/' });
  res.json({ message: 'Logged out successfully' });
};

// Get logged-in admin info
const getMe = async (req, res) => {
  try {
    const adminId = req.admin?.id; // from auth middleware
    if (!adminId) return res.status(401).json({ message: 'Unauthorized' });

    const admin = await Admin.findById(adminId).select('-password'); // exclude password
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { register, login, refreshToken, logout , getMe };
