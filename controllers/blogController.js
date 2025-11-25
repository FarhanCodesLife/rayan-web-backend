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

const getById = async (req, res, next) => {
  try {
    const s = await Blog.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (err) { next(err); }
};


const create = async (req, res, next) => {
  try {
    const data = req.body;

    // Required validation
    if (!data.title || !data.content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Generate slug
    data.slug = generateSlug(data.title);

    // Sanitize content
    data.content = sanitizeHtml(data.content || "", { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']) });

    // Ensure optional fields exist
    data.tags = Array.isArray(data.tags) ? data.tags : [];
    data.author = data.author || "";
    data.category = data.category || "";
    data.image = data.image || "";
    data.meta_title = data.meta_title || "";
    data.meta_description = data.meta_description || "";
    data.meta_keywords = data.meta_keywords || "";
    data.status = data.status || "Draft";

    const p = await Blog.create(data);
    res.status(201).json(p);
  } catch (err) {
    console.error("Create Blog Error:", err);
    next(err);
  }
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
export default { getAll, getOne,getById, create, update, remove };