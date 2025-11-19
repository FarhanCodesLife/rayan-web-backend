import Fleet from '../models/Fleet.js';
import { generateSlug } from '../utils/generateSlug.js';

const getAll = async (req, res, next) => {
  try {
    const items = await Fleet.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    data.slug = generateSlug(data.name);
    const item = await Fleet.create(data);
    res.status(201).json(item);
  } catch (err) { next(err); }
};


const update = async (req, res, next) => {
  try {
    if (req.body.name) req.body.slug = generateSlug(req.body.name);
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

export default { getAll, create, update, remove };
