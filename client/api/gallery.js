export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: [] });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Photo uploaded',
      data: { _id: 'gallery-' + Date.now() }
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({ success: true, message: 'Photo deleted' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
