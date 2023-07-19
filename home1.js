const getEqualSizeNumbers = (num1, num2) => {
	const sizeDifferent = num1.length - num2.length;
	let modifiedNumber1 = num1;
	let modifiedNumber2 = num2;

	if (sizeDifferent) {
		if (sizeDifferent > 0) {
			modifiedNumber2 = "0".repeat(sizeDifferent) + num2;
		} else {
			modifiedNumber1 = "0".repeat(-1 * sizeDifferent) + num1;
		}
	}
	return [modifiedNumber1, modifiedNumber2];
};

String.prototype.plus = function (num) {
	let [num1, num2] = getEqualSizeNumbers(this.toString(), num);
	let sum = "";
	let intermediateValue = 0;

	for (let i = num1.length - 1; i >= 0; i--) {
		let digitSum =
			parseInt(num1[i]) + parseInt(num2[i]) + intermediateValue;
		intermediateValue = Math.floor(digitSum / 10);
		sum = (digitSum % 10) + sum;
	}

	return sum.replace(/^0+/, "");
};

String.prototype.minus = function (num) {
	let [num1, num2] = getEqualSizeNumbers(this.toString(), num).map((i) =>
		i.split("")
	);
	let difference = "";
	for (let i = num1.length - 1; i > -1; i--) {
		let digitDiff = parseInt(num1[i]) - parseInt(num2[i]);
		if (digitDiff < 0) {
			num1[i - 1] -= 1;
			difference += 10 + parseInt(num1[i]) - parseInt(num2[i]);
		} else {
			difference += digitDiff;
		}
	}
	return [...difference].reverse().join("").replace(/^0+/, "") || "0";
};

String.prototype.multiply = function (num) {
	let [num1, num2] = [this, num];
	const result = Array(num1.length + num2.length).fill(0);

	for (let i = num1.length - 1; i >= 0; i--) {
		for (let j = num2.length - 1; j >= 0; j--) {
			const product = (num1[i] - "0") * (num2[j] - "0");
			const sum = result[i + j + 1] + product;
			result[i + j + 1] = sum % 10;
			result[i + j] += Math.floor(sum / 10);
		}
	}

	return result.join("").replace(/^0+/, "");
};

String.prototype.divide = function (num) {
	let [num1, num2] = [this, num];
	let intermediateValue = 0;
	let result = "";

	for (let i = 0; i < num1.length; i++) {
		const currentDigit = parseInt(num1[i]);

		const dividend = intermediateValue * 10 + currentDigit;
		const divideResult = Math.floor(dividend / num2);
		intermediateValue = dividend % num2;

		result += divideResult.toString();
	}

	return result.replace(/^0+/, "");
};

console.log(
	"plus:",
	"9876543210987654321098765432109876543210".plus(
		"1234567890123456789012345678901234567890"
	)
);
console.log(
	"minus:",
	"9876543210987654321098765432109876543210".minus(
		"1234567890123456789012345678901234567890"
	)
);
console.log(
	"multiply:",
	"9876543210987654321098765432109876543210".multiply(
		"1234567890123456789012345678901234567890"
	)
);
console.log("divide:", "9876543210987654321098765432109876543210".divide("2"));
