function equals (obj1, obj2) {
    if (Object.keys(obj1).length === Object.keys(obj2).length) {
        const arr1 = Object.keys(obj1).sort();
        const arr2 = Object.keys(obj2).sort();
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    } else {
        return false;
    }
}

const obj1 = {
    x : 10,
    y : function () {
        return {
            z : 10,
        }
    },
    test: "name",
    typ: "derTyp"
}

const obj2 = {
    x : 10,
    y : function () {
        return {
            z : 10,
        }
    },
    test: "name",
    typ: "derTyp"
}

const obj3 = {
    x : 10,
    y : function () {
        return {
            z : 10,
        }
    },
}

const obj4 = {
    a : 10,
    y : function () {
        return {
            z : 10,
        }
    },
    test: "name",
    typ: "derTyp"
}
const obj5 = {
    y : 10,
    x : function () {
        return {
            z : 10,
        }
    },
    test: "name",
    typ: "derTyp"
}


console.log(equals(obj1, obj2)); //true
console.log(equals(obj1, obj3)); //false
console.log(equals(obj1, obj4)); //false
console.log(equals(obj1, obj5)); //true