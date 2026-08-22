"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const visionController_1 = require("../controllers/visionController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/analyze', upload.single('image'), visionController_1.analyzeImage);
router.post('/ocr', upload.single('image'), visionController_1.extractText);
exports.default = router;
//# sourceMappingURL=visionRoutes.js.map