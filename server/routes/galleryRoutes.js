import { Router } from 'express';
import { body } from 'express-validator';
import {
  listGallery, createGalleryImage, updateGalleryImage, deleteGalleryImage
} from '../controllers/galleryController.js';
import { protect } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', optionalAuth, listGallery);
router.post(
  '/',
  protect,
  upload.single('image'),
  [body('title').trim().notEmpty().withMessage('Add a title'), body('category').trim().notEmpty().withMessage('Choose a category')],
  validate,
  createGalleryImage
);
router.put('/:id', protect, upload.single('image'), updateGalleryImage);
router.delete('/:id', protect, deleteGalleryImage);

export default router;
