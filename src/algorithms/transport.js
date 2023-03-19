const data = {
    "algorithm": "transport-min",
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

// const data = {
//     "algorithm": "transport-min",
//     "numRows": 3,
//     "numColumns": 4,
//     "matrix": [
//         ["", "1", "2", "3", "4", ""],
//         ["a", "3", "2", "6", "8", "6"],
//         ["b", "6", "3", "3", "9", "6"],
//         ["c", "2", "6", "4", "2", "7"],
//         ["", "2", "6", "10", "1", ""]
//     ]
// };
const transportAlgorithm = ({ algorithm, numRows, numColumns, matrix }) => {
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
    // Verify that the supply and demand arrays are equal
    if (supply.reduce((a, b) => a + b) !== demand.reduce((a, b) => a + b)) {
        // In case the supply is greater than the demand, add a new column of zeros to the cost matrix
        if (supply.reduce((a, b) => a + b) > demand.reduce((a, b) => a + b)) {
            cost.forEach(row => row.push(0));
            demand.push(supply.reduce((a, b) => a + b) - demand.reduce((a, b) => a + b));
            allocationMatrix.forEach(row => row.push(0));
            numColumns++;
        }
        // In case the demand is greater than the supply, add a new row of zeros to the cost matrix
        else if (supply.reduce((a, b) => a + b) < demand.reduce((a, b) => a + b)) {
            cost.push(Array.from({ length: numColumns }, () => 0));
            supply.push(demand.reduce((a, b) => a + b) - supply.reduce((a, b) => a + b));
            allocationMatrix.push(Array.from({ length: numColumns }, () => 0));
            numRows++;
        }
    }

    // We will start filling the allocation matrix from the upper left corner and gradually move to the lower right corner.
    // We will use two variables to keep track of the current row and column.
    let i = 0; // current row
    let j = 0; // current column

    // We will use a while loop to fill the allocation matrix.
    // The loop will continue until all the supply and demand values are zero.
    while (supply.reduce((a, b) => a + b) !== 0 && demand.reduce((a, b) => a + b) !== 0) {
        // If the supply at the current row is greater than the demand at the current column
        if (supply[i] > demand[j]) {
            // Allocate the demand at the current column to the current cell
            allocationMatrix[i][j] = demand[j];
            // Subtract the demand at the current column from the supply at the current row
            supply[i] -= demand[j];
            // Set the demand at the current column to zero
            demand[j] = 0;
            // Move to the next column
            j++;
        }
        // If the supply at the current row is less than the demand at the current column
        else if (supply[i] < demand[j]) {
            // Allocate the supply at the current row to the current cell
            allocationMatrix[i][j] = supply[i];
            // Subtract the supply at the current row from the demand at the current column
            demand[j] -= supply[i];
            // Set the supply at the current row to zero
            supply[i] = 0;
            // Move to the next row
            i++;
        }
        // If the supply at the current row is equal to the demand at the current column
        else if (supply[i] === demand[j]) {
            // Allocate the supply at the current row to the current cell
            allocationMatrix[i][j] = supply[i];
            // Set the supply at the current row to zero
            supply[i] = 0;
            // Set the demand at the current column to zero
            demand[j] = 0;
            // Move to the next row
            i++;
            // Move to the next column
            j++;
        }
    }
    // Let's check if the solution is optimal
    let isOptimal = false;
    // while (!optimal) {
    let optimalSol = optimalSolution(numRows, numColumns, cost, allocationMatrix, compareFunc);
    isOptimal = optimalSol.isOptimal;
    i = optimalSol.i;
    j = optimalSol.j;
    if (!isOptimal) {
        // Balance the solution, we move the cursor (i, j) vertically and horizontally and if allocationMatrix[i][j] is not zero
        const balance = [];
        // we add the cost of the cell to the balance array 
        // Move the cursor from i to 0 
        for (let k = i; k >= 0; k--) {
            if (allocationMatrix[k][j] !== 0) {
                balance.push(allocationMatrix[k][j]);
                break;
            }
        }
        // Move the cursor from i to numRows - 1
        for (let k = i + 1; k < numRows; k++) {
            if (allocationMatrix[k][j] !== 0) {
                balance.push(allocationMatrix[k][j]);
                break;
            }
        }
        // Move the cursor from j to 0
        for (let k = j; k >= 0; k--) {
            if (allocationMatrix[i][k] !== 0) {
                balance.push(allocationMatrix[i][k]);
                break;
            }
        }
        // Move the cursor from j to numColumns - 1
        for (let k = j + 1; k < numColumns; k++) {
            if (allocationMatrix[i][k] !== 0) {
                balance.push(allocationMatrix[i][k]);
                break;
            }
        }
        const alpha = Math.min(...balance);
        allocationMatrix[i][j] = alpha;
        // We need to balance the solution 
        let op = "sub"
        const ii = i;
        const jj = j;
        do {
            // Move the cursor from i to 0 (Up)
            for (let k = i - 1; k >= 0; k--) {
                if (i === ii && j === jj && k === 0) break;
                if (allocationMatrix[k][j] !== 0) {
                    allocationMatrix[k][j] = op === "sub" ? allocationMatrix[k][j] - alpha : allocationMatrix[k][j] + alpha;
                    op = op === "sub" ? "add" : "sub";
                    i = k;
                    break;
                }
            }
            // Move the cursor from j to numColumns - 1 (Right)
            for (let k = j + 1; k < numColumns; k++) {
                if (i === ii && j === jj && k === numColumns - 1) break;
                if (allocationMatrix[i][k] !== 0) {
                    allocationMatrix[i][k] = op === "sub" ? allocationMatrix[i][k] - alpha : allocationMatrix[i][k] + alpha;
                    op = op === "sub" ? "add" : "sub";
                    j = k;
                    break;
                }
            }
            // Move the cursor from i to numRows - 1 (Down)
            for (let k = i + 1; k < numRows; k++) {
                if (i === ii && j === jj && k === numRows - 1) break;
                if (allocationMatrix[k][j] !== 0) {
                    allocationMatrix[k][j] = op === "sub" ? allocationMatrix[k][j] - alpha : allocationMatrix[k][j] + alpha;
                    op = op === "sub" ? "add" : "sub";
                    i = k;
                    break;
                }
            }
            // Move the cursor from j to 0 (Left)
            for (let k = j - 1; k >= 0; k--) {
                if (i === ii && j === jj && k === 0) break;
                if (allocationMatrix[i][k] !== 0) {
                    allocationMatrix[i][k] = op === "sub" ? allocationMatrix[i][k] - alpha : allocationMatrix[i][k] + alpha;
                    op = op === "sub" ? "add" : "sub";
                    j = k;
                    break;
                }
            }
        }
        while (ii !== i || jj !== j);
        console.log(allocationMatrix);
    }

    // }
}

function optimalSolution(numRows, numColumns, cost, allocationMatrix, compareFunc) {
    // Let's check this using the MODI method (UV method).
    // We will use two arrays to store the U and V values.
    const u = Array.from({ length: numRows }, () => null);
    const v = Array.from({ length: numColumns }, () => null);
    // We will use a while loop to calculate the U and V values.
    // The loop will continue until all the U and V values are calculated.
    // Initialize the U value with the minimum/maximum cost value in the cost matrix
    u[0] = cost.reduce((a, b) => a.concat(b)).sort(compareFunc)[0];
    // We will use a while loop to calculate the U and V values. 
    // The loop will continue until all the U and V values are calculated.
    while (u.includes(null) || v.includes(null)) {
        // Loop through the cost matrix
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                // If the current cell is not empty
                if (allocationMatrix[i][j] !== 0) {
                    // If the U value at the current row is not null
                    if (u[i] !== null) {
                        // If the V value at the current column is null
                        if (v[j] === null) {
                            // Calculate the V value at the current column
                            v[j] = cost[i][j] - u[i];
                        }
                    }
                    // If the V value at the current column is not null
                    else if (v[j] !== null) {
                        // If the U value at the current row is null
                        if (u[i] === null) {
                            // Calculate the U value at the current row
                            u[i] = cost[i][j] - v[j];
                        }
                    }
                }
            }
        }
    }
    // Create a new matrix that follows the rules of the MODI method
    const cMatrix = Array.from({ length: numRows }, () => Array.from({ length: numColumns }, () => null));
    // Loop through the cost matrix
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            cMatrix[i][j] = u[i] + v[j];
        }
    }
    // Subtract the cost matrix from the MODI matrix
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            cMatrix[i][j] = cost[i][j] - cMatrix[i][j];
        }
    }
    // Return the position where the minimum/maximum value is negative
    let i = -1;
    let j = -1;
    for (let k = 0; k < numRows; k++) {
        for (let l = 0; l < numColumns; l++) {
            if (cMatrix[k][l] < 0) {
                i = k;
                j = l;
            }
        }
    }
    // If the minimum/maximum value is negative, the solution is not optimal
    return {
        isOptimal: i === -1 && j === -1,
        i: i,
        j: j
    }
}



transportAlgorithm(data);