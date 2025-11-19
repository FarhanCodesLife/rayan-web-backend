import express from 'express';
import { body } from 'express-validator';
import controller from '../controllers/bookingController.js';
import validate from '../middleware/validate.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/', [
  body('name').notEmpty(),
  body('phone').notEmpty(),
  body('serviceType').notEmpty()
], validate, controller.create);

router.get('/', auth, controller.getAll);
router.put('/:id/status', auth, controller.updateStatus);

export default router;