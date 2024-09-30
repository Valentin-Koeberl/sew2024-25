function numberMembers(obj) {
    return  Object.keys(obj).sort(); //Object.keys(obj).length
}

const testObj = {
    x : 10,
    y : function () {
        return {
            z : 10,
        }
    },
    test: "name",
    typ: "derTyp"
}

console.log(numberMembers(testObj));