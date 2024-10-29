class Person {
    #id; // Private property

    constructor(name, age, id) {
        this.name = name; // Public property
        this.age = age;   // Public property
        this.#id = id;    // Private property
    }

    getId() {
        return this.#id;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const person1 = new Person('Alice', 30, '1234');
console.log(person1.name); // Outputs: Alice
console.log(person1.getId()); // Outputs: 1234
person1.greet(); // Outputs: Hello, my name is Alice and I am 30 years old.
// console.log(person1.#id); // Error: Private field '#id' must be declared in an enclosing class
