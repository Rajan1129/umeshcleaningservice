import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const identifier = (email || '').trim().toLowerCase();
  const altIdentifier = identifier.includes('@') && !identifier.includes('.') ? `${identifier}.com` : identifier;

  const admin = await Admin.findOne({
    $or: [
      { email: identifier },
      { email: altIdentifier }
    ]
  }).select('+password');

  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Username/Email or password is incorrect');
  }

  admin.lastLoginAt = new Date();
  await admin.save({ validateBeforeSave: false });

  res.json({
    success: true,
    data: {
      token: signToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email }
    }
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: { id: req.admin._id, name: req.admin.name, email: req.admin.email }
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.comparePassword(currentPassword))) throw new ApiError(401, 'Current password is incorrect');

  admin.password = newPassword;
  await admin.save();
  res.json({ success: true, message: 'Password updated' });
});
