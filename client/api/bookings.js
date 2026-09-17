import { connectDB, Booking } from './db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    // Support /api/bookings?action=stats
    if (req.query?.action === 'stats') {
      const grouped = await Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
      const stats = { total: 0, new: 0, contacted: 0, scheduled: 0, completed: 0, cancelled: 0 };
      grouped.forEach(({ _id, count }) => {
        if (stats[_id] !== undefined) stats[_id] = count;
        stats.total += count;
      });
      return res.status(200).json({ success: true, data: stats });
    }

    if (req.method === 'POST') {
      const { name, phone, whatsapp, service, preferredDate, preferredTime, address, message } = req.body || {};

      if (!name || !phone || !service || !address) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, phone number, service, and address.'
        });
      }

      const booking = await Booking.create({
        name: name.trim(),
        phone: phone.trim(),
        whatsapp: (whatsapp || '').trim(),
        service: service.trim(),
        preferredDate: preferredDate ? new Date(preferredDate) : undefined,
        preferredTime: (preferredTime || '').trim(),
        address: address.trim(),
        message: (message || '').trim()
      });

      return res.status(201).json({
        success: true,
        message: 'Request received. Umesh Cleaning Services will call you back shortly.',
        data: { id: booking._id }
      });
    }

    if (req.method === 'GET') {
      const { status, search, limit = 50, page = 1 } = req.query || {};
      const filter = {};

      if (status && status !== 'all') {
        filter.status = status;
      }

      if (search && search.trim()) {
        const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const rx = new RegExp(escaped, 'i');
        filter.$or = [{ name: rx }, { phone: rx }, { address: rx }, { service: rx }];
      }

      const limitNum = Math.min(Math.max(Number(limit) || 50, 1), 100);
      const skipNum = (Math.max(Number(page) || 1, 1) - 1) * limitNum;

      const items = await Booking.find(filter).sort({ createdAt: -1 }).skip(skipNum).limit(limitNum);
      return res.status(200).json({ success: true, data: items });
    }

    if (req.method === 'PATCH' && req.query?.id) {
      const booking = await Booking.findByIdAndUpdate(req.query.id, req.body, { new: true });
      if (!booking) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.status(200).json({ success: true, data: booking });
    }

    if (req.method === 'DELETE' && req.query?.id) {
      const booking = await Booking.findByIdAndDelete(req.query.id);
      if (!booking) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.status(200).json({ success: true, message: 'Enquiry deleted' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err) {
    console.error('Bookings API error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to process booking. Please try again or message on WhatsApp.'
    });
  }
}
