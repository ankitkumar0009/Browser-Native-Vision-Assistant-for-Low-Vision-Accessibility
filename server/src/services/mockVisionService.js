"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMockOcrText = exports.getMockImageDescription = void 0;
const descriptions = [
    "The image shows a busy street with several cars, pedestrians, and a traffic signal. A red car is approximately in the center of the image. The pedestrian crossing signal is visible on the right side.",
    "This image contains a modern office desk with a laptop open, a white coffee mug to the right, and a potted plant in the background. The lighting is bright and natural.",
    "A group of three people walking in a park on a sunny day. There are large green trees on both sides of the paved path.",
    "The picture displays a kitchen counter with various fresh vegetables including tomatoes, bell peppers, and onions, along with a cutting board and a chef's knife."
];
const getMockImageDescription = () => {
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return descriptions[randomIndex];
};
exports.getMockImageDescription = getMockImageDescription;
const getMockOcrText = () => {
    return "WARNING: Pedestrian Crossing Ahead. Speed limit 25 MPH.";
};
exports.getMockOcrText = getMockOcrText;
//# sourceMappingURL=mockVisionService.js.map