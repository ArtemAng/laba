const addValues = (num1, num2) => {
	const correctTypes = ["string", "number", "boolean"];
	const numsTypes = [typeof num1, typeof num2].filter((type) =>
		correctTypes.includes(type)
	);

	if (typeof num1 === "boolean" || typeof num2 === "boolean") {
		if (typeof num2 === "boolean" && typeof num1 === "boolean") {
			return num1 || num2;
		}
		return "Error: if you want to add booleans, params must be a booleans";
	}

	return numsTypes.length === 2
		? num1 + num2
		: "Error: parametr must be a number, string or boolean";
};

const stringifyValue = (value) => {
	return typeof value === "object" ? JSON.stringify(value) : String(value);
};

const invertBoolean = (value) => {
	return typeof value === "boolean"
		? !value
		: "Error: parametr must be boolean";
};

const convertToNumber = (value) => {
	switch (typeof value) {
		case "string":
			const parsedNum = Number(value);

			if (isNaN(parsedNum)) {
				return "Error: parametr cannot be converted to number";
			}

			return parsedNum;

		case "boolean":
			return Number(value);

		case "number":
			return value;

		default:
			return "Error: parametr cannot be converted to number";
	}
};

const coerceToType = (value, type) => {
	switch (type) {
		case "string":
			return stringifyValue(value);
		case "number":
			return convertToNumber(value);
		case "boolean":
			return Boolean(value);
		default:
			return `Error: we cannot coerce to type ${type}`;
	}
};

module.exports = {
	addValues,
	stringifyValue,
	invertBoolean,
	convertToNumber,
	coerceToType,
};

//for running
const variables = [
	null,
	undefined,
	true,
	false,
	42,
	3.14,
	"Hello, World!",
	Symbol("symbol"),
	{},
	[],
	function () {},
];
//results
console.log(
	"addValues:",
	variables.map((item) => addValues(item, item))
);
console.log("stringifyValue:", variables.map(stringifyValue));
console.log("invertBoolean:", variables.map(invertBoolean));
console.log("convertToNumber:", variables.map(convertToNumber));
console.log(
	"coerceToType:",
	variables
		.map((item) => [item, typeof item])
		.map((item) => coerceToType(item[0], item[1]))
);
