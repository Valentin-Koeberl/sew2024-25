function generate(op) {
    return function(a, b) {
        if (op === '+') {
            return a + b;
        } else if (op === '-') {
            return a - b;
        } else if (op === '*') {
            return a * b;
        } else if (op === '/') {
            return a / b;
        }
    };
}

let mult = generate('*');
console.log(mult(3, 4));

let add = generate('+');
console.log(add(3, 4));

let sub = generate('-');
console.log(sub(3, 4));

let div = generate('/');
console.log(div(12, 4));
