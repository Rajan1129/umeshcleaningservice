import { Router } from 'express';
import { body } from 'express-validator';
import { listReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', optionalAuth, listReviews);
router.post(
  '/',
  protect,
  [body('author').trim().notEmpty().withMessage('Add the reviewer name'),
   body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
   body('text').trim().notEmpty().withMessage('Add the review text')],
  validate,
  createReview
);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
