export function rgbToHex(r, g, b) {
    const toHex = (value) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbFunctionToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+%?),\s*(\d+%?),\s*(\d+%?)\)$/);
    if (!match) throw new Error('Invalid rgb() format');

    const to255 = (value) => value.endsWith('%') ? Math.round((parseFloat(value) / 100) * 255) : parseInt(value, 10);
    const [_, r, g, b] = match;
    return rgbToHex(to255(r), to255(g), to255(b));
}

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