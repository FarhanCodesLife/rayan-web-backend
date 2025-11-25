import express from 'express';
import controller from '../controllers/fleetController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', auth, controller.create);
router.get('/id/:id', controller.getById); // new route

router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

export default router;