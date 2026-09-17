import { Router } from 'express';
import { body, param } from 'express-validator';
import rateLimit from 'express-rate-limit';
import {
  createBooking, listBookings, bookingStats, getBooking, updateStatus, addNote, deleteBooking
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { BOOKING_STATUSES } from '../config/constants.js';

const router = Router();

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 12,
  message: { success: false, message: 'Too many requests from this device. Please call 07828900308 instead.' }
});

router.post(
  '/',
  formLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Enter your name'),
    body('phone').trim().matches(/^[+]?[0-9\s-]{10,15}$/).withMessage('Enter a valid phone number'),
    body('whatsapp').optional({ values: 'falsy' }).trim().matches(/^[+]?[0-9\s-]{10,15}$/).withMessage('Enter a valid WhatsApp number'),
    body('service').trim().notEmpty().withMessage('Choose the service you need'),
    body('address').trim().isLength({ min: 3, max: 300 }).withMessage('Enter your address or area'),
    body('preferredDate').optional({ values: 'falsy' }).isISO8601().withMessage('Choose a valid date'),
    body('message').optional({ values: 'falsy' }).trim().isLength({ max: 1000 })
  ],
  validate,
  createBooking
);

router.use(protect);
router.get('/', listBookings);
router.get('/stats', bookingStats);
router.get('/:id', param('id').isMongoId(), validate, getBooking);
router.patch('/:id/status', [param('id').isMongoId(), body('status').isIn(BOOKING_STATUSES)], validate, updateStatus);
router.post('/:id/notes', [param('id').isMongoId(), body('text').trim().notEmpty()], validate, addNote);
router.delete('/:id', param('id').isMongoId(), validate, deleteBooking);

export default router;
