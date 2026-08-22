import { Router } from 'express';
import multer from 'multer';
import { analyzeImage, extractText } from '../controllers/visionController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('image'), analyzeImage);
router.post('/ocr', upload.single('image'), extractText);

export default router;
