import mongoose from 'mongoose';
import { BOOKING_STATUSES } from '../config/constants.js';

const noteSchema = new mongoose.Schema(
  { text: { type: String, required: true, trim: true }, createdAt: { type: Date, default: Date.now } },
  { _id: true }
);

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true, default: '' },
    service: { type: String, required: true, trim: true },
    preferredDate: { type: Date },
    preferredTime: { type: String, trim: true, default: '' },
    address: { type: String, required: true, trim: true },
    message: { type: String, trim: true, default: '' },
    source: { type: String, default: 'website' },
    status: { type: String, enum: BOOKING_STATUSES, default: 'new', index: true },
    notes: [noteSchema]
  },
  { timestamps: true }
);

bookingSchema.index({ name: 'text', phone: 'text', address: 'text', service: 'text' });

export default mongoose.model('Booking', bookingSchema);
