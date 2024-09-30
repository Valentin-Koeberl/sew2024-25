function sortArray(arr) {
    return arr.sort((a, b) => a.localeCompare(b));
}

let arr = ["Blume", "Blatt", "Baum", "Busch"];
console.log(sortArray(arr));
