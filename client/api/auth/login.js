import jwt from 'jsonwebtoken';
import { connectDB, Admin } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'umeshcleaningservice03';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Enter username and password' });
    }

    await connectDB();

    const identifier = email.trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const admin = await Admin.findOne({
      $or: [
        { email: identifier },
        { email: `${identifier}@cleaningservice` },
        { email: `${identifier}@cleaningservice.com` }
      ]
    }).select('+password');

    let valid = false;
    if (admin) {
      valid = await admin.comparePassword(cleanPass);
    }

    // Safety fallback for master credentials
    if (!valid && (identifier === 'umesh@cleaningservice' || identifier === 'umesh') && cleanPass === 'clean@umeshteam') {
      valid = true;
    }

    if (!valid) {
      return res.status(401).json({ success: false, message: 'Username or password is incorrect' });
    }

    const adminId = admin ? admin._id : 'master-admin';
    const adminEmail = admin ? admin.email : 'umesh@cleaningservice';
    const adminName = admin ? admin.name : 'Umesh Cleaning Team';

    const token = jwt.sign({ id: adminId, email: adminEmail }, JWT_SECRET, { expiresIn: '30d' });

    return res.status(200).json({
      success: true,
      data: {
        token,
        admin: { id: adminId, name: adminName, email: adminEmail }
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Sign-in service error' });
  }
}
