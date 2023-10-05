/**
 * Tokenizes a string by extracting individual tokens.
 *
 * @param {string} string - The input string to be tokenized.
 * @return {Array} An array of tokens extracted from the input string.
 */
const tokienize = (string) => {
  const regex = /"(\\.|[^"\\])*"|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[\[\]{}]|./g;
  return Array.from(string.match(regex)).slice(1, -1).filter((item) => item !== ' ');
}
/**
 * Parses a string by removing the first and last character.
 *
 * @param {string} stringifiedData - The string to be parsed.
 * @return {string} The parsed string.
 */
const parseString = (stringifiedData) => {
  return stringifiedData.slice(1, stringifiedData.length - 1)
}

/**
 * Finds the indexes of colons in an array.
 *
 * @param {Array} arr - The input array.
 * @return {Array} An array containing the indexes of colons in the input array.
 */
function findColonIndexes(arr) {
  const indices = [];
  arr.map((item, idx) => item === ':' && indices.push(idx));
  return indices;
}
/**
 * Finds the index of the closing bracket in the given array.
 *
 * @param {Array} arr - The array to search in.
 * @param {string} bracketO - The opening bracket to search for.
 * @param {string} bracketC - The closing bracket to search for.
 * @return {number} The index of the closing bracket, or -1 if not found.
 */
const findClosingBracketIndex = (arr, bracketO, bracketC, startIndex = -1) => {
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === bracketO) {
      if (stack.length === 0) {
        startIndex = i;
      }
      stack.push(bracketO);
    } else if (arr[i] === bracketC) {
      stack.pop();
      if (stack.length === 0 && startIndex !== -1) {
        return i;
      }
    }
  }
  return -1; // Если закрывающая скобка не найдена
}

/**
 * Counts the number of nested levels in a string.
 *
 * @param {string} str - The string to be analyzed.
 * @return {number} The maximum depth of nested levels in the string.
 */
const countNestedLevels = (str) => {
  let maxDepth = 0;
  let currentDepth = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    } else if (str[i] === "}") {
      currentDepth--;
    }
  }

  return maxDepth;
}

//Object parser
const getObjectTokens = (tokens, startIndex) => {
  const closedBracketsIndex = findClosingBracketIndex(tokens.slice(startIndex), '{', '}');
  return [tokens.slice(startIndex + 1, closedBracketsIndex + startIndex), closedBracketsIndex + startIndex];
}

/**
 * Parses the given token and returns the corresponding primitive value.
 *
 * @param {string} token - The token to be parsed.
 * @param {number} tokenID - The unique identifier for the token.
 * @param {Array} tokens - The array of tokens.
 * @return {boolean|number|null|undefined} - The parsed primitive value.
 */
const parsePrimitives = (token, tokenID, tokens) => {
  const primitiveTypes = {
    f: () => false,
    t: () => true,
    n: () => null,
    u: () => undefined,
    '"': parseString
  };

  if (primitiveTypes[`${token}`[0]]) {
    return primitiveTypes[`${token}`[0]](token);
  }

  return Number(token);
}
/**
 * Removes objects from the given tokens array.
 *
 * @param {Array} tokens - The array of tokens to remove objects from.
 * @return {Array} An array containing the modified tokens and the removed objects.
 */
const removeObjects = (tokens) => {
  const objects = [];
  const newTokens = [];
  for (let idx = 0; idx < tokens.length; idx++) {
    if (tokens[idx] === "{") {
      const [token, closeId] = getObjectTokens(tokens, idx);
      objects.push({ token, key: tokens[idx - 2], deeps: countNestedLevels(token) });
      idx = closeId + 1;
      newTokens.pop();
      newTokens.pop();
    }
    else {
      newTokens.push(tokens[idx]);
    }
  }
  return [newTokens, objects];
}

/**
 * Parses the given tokens and returns an object.
 *
 * @param {Array} tokens - An array of tokens to parse.
 * @return {Object} - The parsed object.
 */
const parseValue = (tokens) => {
  const finalObject = {};
  const colonIndexes = findColonIndexes(tokens);
  colonIndexes.forEach((colonIndex) => {
    const key = tokens[colonIndex - 1].slice(1, -1);
    const value = parsePrimitives(tokens[colonIndex + 1], colonIndex + 1, tokens);
    finalObject[key] = value;
  });
  return finalObject;
}

/**
 * Parses objects from an array of tokens and returns a new object.
 *
 * @param {Array} tokens - An array of tokens to parse.
 * @return {Object} - A new object containing the parsed objects.
 */
const parseObjects = (objects) => {
  let newObj = {};
  objects.forEach((item) => {
    newObj = { ...newObj, ...eval(`({${item}})`) }
  });
  return newObj
}

/**
 * Parses arrays within the given tokens and returns a new object containing the parsed arrays.
 *
 * @param {Array} tokens - An array of tokens.
 * @return {Object} - A new object containing the parsed arrays.
 */
const parseArrays = (arrays) => {
  let newObj = {};
  arrays.forEach((item) => {
    newObj = { ...newObj, ...eval(`({${item}})`) }
  });
  return newObj;
}

/**
 * Parses a JSON string and returns the corresponding JavaScript object.
 *
 * @param {string} token - The JSON string to be parsed.
 * @return {object} - The JavaScript object parsed from the JSON string.
 */
const myJSONParse = (token) => {
  const tokens = tokienize(token)
  const [arrays, objects, other] = removeValues(tokens);
  return { ...parseValue(other), ...parseObjects(objects), ...parseArrays(arrays) };
}

const removeValues = (tokens) => {
  const arrays = [];
  const objects = [];
  let newTokens = [];

  for (let idx = 0; idx < tokens.length; idx++) {
    if (tokens[idx] === "[") {
      const closeBrId = (findClosingBracketIndex(tokens.slice(idx), '[', ']'));
      const sliced = tokens.slice(idx, idx + closeBrId + 1);
      arrays.push(`${tokens[idx - 2]}: ${sliced.join('')}`);
      idx += closeBrId + 1;
      const filtered = sliced.filter(n => ![':', ',', 'true', 'false', 'null', 'undefined'].includes(n))
      newTokens = newTokens.filter(n => !filtered.includes(n))
    }
    if (tokens[idx] === "{") {
      const closeBrId = (findClosingBracketIndex(tokens.slice(idx), '{', '}'));
      const sliced = tokens.slice(idx, idx + closeBrId + 1);
      objects.push(`${tokens[idx - 2]}: ${sliced.join('')}`);
      idx += closeBrId + 1;
      const filtered = sliced.filter(n => ![':', ',', 'true', 'false', 'null', 'undefined'].includes(n))
      newTokens = newTokens.filter(n => !filtered.includes(n))
    }
    else {
      newTokens.push(tokens[idx]);
    }
  }


  return [
    arrays,
    objects,
    newTokens
  ]


}

//Usage
const jsonString = `{
  "id": "647ceaf3657eade56f8224eb",
  "index": 10,
  "negativeIndex": -10,
  "anEmptyArray": [],
  "notEmptyArray": [1, 2, 3,"string", true, null],
  "boolean": true,
  "nullValue": null,
  "nestedObject": {
      "nestedString": "Hello World",
      "nestedNumber": 42,
      "nestedArray": [true, false]
  },
  "complexArray": [
      {
          "name": "Alice Alice",
          "age": 28,
          "hobbies": ["Reading", "Painting"]
      },
      {
          "name": "Bob Bob",
          "age": 32,
          "hobbies": ["Gaming", "Cooking"]
      }
  ]
}`;
const parsedObject = myJSONParse(jsonString);
console.log(parsedObject);
