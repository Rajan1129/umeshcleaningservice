import { connectDB, Booking } from '../db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const defaultStats = { total: 0, new: 0, contacted: 0, scheduled: 0, completed: 0, cancelled: 0 };

  try {
    await connectDB();
    const grouped = await Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
    const stats = { ...defaultStats };
    grouped.forEach(({ _id, count }) => {
      if (stats[_id] !== undefined) stats[_id] = count;
      stats.total += count;
    });
    return res.status(200).json({ success: true, data: stats });
  } catch (err) {
    console.error('Stats API error:', err);
    return res.status(200).json({ success: true, data: defaultStats });
  }
}
