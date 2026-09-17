import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Attaches req.admin when a valid token is present, but never blocks the request.
// Lets one controller serve both the public site and the admin panel.
export const optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return next();
    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);
  } catch {
    // ignore — request continues as a public visitor
  }
  return next();
};
