const customFilterUnique = (array, predicate=(a, b)=>{}) => {
  const uniqueArray = array.filter((element, index, self) =>
    self.findIndex(item => predicate(element)(item)) === index
  );
  return uniqueArray;
};

const chunkArray = (array, chunkSize) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

const customShuffle = (array) => {
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const temp = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temp;
  }
  return shuffledArray;
};

const getArrayIntersection = (array1, array2) => {
  return array1.filter(element => array2.includes(element));
};


const getArrayUnion = (array1, array2) => {
  return [...new Set([...array1, ...array2])];
};

const measureArrayPerformance = (fn, arr) => {
  const start = performance.now();
  fn(arr);
  const end = performance.now();
  return end - start;
};

//output

//1
const objects = [
  { id: 1, name: 'Object 1' },
  { id: 2, name: 'Object 2' },
  { id: 3, name: 'Object 3' },
  { id: 1, name: 'Object 1' },
];

const predicate = (element) => (item) => item.id === element.id;

const filteredObjects = customFilterUnique(objects, predicate);
console.log(filteredObjects);

//2
const array = [1, 2, 3, 4, 5];
const chunkSize1 = 2;
const expectedOutput1 = [[1, 2], [3, 4], [5]];

console.log('chunkArray', chunkArray(array, chunkSize1).reduce((a, b) => a + '\n' + b, ''));


//3
const shuffledArray = customShuffle(array);
console.log(shuffledArray);
//4
console.log(getArrayIntersection([1, 2, 3], [2, 3, 4]));
console.log(getArrayUnion([1, 2, 3], [2, 3, 4]));
//5
const mapPerformance = measureArrayPerformance(array => array.map(element => element * 2), array);
console.log(`Map performance: ${mapPerformance} milliseconds`);

const customFilterUniquePerformance = measureArrayPerformance(customFilterUnique, array);
console.log(`Custom filter unique performance: ${customFilterUniquePerformance} milliseconds`);
