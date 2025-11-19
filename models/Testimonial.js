import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: String,
  comment: String,
  rating: { type: Number, default: 5 },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Testimonial', TestimonialSchema);