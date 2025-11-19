import Settings from '../models/Settings.js';

const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) { next(err); }
};

const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    Object.assign(settings, req.body);
    await settings.save();
    res.json(settings);
  } catch (err) { next(err); }
};

export default { getSettings, updateSettings };