
console.log("Example with class");

// Instead of a function that creates a car,
// we define a class Car

// A class looks much cleaner, and has many other advantages.

class Car {

	// The constructor initializes the properties.
	// It gets called when we do: new Car(some_brand)
	constructor(brand) {
		this.brand = brand;
		this.speed = 0;
	}

	// methods:

	// (notice that now we don't say "function" and that we
	//  don't put a comma after closing brace of the function)

	accelerate(amount) {
		this.speed += amount;
	}

	brake(amount) {
		this.speed -= amount;
	}

	status() {
		return this.brand + " running at " + this.speed + " km/h";
	}
}


// Now we use create a Car object using the class

var car = new Car("Ford");

console.log(car.status());
car.accelerate(50);
console.log(car.status());
car.accelerate(100);
console.log(car.status());
car.brake(25);
console.log(car.status());


// We may create other cars easily

var car2 = new Car("Ferrari");
car2.accelerate(200);
console.log(car2.status());


