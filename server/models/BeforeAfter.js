import mongoose from 'mongoose';
import { BEFORE_AFTER_CATEGORIES } from '../config/constants.js';

const beforeAfterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: BEFORE_AFTER_CATEGORIES, required: true, index: true },
    beforeImage: { type: String, required: true },
    afterImage: { type: String, required: true },
    description: { type: String, default: '', trim: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model('BeforeAfter', beforeAfterSchema);
