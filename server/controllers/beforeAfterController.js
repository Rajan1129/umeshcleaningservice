import BeforeAfter from '../models/BeforeAfter.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { fileUrl } from '../middleware/upload.js';

// GET /api/before-after?category=
export const listComparisons = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { isPublished: true };
  if (req.query.category && req.query.category !== 'all') filter.category = req.query.category;
  const items = await BeforeAfter.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: items });
});

// POST /api/before-after (admin) — expects fields `beforeImage` and `afterImage`
export const createComparison = asyncHandler(async (req, res) => {
  const before = req.files?.beforeImage?.[0];
  const after = req.files?.afterImage?.[0];
  if (!before || !after) throw new ApiError(400, 'Upload both a before image and an after image');

  const item = await BeforeAfter.create({
    ...req.body,
    beforeImage: fileUrl(req, before),
    afterImage: fileUrl(req, after)
  });
  res.status(201).json({ success: true, data: item });
});

// PUT /api/before-after/:id (admin)
export const updateComparison = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (req.files?.beforeImage?.[0]) payload.beforeImage = fileUrl(req, req.files.beforeImage[0]);
  if (req.files?.afterImage?.[0]) payload.afterImage = fileUrl(req, req.files.afterImage[0]);

  const item = await BeforeAfter.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Comparison not found');
  res.json({ success: true, data: item });
});

// PATCH /api/before-after/:id/publish (admin)
export const togglePublish = asyncHandler(async (req, res) => {
  const item = await BeforeAfter.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Comparison not found');
  item.isPublished = !item.isPublished;
  await item.save();
  res.json({ success: true, data: item });
});

// DELETE /api/before-after/:id (admin)
export const deleteComparison = asyncHandler(async (req, res) => {
  const item = await BeforeAfter.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Comparison not found');
  res.json({ success: true, message: 'Comparison deleted' });
});
