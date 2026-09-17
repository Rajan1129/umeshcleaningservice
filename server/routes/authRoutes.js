import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { login, me, changePassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many sign-in attempts. Try again in 15 minutes.' }
});

router.post(
  '/login',
  loginLimiter,
  [body('email').notEmpty().withMessage('Enter your username or email'), body('password').notEmpty().withMessage('Enter your password')],
  validate,
  login
);

router.get('/me', protect, me);

router.patch(
  '/password',
  protect,
  [body('currentPassword').notEmpty(), body('newPassword').isLength({ min: 8 }).withMessage('New password needs at least 8 characters')],
  validate,
  changePassword
);

export default router;
