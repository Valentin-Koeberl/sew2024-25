// main.js

import { add, subtract, PI } from './mathUtils.js';

console.log(add(2, 3));       // Outputs: 5
console.log(subtract(5, 2));  // Outputs: 3
console.log(PI);              // Outputs: 3.14159


// main.js

import multiply from './defaultExport.js';

console.log(multiply(2, 3));  // Outputs: 6

// main.js

import * as math from './mathUtils.js';

console.log(math.add(2, 3));       // Outputs: 5
console.log(math.subtract(5, 2));  // Outputs: 3
console.log(math.PI);              // Outputs: 3.14159

// main.js

import multiply, { add, subtract, PI } from './mathUtils.js';

console.log(add(2, 3));       // Outputs: 5
console.log(subtract(5, 2));  // Outputs: 3
console.log(PI);              // Outputs: 3.14159
console.log(multiply(2, 3));  // Outputs: 6
