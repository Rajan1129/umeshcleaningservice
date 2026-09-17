import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let servicesFallback = [];
try {
  const jsonPath = path.join(__dirname, '../src/data/services.json');
  if (fs.existsSync(jsonPath)) {
    servicesFallback = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }
} catch {
  servicesFallback = [];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      return res.status(200).json({ success: true, data: servicesFallback });
    }

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      return res.status(200).json({
        success: true,
        message: 'Service updated',
        data: { _id: 'service-' + Date.now(), ...(req.body || {}) }
      });
    }

    if (req.method === 'DELETE') {
      return res.status(200).json({ success: true, message: 'Service removed' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err) {
    console.error('Services API error:', err);
    return res.status(200).json({ success: true, data: servicesFallback });
  }
}
