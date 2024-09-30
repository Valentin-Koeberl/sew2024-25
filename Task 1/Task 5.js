import { filtereven } from './Task 4.js';

function test(fu, arg, exp) {
    let result = fu(arg);

    if (JSON.stringify(result) === JSON.stringify(exp)) {
        return true;
    } else {
        return false;
    }
}

console.log(test(filtereven, [1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 4, 6, 8]));
