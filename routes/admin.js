import express from 'express';
import { body } from 'express-validator';
import adminController from '../controllers/adminController.js';
import validate from '../middleware/validate.js';
import authMiddleware from '../middleware/authMiddleware.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], validate, adminController.register);

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], validate, adminController.login);

// Refresh token
router.post('/refresh-token', adminController.refreshToken);

// Logout
router.post('/logout', auth, adminController.logout);

export default router;
