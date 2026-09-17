import { Router } from 'express';
import authRoutes from './authRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import galleryRoutes from './galleryRoutes.js';
import beforeAfterRoutes from './beforeAfterRoutes.js';
import reviewRoutes from './reviewRoutes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ success: true, status: 'ok', time: new Date().toISOString() }));
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/services', serviceRoutes);
router.use('/gallery', galleryRoutes);
router.use('/before-after', beforeAfterRoutes);
router.use('/reviews', reviewRoutes);

export default router;
