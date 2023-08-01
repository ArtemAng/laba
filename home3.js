const calculateDiscountedPrice = (products, discount) => {
	return products.map((product) => ({
		...product,
		price: product.price - (product.price * discount) / 100,
	}));
};

const calculateTotalPrice = (products) => {
	return products.reduce((total, product) => total + product.price, 0);
};

const getFullName = ({ firstName = "default", lastName = "name" }) =>
	`${firstName} ${lastName}`;

const makeUnique = (array) => {
	return array.filter(
		(item, index) => array.indexOf(item.toLowerCase()) === index
	);
};
const sortArray = (array) => {
	return [...array].sort();
};

const filterUniqueWords = (str) => {
	const words = str.match(/\b\w+\b/g);
	return sortArray(makeUnique(words));
};

const getAverage = (array) => {
	return array.reduce((total, num) => total + num, 0) / array.length;
};

const getAverageGrade = (students) => {
	return students.map((student) => ({
		...student,
		averageGrade: getAverage(student.grade),
	}));
};

const createCounter = () => {
	let count = 0;

	return () => (count += 1);
};

const repeatFunction = (predicate, num) => {
	return (...args) => {
		if (num >= 0) {
			for (let i = 0; i < num; i++) {
				predicate(...args);
			}
		} else {
			while (true) {
				predicate(...args);
			}
		}
	};
};

const calculateFactorial = (n, fucktorial = 1) => {
	if (!n) {
		return fucktorial;
	}

	return calculateFactorial(n - 1, n * fucktorial);
};

const power = (base, exponent) => {
	if (exponent === 0) {
		return 1;
	}

	return base * power(base, exponent - 1);
};

function lazyMap(array, mappingFunction) {
	let index = 0;

	return {
		next: function () {
			if (index < array.length) {
				return {
					value: mappingFunction(array[index++]),
					done: false,
				};
			} else {
				return {
					done: true,
				};
			}
		},
	};
}
function fibonacciGenerator() {
	let prev = 0;
	let curr = 1;

	return {
		next: function () {
			const fib = curr;
			curr = prev + curr;
			prev = fib;

			return {
				value: fib,
				done: false,
			};
		},
	};
}

//task1
console.log("____________task 1____________");
const products = [{ price: 100 }, { price: 200 }, { price: 300 }];

console.log(
	"calculateDiscountedPrice: ",
	calculateDiscountedPrice(products, 10)
);
console.log("calculateTotalPrice: ", calculateTotalPrice(products));

//task2
console.log("____________task 2____________");
const person = { firstName: "AAA", lastName: "BBB" };
const students = [
	{ firstName: "AAA", lastName: "BBB", grade: [10, 9, 7, 5] },
	{ firstName: "CCC", lastName: "DDD", grade: [9, 1, 7, 7] },
	{ firstName: "EEE", lastName: "FFF", grade: [10, 5, 8, 5] },
	{ firstName: "GGG", lastName: "HHH", grade: [3, 9, 4, 5] },
	{ firstName: "III", lastName: "JJJ", grade: [10, 6, 1, 5] },
];

console.log("getFullname: ", getFullName(person));
console.log(
	"filterUniqueWords: ",
	filterUniqueWords("Qwe asd, sss sdf_ qwe asd-fff fff")
);
console.log("getAverageGrade: ", getAverageGrade(students));

//task3
console.log("____________task 3____________");
const counter = createCounter();

console.log("counter: ", counter());
const repeated = repeatFunction(() => console.log("counter: ", counter()), 3);
repeated();
//task4
console.log("____________task 4____________");
console.log("calculateFactorial:", calculateFactorial(5));
console.log("power:", power(2, 3));

//task5
console.log("____________task 5____________");
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = lazyMap(numbers, (i) => i * i);
const squareGenerator = squaredNumbers;

console.log("squareGenerator: ", squareGenerator.next().value);
console.log("squareGenerator: ", squareGenerator.next().value);
console.log("squareGenerator: ", squareGenerator.next().value);
console.log("squareGenerator: ", squareGenerator.next().value);

const fibonacci = fibonacciGenerator();

console.log("fibonacci: ", fibonacci.next().value);
console.log("fibonacci: ", fibonacci.next().value);
console.log("fibonacci: ", fibonacci.next().value);
console.log("fibonacci: ", fibonacci.next().value);
