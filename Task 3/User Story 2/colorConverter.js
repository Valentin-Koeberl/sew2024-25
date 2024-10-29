// colorConverter.js

import { rgbToHex, rgbFunctionToHex, hexToRgb } from '../User Story 1/colorUtils.js';

/**
 * Converts a color in any supported format to the desired output format.
 * @param {string} color - The input color string (e.g., "rgb(255, 255, 255)" or "#ffffff").
 * @param {string} targetFormat - The desired format ("hex", "rgb", or "rgbPercentage").
 * @returns {string} - The converted color string.
 */
function convertColor(color, targetFormat) {
    if (targetFormat === "hex") {
        if (color.startsWith("rgb(")) {
            return rgbFunctionToHex(color);
        }
    } else if (targetFormat === "rgb") {
        if (color.startsWith("#")) {
            return hexToRgb(color);
        }
    } else if (targetFormat === "rgbPercentage") {
        if (color.startsWith("#")) {
            return hexToRgb(color, true);
        }
    } else {
        throw new Error("Unsupported target format. Use 'hex', 'rgb', or 'rgbPercentage'.");
    }
    throw new Error("Invalid input format.");
}

export default convertColor;
