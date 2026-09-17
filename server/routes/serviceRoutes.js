import { Router } from 'express';
import { body } from 'express-validator';
import {
  listServices, getServiceBySlug, createService, updateService, toggleService, deleteService
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', optionalAuth, listServices);
router.get('/:slug', optionalAuth, getServiceBySlug);

router.post(
  '/',
  protect,
  upload.single('image'),
  [body('title').trim().notEmpty().withMessage('Service title is required'),
   body('shortDescription').trim().notEmpty().withMessage('Add a short description')],
  validate,
  createService
);
router.put('/:id', protect, upload.single('image'), updateService);
router.patch('/:id/toggle', protect, toggleService);
router.delete('/:id', protect, deleteService);

export default router;
