"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractText = exports.analyzeImage = void 0;
const express_1 = require("express");
const mockVisionService_1 = require("../services/mockVisionService");
// In a real scenario, you'd call a service using process.env.AI_API_KEY
const analyzeImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No image uploaded' });
            return;
        }
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Here we use a mock service since no API key is guaranteed.
        // We could check if AI_API_KEY exists and use openai SDK here.
        const description = (0, mockVisionService_1.getMockImageDescription)();
        const objects = ['Person', 'Computer', 'Coffee Cup', 'Desk'];
        res.json({
            description,
            objects,
            success: true
        });
    }
    catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Failed to analyze image' });
    }
};
exports.analyzeImage = analyzeImage;
const extractText = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No image uploaded' });
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        const text = (0, mockVisionService_1.getMockOcrText)();
        res.json({
            text,
            success: true
        });
    }
    catch (error) {
        console.error('Error extracting text:', error);
        res.status(500).json({ error: 'Failed to extract text' });
    }
};
exports.extractText = extractText;
//# sourceMappingURL=visionController.js.map