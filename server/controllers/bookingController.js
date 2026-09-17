import Booking from '../models/Booking.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { BOOKING_STATUSES } from '../config/constants.js';

// POST /api/bookings  (public)
export const createBooking = asyncHandler(async (req, res) => {
  const { name, phone, whatsapp, service, preferredDate, preferredTime, address, message } = req.body;

  const booking = await Booking.create({
    name, phone, whatsapp, service, preferredDate: preferredDate || undefined,
    preferredTime, address, message
  });

  res.status(201).json({
    success: true,
    message: 'Request received. Umesh Cleaning Services will call you back shortly.',
    data: { id: booking._id }
  });
});

// GET /api/bookings  (admin)
export const listBookings = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status && status !== 'all') filter.status = status;
  if (search) {
    const rx = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [{ name: rx }, { phone: rx }, { address: rx }, { service: rx }];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Booking.countDocuments(filter)
  ]);

  res.json({ success: true, data: items, meta: { total, page: Number(page), limit: Number(limit) } });
});

// GET /api/bookings/stats  (admin)
export const bookingStats = asyncHandler(async (req, res) => {
  const grouped = await Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  const stats = BOOKING_STATUSES.reduce((acc, s) => ({ ...acc, [s]: 0 }), { total: 0 });
  grouped.forEach(({ _id, count }) => {
    stats[_id] = count;
    stats.total += count;
  });
  res.json({ success: true, data: stats });
});

// GET /api/bookings/:id  (admin)
export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Enquiry not found');
  res.json({ success: true, data: booking });
});

// PATCH /api/bookings/:id/status  (admin)
export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!booking) throw new ApiError(404, 'Enquiry not found');
  res.json({ success: true, data: booking });
});

// POST /api/bookings/:id/notes  (admin)
export const addNote = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { $push: { notes: { text: req.body.text } } },
    { new: true }
  );
  if (!booking) throw new ApiError(404, 'Enquiry not found');
  res.json({ success: true, data: booking });
});

// DELETE /api/bookings/:id  (admin)
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) throw new ApiError(404, 'Enquiry not found');
  res.json({ success: true, message: 'Enquiry deleted' });
});
