/**
 * Converts RGB values to a hex color string.
 * @param {number} r - Red value (0-255).
 * @param {number} g - Green value (0-255).
 * @param {number} b - Blue value (0-255).
 * @returns {string} - Hex color string (e.g., #0ca034).
 */
export function rgbToHex(r, g, b) {
    const toHex = (value) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts an rgb() functional notation string to a hex color string.
 * Supports percentage or number values for RGB.
 * @param {string} rgb - rgb() functional notation (e.g., "rgb(187,22%,88)").
 * @returns {string} - Hex color string (e.g., #bb3858).
 */
export function rgbFunctionToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+%?),\s*(\d+%?),\s*(\d+%?)\)$/);
    if (!match) throw new Error('Invalid rgb() format');

    const to255 = (value) => value.endsWith('%') ? Math.round((parseFloat(value) / 100) * 255) : parseInt(value, 10);
    const [_, r, g, b] = match;
    return rgbToHex(to255(r), to255(g), to255(b));
}

/**
 * Converts a hex color string to an rgb() functional notation.
 * @param {string} hex - Hex color string (e.g., #0ca034).
 * @param {boolean} isPercentage - Whether to output percentage values.
 * @returns {string} - rgb() functional notation with either numbers or percentages.
 */
export function hexToRgb(hex, isPercentage = false) {
    const cleanHex = hex.replace(/^#/, '');
    if (cleanHex.length !== 6) throw new Error('Invalid hex format');

    const parseHex = (start) => parseInt(cleanHex.slice(start, start + 2), 16);
    const [r, g, b] = [parseHex(0), parseHex(2), parseHex(4)];

    if (isPercentage) {
        const toPercentage = (value) => `${Math.round((value / 255) * 100)}%`;
        return `rgb(${toPercentage(r)}, ${toPercentage(g)}, ${toPercentage(b)})`;
    } else {
        return `rgb(${r}, ${g}, ${b})`;
    }
}