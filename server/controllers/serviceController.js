import slugify from 'slugify';
import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { fileUrl } from '../middleware/upload.js';

const parseArray = (value) => {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value;
  try { return JSON.parse(value); } catch { return String(value).split('\n').map((v) => v.trim()).filter(Boolean); }
};

// GET /api/services (public: active only)
export const listServices = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { isActive: true };
  const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, data: services });
});

// GET /api/services/:slug (public)
export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service || (!service.isActive && !req.admin)) throw new ApiError(404, 'Service not found');
  res.json({ success: true, data: service });
});

// POST /api/services (admin)
export const createService = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    includes: parseArray(req.body.includes),
    suitableFor: parseArray(req.body.suitableFor),
    benefits: parseArray(req.body.benefits),
    process: parseArray(req.body.process),
    faqs: parseArray(req.body.faqs),
    slug: req.body.slug ? slugify(req.body.slug, { lower: true, strict: true }) : undefined
  };
  if (req.file) payload.image = fileUrl(req, req.file);

  const service = await Service.create(payload);
  res.status(201).json({ success: true, data: service });
});

// PUT /api/services/:id (admin)
export const updateService = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  ['includes', 'suitableFor', 'benefits', 'process', 'faqs'].forEach((key) => {
    const parsed = parseArray(req.body[key]);
    if (parsed !== undefined) payload[key] = parsed;
  });
  if (payload.slug) payload.slug = slugify(payload.slug, { lower: true, strict: true });
  if (req.file) payload.image = fileUrl(req, req.file);

  const service = await Service.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!service) throw new ApiError(404, 'Service not found');
  res.json({ success: true, data: service });
});

// PATCH /api/services/:id/toggle (admin)
export const toggleService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  service.isActive = !service.isActive;
  await service.save();
  res.json({ success: true, data: service });
});

// DELETE /api/services/:id (admin)
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  res.json({ success: true, message: 'Service deleted' });
});
