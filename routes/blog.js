import express from 'express';
import { body } from 'express-validator';
import controller from '../controllers/blogController.js';
import validate from '../middleware/validate.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:slug', controller.getOne);
router.post('/', auth, [
  body('title').notEmpty(),
  body('content').isLength({ min: 50 })
], validate, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

export default router;