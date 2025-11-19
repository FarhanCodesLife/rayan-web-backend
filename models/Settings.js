import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  siteTitle: String,
  whatsapp: String,
  email: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String
  },
  googleAnalytics: String
}, { timestamps: true });

export default mongoose.model('Settings', SettingsSchema);