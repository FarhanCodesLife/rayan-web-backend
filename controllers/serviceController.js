import Service from '../models/Service.js';
import { generateSlug } from '../utils/slugify.js';

const getAll = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const s = await Service.findOne({ slug: req.params.slug });
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    data.slug = generateSlug(data.title);
    const s = await Service.create(data);
    res.status(201).json(s);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.body.title) req.body.slug = generateSlug(req.body.title);
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

export default { getAll, getOne, create, update, remove };