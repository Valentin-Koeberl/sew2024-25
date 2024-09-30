// Creating an object using object literals
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    greet: function() {
        console.log("Hello, " + this.firstName);
    }
};

// Accessing properties
console.log(person.firstName); // John
console.log(person["lastName"]); // Doe

// Calling a method
person.greet(); // Hello, John


// Creating an object using the new Object() syntax
const car = new Object();
car.make = "Toyota";
car.model = "Corolla";
car.year = 2020;

console.log(car.make); // Toyota
console.log(car["model"]); // Corolla


// Creating an object using a constructor function
function Animal(type, name) {
    this.type = type;
    this.name = name;
}

const dog = new Animal("Dog", "Buddy");
console.log(dog.type); // Dog
console.log(dog.name); // Buddy

const book = {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    year: 2008
};

// Dot notation
console.log(book.title); // JavaScript: The Good Parts

// Bracket notation
console.log(book["author"]); // Douglas Crockford

const company = {
    name: "Tech Corp",
    address: {
        street: "123 Main St",
        city: "Tech City",
        zip: "12345"
    }
};

console.log(company.address.street); // Tech City

const employees = [
    { name: "Alice", position: "Developer" },
    { name: "Bob", position: "Designer" }
];

employees.forEach(employee => {
    console.log(employee.name + " is a " + employee.position);
});
// Alice is a Developer
// Bob is a Designer