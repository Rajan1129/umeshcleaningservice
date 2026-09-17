/**
 * One-time setup: creates the first admin account and loads the 13 services.
 * Run with `npm run seed`.
 * It does NOT create reviews, gallery images or before/after comparisons —
 * those must come from the business's own photos and its real Google reviews.
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';
import Service from '../models/Service.js';

const services = JSON.parse(fs.readFileSync(path.resolve('utils/services.seed.json'), 'utf-8'));

const run = async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding');
  if (password.length < 8) throw new Error('ADMIN_PASSWORD must be at least 8 characters');

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
  } else {
    await Admin.create({ name: process.env.ADMIN_NAME || 'Administrator', email, password });
    console.log(`Admin created: ${email}`);
  }

  for (const service of services) {
    await Service.findOneAndUpdate({ slug: service.slug }, service, { upsert: true, setDefaultsOnInsert: true });
  }
  console.log(`${services.length} services loaded`);

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
