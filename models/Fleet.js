import mongoose from "mongoose";

const FleetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, index: true },
  specs: { type: String },
  images: [{ type: String }],
  pricePerDay: { type: Number },
  pricePerHour: { type: Number },
  kmLimit: { type: Number },
  availability: { type: Boolean, default: true },
  meta_title: String,
  meta_description: String,
  meta_keywords: String
}, { timestamps: true });

FleetSchema.index({ name: 'text', specs: 'text' });

export default mongoose.model('Fleet', FleetSchema);
