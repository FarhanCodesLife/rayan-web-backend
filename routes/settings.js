
import express from 'express';
import controller from '../controllers/settingsController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', controller.getSettings);
router.put('/', auth, controller.updateSettings);

export default router;
