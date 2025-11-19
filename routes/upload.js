import express from "express";
import { upload, uploadSingle } from "../controllers/uploadController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/image", auth, upload.single("file"), uploadSingle);

export default router;
