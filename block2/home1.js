const { performance } = require('perf_hooks');

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

function bubbleSort(arr) {
    const length = arr.length;

    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function generateRandomArray(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

function measureTime(sortFn, arr) {
    const start = performance.now();
    sortFn(arr);
    const end = performance.now();
    return end - start;
}

function runSortingTests(arrays) {
    console.log("Results for Sorting Algorithm Performance Analysis");
    console.log("Array Length | QuickSort Time | BubbleSort Time | Merge Sort Time");


    arrays.map((array, idx) => {
        const quickSortAvgTime = measureTime(quickSort, array);
        const bubbleSortAvgTime = measureTime(bubbleSort, array);
        const mergeSortAvgTime = measureTime(mergeSort, array);

        console.log(
            `${idx} (${array.length})     | ${quickSortAvgTime.toFixed(3)} ms       | ${bubbleSortAvgTime.toFixed(3)} ms       | ${mergeSortAvgTime.toFixed(3)} ms`
        );
    })

}

const array4Test10 = Array.from({length: 10}, (_, index) => index + 1);
const array4Test100 = Array.from({length: 100}, (_, index) => index + 1);
const array4Test500 = Array.from({length: 500}, (_, index) => index + 1);
const array4Test1000 = Array.from({length: 1000}, (_, index) => index + 1);

const arrays = [
    array4Test10,
    array4Test10.reverse(),
    generateRandomArray(10),
    array4Test100,
    array4Test100.reverse(),
    generateRandomArray(100),
    array4Test500,
    array4Test500.reverse(),
    generateRandomArray(500),
    array4Test1000,
    array4Test1000.reverse(),
    generateRandomArray(1000),
];

runSortingTests(arrays);