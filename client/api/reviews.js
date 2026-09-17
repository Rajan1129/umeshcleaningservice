export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: [
        {
          _id: 'r1',
          author: 'Gurpreet Singh',
          rating: 5,
          text: 'Excellent sofa and carpet deep cleaning done by Umesh and his team in Model Town. Very polite and thorough work.',
          source: 'google',
          reviewedAt: '2025-01-15'
        },
        {
          _id: 'r2',
          author: 'Pooja Sharma',
          rating: 5,
          text: 'Booked kitchen and bathroom cleaning for Diwali. All grease and hard water stains were completely removed. 5 stars!',
          source: 'google',
          reviewedAt: '2025-02-10'
        }
      ]
    });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Review saved',
      data: { _id: 'review-' + Date.now(), ...(req.body || {}) }
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({ success: true, message: 'Review deleted' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
