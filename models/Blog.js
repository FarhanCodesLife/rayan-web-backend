import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  content: { type: String, required: true },
  author: { type: String },
  tags: [{ type: String }],
  image: String,
  meta_title: String,
  meta_description: String,
  meta_keywords: String
}, { timestamps: true });

BlogSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Blog', BlogSchema);