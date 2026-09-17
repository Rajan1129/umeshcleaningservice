import { Router } from 'express';
import { body } from 'express-validator';
import {
  listComparisons, createComparison, updateComparison, togglePublish, deleteComparison
} from '../controllers/beforeAfterController.js';
import { protect } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';

const router = Router();
const images = upload.fields([{ name: 'beforeImage', maxCount: 1 }, { name: 'afterImage', maxCount: 1 }]);

router.get('/', optionalAuth, listComparisons);
router.post(
  '/',
  protect,
  images,
  [body('title').trim().notEmpty().withMessage('Add a title'), body('category').trim().notEmpty().withMessage('Choose a category')],
  validate,
  createComparison
);
router.put('/:id', protect, images, updateComparison);
router.patch('/:id/publish', protect, togglePublish);
router.delete('/:id', protect, deleteComparison);

export default router;
