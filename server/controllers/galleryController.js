import GalleryImage from '../models/Gallery.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { fileUrl } from '../middleware/upload.js';

// GET /api/gallery?category=
export const listGallery = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { isPublished: true };
  if (req.query.category && req.query.category !== 'all') filter.category = req.query.category;
  const images = await GalleryImage.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: images });
});

// POST /api/gallery (admin)
export const createGalleryImage = asyncHandler(async (req, res) => {
  if (!req.file && !req.body.image) throw new ApiError(400, 'Choose an image to upload');
  const image = await GalleryImage.create({
    ...req.body,
    image: req.file ? fileUrl(req, req.file) : req.body.image
  });
  res.status(201).json({ success: true, data: image });
});

// PUT /api/gallery/:id (admin)
export const updateGalleryImage = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (req.file) payload.image = fileUrl(req, req.file);
  const image = await GalleryImage.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!image) throw new ApiError(404, 'Image not found');
  res.json({ success: true, data: image });
});

// DELETE /api/gallery/:id (admin)
export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await GalleryImage.findByIdAndDelete(req.params.id);
  if (!image) throw new ApiError(404, 'Image not found');
  res.json({ success: true, message: 'Image deleted' });
});
