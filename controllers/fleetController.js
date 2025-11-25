import Fleet from '../models/Fleet.js';
import { generateSlug } from '../utils/generateSlug.js';
import cloudinary from '../config/cloudinary.js'; // your Cloudinary config

const getAll = async (req, res, next) => {
  try {
    const items = await Fleet.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const s = await Fleet.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (err) { next(err); }
};


const create = async (req, res, next) => {
  try {
    const data = req.body;

    // If you have image file(s) in req.files or req.body.images
    if (req.files?.length) {
      const uploadedImages = [];
      for (const file of req.files) {
        const uploaded = await cloudinary.uploader.upload(file.path, {
          folder: 'fleet',
        });
        uploadedImages.push(uploaded.secure_url);
      }
      data.images = uploadedImages;
    }

    data.slug = generateSlug(data.name);
    const item = await Fleet.create(data);
    res.status(201).json(item);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    if (req.body.name) req.body.slug = generateSlug(req.body.name);

    // Handle image updates if any
    if (req.files?.length) {
      const uploadedImages = [];
      for (const file of req.files) {
        const uploaded = await cloudinary.uploader.upload(file.path, {
          folder: 'fleet',
        });
        uploadedImages.push(uploaded.secure_url);
      }
      req.body.images = uploadedImages;
    }

    const updated = await Fleet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await Fleet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

export default { getAll, create,getById, update, remove };
