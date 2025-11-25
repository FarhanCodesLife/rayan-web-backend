import Booking from '../models/Booking.js';
import nodemailer from 'nodemailer';

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const booking = await Booking.create(data);

    // send email to admin
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const mailOptions = {
      from: `"Khadija & Siblings" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      subject: `New Booking / Inquiry from ${data.name}`,
      html: `<p><strong>Name:</strong> ${data.name}</p>
             <p><strong>Phone:</strong> ${data.phone}</p>
             <p><strong>Service:</strong> ${data.serviceType}</p>
             <p><strong>Date:</strong> ${data.date}</p>
             <p><strong>Pickup:</strong> ${data.pickupLocation}</p>
             <p><strong>Message:</strong> ${data.message}</p>`
    };

    transporter.sendMail(mailOptions).catch(err => console.error('Mail error:', err));

    res.status(201).json({ success: true, booking });
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const list = await Booking.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { next(err); }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const b = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(b);
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const s = await Booking.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (err) { next(err); }
};


export default { create, getAll,getById, updateStatus };