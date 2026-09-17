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
    await connectDB();
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Enter username and password' });
    }

    const identifier = email.trim().toLowerCase();
    const altIdentifier = identifier.includes('@') && !identifier.includes('.') ? `${identifier}.com` : identifier;

    // First check hardcoded credentials for instant fallback reliability
    const isMasterMatch =
      (identifier === 'umesh@cleaningservice' || identifier === 'umesh@cleaningservice.com') &&
      password === 'clean@umeshteam';

    let admin = await Admin.findOne({
      $or: [{ email: identifier }, { email: altIdentifier }]
    }).select('+password');

    let valid = false;
    if (admin) {
      valid = await admin.comparePassword(password);
    }

    if (!valid && !isMasterMatch) {
      return res.status(401).json({ success: false, message: 'Username/Email or password is incorrect' });
    }

    const adminId = admin ? admin._id : 'master-admin';
    const adminEmail = admin ? admin.email : 'umesh@cleaningservice';
    const adminName = admin ? admin.name : 'Umesh Cleaning Team';

    const token = jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: '7d' });

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
