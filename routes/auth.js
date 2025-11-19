import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController.js';
import validate from '../middleware/validate.js'
const router = express.Router();


router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], validate, authController.login);

export default router;