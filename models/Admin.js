import mongoose from "mongoose";
const schema = mongoose.Schema

const AdminSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'superadmin' }
}, { timestamps: true });


export default mongoose.model('Admin', AdminSchema);
