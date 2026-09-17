import { connectDB, Booking } from '../db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, subaction } = req.query || {};

  if (!id) {
    return res.status(400).json({ success: false, message: 'Enquiry ID is required' });
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      const booking = await Booking.findById(id);
      if (!booking) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.status(200).json({ success: true, data: booking });
    }

    if (req.method === 'POST') {
      // Handles note creation /api/bookings/:id/notes
      const { text } = req.body || {};
      if (!text) return res.status(400).json({ success: false, message: 'Note text required' });
      const booking = await Booking.findByIdAndUpdate(
        id,
        { $push: { notes: { text: text.trim() } } },
        { new: true }
      );
      if (!booking) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.status(200).json({ success: true, data: booking });
    }

    if (req.method === 'PATCH') {
      const updateData = {};
      if (req.body?.status) updateData.status = req.body.status;
      if (req.body?.name) updateData.name = req.body.name;
      if (req.body?.phone) updateData.phone = req.body.phone;
      if (req.body?.address) updateData.address = req.body.address;

      const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!booking) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.status(200).json({ success: true, data: booking });
    }

    if (req.method === 'DELETE') {
      const booking = await Booking.findByIdAndDelete(id);
      if (!booking) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.status(200).json({ success: true, message: 'Enquiry deleted' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err) {
    console.error('Booking detail API error:', err);
    return res.status(500).json({ success: false, message: 'Enquiry operation failed' });
  }
}
