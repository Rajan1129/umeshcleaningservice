import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://shrmarajn70_db_user:5GFiadRK4vzK3le4@ac-wam1qne-shard-00-00.ypjdnt7.mongodb.net:27017,ac-wam1qne-shard-00-01.ypjdnt7.mongodb.net:27017,ac-wam1qne-shard-00-02.ypjdnt7.mongodb.net:27017/?ssl=true&replicaSet=atlas-wae1fr-shard-0&authSource=admin&appName=Cluster0';

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 4000,
        connectTimeoutMS: 4000
      })
      .then((m) => m)
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}

// Booking Schema
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
    status: { type: String, default: 'new' },
    notes: [noteSchema]
  },
  { timestamps: true }
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'admin' },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

adminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
