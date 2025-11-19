import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"; 

// multer memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage }); // ⬅ named export

export const uploadSingle = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    // Cloudinary upload using stream:
    const stream = cloudinary.uploader.upload_stream(
      { folder: "khadija/fleet" },
      (error, result) => {
        if (error) return next(error);
        res.json({ success: true, url: result.secure_url });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    next(err);
  }
};
