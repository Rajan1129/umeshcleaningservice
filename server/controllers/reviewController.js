import Review from '../models/Review.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Reviews are only ever added by the business owner from the admin panel,
 * copied from the real Google Business Profile. No public write endpoint exists.
 */
export const listReviews = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { isPublished: true };
  const reviews = await Review.find(filter).sort({ reviewedAt: -1, createdAt: -1 });
  res.json({ success: true, data: reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({ success: true, data: review });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!review) throw new ApiError(404, 'Review not found');
  res.json({ success: true, data: review });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw new ApiError(404, 'Review not found');
  res.json({ success: true, message: 'Review deleted' });
});
