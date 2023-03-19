const data = {
    "algorithm": "transport-max",
    "numRows": 3,
    "numColumns": 4,
    "matrix": [
        ["", "1", "2", "3", "4", ""],
        ["a", "3", "2", "8", "9", "6"],
        ["b", "7", "3", "2", "6", "5"],
        ["c", "7", "3", "3", "3", "3"],
        ["", "2", "6", "5", "1", ""]
    ]
};

// Extract data from the object using destructuring assignment
const { algorithm, numRows, numColumns, matrix } = data;

// Create arrays for supply, demand, and cost using Array.from() and arrow functions
const supply = Array.from(matrix.slice(1, numRows + 1), row => parseInt(row[numColumns + 1]));
const demand = Array.from(matrix[numRows + 1].slice(1, numColumns + 1), val => parseInt(val));
const cost = Array.from(matrix.slice(1, numRows + 1), row => Array.from(row.slice(1, numColumns + 1), val => parseInt(val)));

// Create allocation matrix using Array.fill()
const allocationMatrix = Array.from({ length: numRows }, () => Array.from({ length: numColumns }, () => 0));

// Initialize the comparison function
let compareFunc;
// Determine the comparison function based on the algorithm specified in the data object
if (algorithm === "transport-min") {
    compareFunc = (a, b) => a - b;
} else if (algorithm === "transport-max") {
    compareFunc = (a, b) => b - a;
}

// Implement the northwest corner algorithm
let i = 0;
let j = 0;
while (i < numRows && j < numColumns) {
    if (supply[i] < demand[j]) {
        allocationMatrix[i][j] = supply[i];
        demand[j] -= supply[i];
        i++;
    } else {
        allocationMatrix[i][j] = demand[j];
        supply[i] -= demand[j];
        j++;
    }
}

console.log("Allocation matrix:");
console.table(allocationMatrix);




// Print the results
console.log("Allocation matrix:");
console.table(allocationMatrix);
console.log("Total cost:", totalCost);

function swapColumns(arr, c1, c2) {
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i][c1];
        arr[i][c1] = arr[i][c2];
        arr[i][c2] = temp;
    }
}
