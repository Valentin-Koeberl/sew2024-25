function convert(amount) {
    let coincounter = {
        '200' : 0,
        '100': 0,
        '50': 0,
        '20': 0,
        '10': 0,
        '5': 0,
        '2': 0,
        '1': 0
    };

    while (amount > 0) {
        if (amount >= 200) {
            amount = amount - 200;
            coincounter["200"]++;
        } else if (amount >= 100) {
            amount = amount - 100;
            coincounter["100"]++;
        } else if (amount >= 50) {
            amount = amount - 50;
            coincounter["50"]++;
        } else if (amount >= 20) {
            amount = amount - 20;
            coincounter["20"]++;
        } else if (amount >= 10) {
            amount = amount - 10;
            coincounter["10"]++;
        } else if (amount >= 5) {
            amount = amount - 5;
            coincounter["5"]++;
        } else if (amount >= 2) {
            amount = amount - 2;
            coincounter["2"]++;
        } else if (amount === 1) {
            amount = amount - 1;
            coincounter["1"]++;
        }
    }
    return filterCounters(coincounter);
}

function filterCounters(coincounter) {
    return Object.fromEntries(
        Object.entries(coincounter).filter(([key, value]) => value > 0)
    );
}

let result = convert(231);
console.log(result);