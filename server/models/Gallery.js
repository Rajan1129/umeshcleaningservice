import mongoose from 'mongoose';
import { GALLERY_CATEGORIES } from '../config/constants.js';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    alt: { type: String, default: '', trim: true },
    category: { type: String, enum: GALLERY_CATEGORIES, required: true, index: true },
    stage: { type: String, enum: ['none', 'before', 'after'], default: 'none' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('GalleryImage', gallerySchema);
