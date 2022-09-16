// Basics of OOP

// Create a class
class User {
	// The constructor defines our properties and should always be executed
	constructor(name, age) {
		// Attributes/Properties - How our instances should look
		this.name = name;
		this.age = age;
	}

	// Methods - What our instances can do
	sayHello() {
		console.log(`Hello! My name is ${this.name}`);
	}
}

// Create instances of our classes
const user = new User('Max', 24);
const user2 = new User('Fer', 23);
const user3 = new User('Luis', 24);

// Callings methods of our classes
user.sayHello();
user2.sayHello();
user3.sayHello();

// Inheritance

// Our parent class
class Car {
	constructor(color, doors, km, year) {
		this.color = color;
		this.doors = doors;
		this.km = km;
		this.year = year;
	}

	turnOn() {
		console.log('The car is on.');
	}

	drive() {
		console.log('The car is driving...');
	}
}

// Our child class to which we want to inherit the properties and methods of the parent class
class Chevrolet extends Car {
	constructor(color, doors, km, year, model, reverseCamera, price) {
		// Super executes the constructor of our parent class
		super(color, doors, km, year);

		this.model = model;
		this.reverseCamera = reverseCamera;
		this.price = price;
	}

	reverse() {
		if (this.reverseCamera) {
			console.log('Reverse camera will turn on...');
		}

		console.log('The car is in reverse...');
	}
}

// Create an instance of our class
const aveo = new Chevrolet('black', 4, 40000, 2015, 'Aveo', true, 90000);

// Our instance can use the methods of its class and the parent class from which we inhereted from
aveo.turnOn();
aveo.drive();
aveo.reverse();
