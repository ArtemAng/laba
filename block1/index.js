const localize = (str) => translations[language][str];
const translations = {
	en: {
		greet: "Hello",
		intro: "Welcome to our website"
	},
	fr: {
		greet: "Bonjour",
		intro: "Bienvenue sur notre site web"
	}
};

const language = "en"; // Change to "en" for English  
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize(`${greeting}`);
const localizedIntroduction = localize(`${introduction}`);

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")  
console.log(localizedIntroduction);


//task2
const highlightKeywords = (template, keywords) => {
	return template.replace(/\${(\d+)}/g, (match, index) => {
		return `<span class='highlight'>${keywords[index]}</span>`;
	});
}
const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."

//task 3
const multiline = (template) => {
	const sliced = template.split("\n").slice(1, -1);
	return sliced.map((line, index) => `${index + 1} ${line}`).join("\n");
}

const code = multiline(`  
function add(a, b) {  
return a + b;  
}  
`);

console.log(code);
// Expected:
// "1 function add(a, b) {  
// 2 return a + b;  
// 3 }"


//task 6
const _ = Symbol();

function curry(func, arity) {
  return function curried(...args) {
	if (args.length >= arity) {
	  const filledArgs = args.map(arg => arg === _ ? undefined : arg);
	  return func(...filledArgs);
	} else {
	  return function (...nextArgs) {
		const combinedArgs = args.map((arg, index) => arg === _ ? nextArgs.shift() : arg);
		return curried(...combinedArgs, ...nextArgs);
	  };
	}
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

console.log("Result:", result); // Expected: 24





