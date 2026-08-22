import { Router } from 'express';
import multer from 'multer';
import { analyzeImage, extractText } from '../controllers/visionController';
import { env } from '../config/env';

const router = Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: env.maxImageSize * 1024 * 1024 }
});

router.post('/analyze', upload.single('image'), analyzeImage);
router.post('/ocr', upload.single('image'), extractText);

export default router;
