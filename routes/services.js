import express from 'express';
import { body } from 'express-validator';
import controller from '../controllers/serviceController.js';
import validate from '../middleware/validate.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:slug', controller.getOne);
router.post('/', auth, [
  body('title').notEmpty(),
  body('description').isLength({ min: 20 })
], validate, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

export default router;
