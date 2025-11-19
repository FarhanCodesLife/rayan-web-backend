import Blog from '../models/Blog.js';

import { generateSlug } from '../utils/generateSlug.js';
import sanitizeHtml from 'sanitize-html';

const getAll = async (req, res, next) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    data.slug = generateSlug(data.title);
    // sanitize content to avoid XSS
    data.content = sanitizeHtml(data.content, { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']) });
    const p = await Blog.create(data);
    res.status(201).json(p);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    if (req.body.title) req.body.slug = generateSlug(req.body.title);
    if (req.body.content) req.body.content = sanitizeHtml(req.body.content, { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']) });
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
export default { getAll, getOne, create, update, remove };