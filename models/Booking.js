import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  serviceType: String,
  date: String,
  pickupLocation: String,
  dropLocation: String,
  message: String,
  status: { type: String, default: 'Pending' } // Pending, Confirmed, Completed
}, { timestamps: true });

export default mongoose.model('Booking', BookingSchema);