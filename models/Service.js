import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  category: { type: String },
  description: { type: String },
  image: { type: String },
  price: { type: Number },
  duration: { type: String },
  featured: { type: Boolean, default: false },
  meta_title: { type: String },
  meta_description: { type: String },
  meta_keywords: { type: String }
}, { timestamps: true });


ServiceSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Service', ServiceSchema);
