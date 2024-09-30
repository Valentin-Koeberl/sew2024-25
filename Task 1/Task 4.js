export function filtereven(arr) {
    return arr.filter(even => even % 2 === 0);
}

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(filtereven(arr));