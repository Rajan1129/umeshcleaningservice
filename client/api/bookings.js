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
      const items = await Booking.find().sort({ createdAt: -1 }).limit(50);
      return res.status(200).json({ success: true, data: items });
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
