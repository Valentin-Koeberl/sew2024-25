import convertColor from './colorConverter.js';

console.log("Testing convertColor:");

console.log("Input: rgb(187,22%,88), Target: hex, Expected: #bb3858, Output:", convertColor("rgb(187,22%,88)", "hex"));
console.log("Input: #0ca034, Target: rgb, Expected: rgb(12, 160, 52), Output:", convertColor("#0ca034", "rgb"));
console.log("Input: #ffffff, Target: rgbPercentage, Expected: rgb(100%, 100%, 100%), Output:", convertColor("#ffffff", "rgbPercentage"));
