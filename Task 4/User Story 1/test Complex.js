import {Complex} from "./Complex.js";

// Example test cases

// Test case: Default constructor (0+0i)
const c1 = new Complex();
console.log("c1:", c1.toString()); // Expected output: "0+0i"

// Test case: Single real argument
const c2 = new Complex(2);
console.log("c2:", c2.toString()); // Expected output: "2+0i"

// Test case: Two arguments
const c3 = new Complex(2, 5);
console.log("c3:", c3.toString()); // Expected output: "2+5i"

// Test case: Adding complex numbers
c3.add(new Complex(-1, -5));
c3.add(3, 2).add(c1);
console.log("c3 after addition:", c3.toString()); // Expected output: "1+0i"

// Test case: Equality check
const c4 = new Complex(1, 0);
console.log("c3 equals c4:", Complex.equals(c3, c4)); // Expected output: true