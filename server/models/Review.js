import mongoose from 'mongoose';

/**
 * Reviews are entered manually by the business owner from the admin panel,
 * using real review text from their Google Business Profile.
 * Nothing here is generated automatically.
 */
const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
    source: { type: String, enum: ['google', 'direct'], default: 'google' },
    reviewedAt: { type: Date },
    isPublished: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
