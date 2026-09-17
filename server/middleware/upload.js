import path from 'node:path';
import fs from 'node:fs';
import multer from 'multer';
import ApiError from '../utils/ApiError.js';

const UPLOAD_DIR = path.resolve('uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safe = file.originalname.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
    cb(null, `${Date.now()}-${safe}`);
  }
});

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) return cb(null, true);
    cb(new ApiError(400, 'Upload a JPG, PNG, WebP or AVIF image under 6 MB'));
  }
});

export const fileUrl = (req, file) => (file ? `/uploads/${file.filename}` : '');
