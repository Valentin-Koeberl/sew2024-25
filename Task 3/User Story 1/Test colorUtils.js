import { rgbToHex, rgbFunctionToHex, hexToRgb } from './colorUtils.js';

console.log("Testing rgbToHex:");
console.log("Input: (12, 160, 52), Expected: #0ca034, Output:", rgbToHex(12, 160, 52));
console.log("Input: (0, 0, 0), Expected: #000000, Output:", rgbToHex(0, 0, 0));
console.log("Input: (255, 255, 255), Expected: #ffffff, Output:", rgbToHex(255, 255, 255));

console.log("\nTesting rgbFunctionToHex:");
console.log("Input: 'rgb(187,22%,88)', Expected: #bb3858, Output:", rgbFunctionToHex("rgb(187,22%,88)"));
console.log("Input: 'rgb(0,0,0)', Expected: #000000, Output:", rgbFunctionToHex("rgb(0,0,0)"));
console.log("Input: 'rgb(100%,100%,100%)', Expected: #ffffff, Output:", rgbFunctionToHex("rgb(100%,100%,100%)"));

console.log("\nTesting hexToRgb with numbers:");
console.log("Input: '#0ca034', Expected: rgb(12, 160, 52), Output:", hexToRgb("#0ca034"));
console.log("Input: '#000000', Expected: rgb(0, 0, 0), Output:", hexToRgb("#000000"));
console.log("Input: '#ffffff', Expected: rgb(255, 255, 255), Output:", hexToRgb("#ffffff"));

console.log("\nTesting hexToRgb with percentages:");
console.log("Input: '#0ca034', true, Expected: rgb(5%, 63%, 20%), Output:", hexToRgb("#0ca034", true));
console.log("Input: '#000000', true, Expected: rgb(0%, 0%, 0%), Output:", hexToRgb("#000000", true));
console.log("Input: '#ffffff', true, Expected: rgb(100%, 100%, 100%), Output:", hexToRgb("#ffffff", true));
