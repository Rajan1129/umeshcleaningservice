import mongoose from 'mongoose';
import slugify from 'slugify';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    icon: { type: String, default: 'Sparkles' },
    shortDescription: { type: String, required: true, trim: true },
    intro: { type: String, default: '' },
    image: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
    includes: [{ type: String, trim: true }],
    suitableFor: [{ type: String, trim: true }],
    benefits: [{ type: String, trim: true }],
    process: [{ step: String, detail: String }],
    faqs: [{ question: String, answer: String }],
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

serviceSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export default mongoose.model('Service', serviceSchema);
