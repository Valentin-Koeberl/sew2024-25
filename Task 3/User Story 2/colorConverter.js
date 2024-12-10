import { rgbToHex, rgbFunctionToHex, hexToRgb } from '../User Story 1/colorUtils.js';

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
