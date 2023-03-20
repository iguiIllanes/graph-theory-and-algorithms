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

// const data = {
//     "algorithm": "transport-min",
//     "numRows": 4,
//     "numColumns": 4,
//     "matrix": [
//         ["", "1", "2", "3", "4", ""],
//         ["a", "3", "2", "8", "9", "1"],
//         ["b", "7", "3", "2", "6", "8"],
//         ["c", "7", "3", "3", "5", "3"],
//         ["d", "2", "6", "4", "2", "7"],
//         ["", "4", "5", "5", "5", ""]
//     ]
// };

const transportAlgorithm = ({ algorithm, numRows, numColumns, matrix }) => {
    // Create arrays for supply, demand, and cost using Array.from() and arrow functions
    const supply = Array.from(matrix.slice(1, numRows + 1), row => parseInt(row[numColumns + 1]));
    const demand = Array.from(matrix[numRows + 1].slice(1, numColumns + 1), val => parseInt(val));
    const cost = Array.from(matrix.slice(1, numRows + 1), row => Array.from(row.slice(1, numColumns + 1), val => parseInt(val)));

    // Create allocation matrix using Array.fill()
    const allocationMatrix = Array.from({ length: numRows }, () => Array.from({ length: numColumns }, () => null));

    // Ceate a copy of the cost matrix
    const costCopy = cost.map(row => row.slice());

    // Initialize the comparison function
    if (algorithm === "transport-max") {
        // We get the maximum value from the cost matrix
        const max = Math.max(...cost.map(row => Math.max(...row)));
        // Subtract the maximum value from each element in the cost matrix
        cost.forEach(row => row.forEach((val, i) => row[i] = max - val));
    }

    // Verify that the supply and demand arrays are equal
    // if (supply.reduce((a, b) => a + b) !== demand.reduce((a, b) => a + b)) {
    //     // In case the supply is greater than the demand, add a new column of zeros to the cost matrix
    //     if (supply.reduce((a, b) => a + b) > demand.reduce((a, b) => a + b)) {
    //         cost.forEach(row => row.push(0));
    //         demand.push(supply.reduce((a, b) => a + b) - demand.reduce((a, b) => a + b));
    //         allocationMatrix.forEach(row => row.push(null));
    //         numColumns++;
    //     }
    //     // In case the demand is greater than the supply, add a new row of zeros to the cost matrix
    //     else if (supply.reduce((a, b) => a + b) < demand.reduce((a, b) => a + b)) {
    //         cost.push(Array.from({ length: numColumns }, () => 0));
    //         supply.push(demand.reduce((a, b) => a + b) - supply.reduce((a, b) => a + b));
    //         allocationMatrix.push(Array.from({ length: numColumns }, () => null));
    //         numRows++;
    //     }
    // }

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
            // // Move to the next column
            // j++;
        }
    }
    // Let's check if the solution is optimal
    let isOptimal = false;
    let optimalSol;
    let count = 0;
    while (!isOptimal) {
        optimalSol = optimalSolution(numRows, numColumns, cost, allocationMatrix);
        isOptimal = optimalSol.isOptimal;
        i = optimalSol.i;
        j = optimalSol.j;
        if (!isOptimal) {
            // Create an empty list to store the coordinates of the cells in the path
            const path = [];
            // Start from the pivot cell
            let currentCell = [i, j];
            // Add the current cell to the path
            path.push(currentCell);

            // Define a variable to keep track of the direction of movement
            // 0  - horizontal movement
            // 1  - vertical movement
            let direction = 0;
            while (true) {
                // If the direction is vertical
                if (direction === 1) {
                    let flag = false;
                    for (let k = 0; k < numRows; k++) {
                        if (k === i && currentCell[1] === j && path.length > 1) {
                            flag = true;
                            break;
                        }
                        if (allocationMatrix[k][currentCell[1]] !== null && path[path.length - 1][0] !== k) {
                            // if there is only null values in the row, then dont change the current cell
                            currentCell = [k, currentCell[1]];
                            if (k > i) {
                                break;
                            }
                        }
                    }
                    if (flag) {
                        path.push([i, j]);
                    } else {
                        path.push(currentCell);
                    }
                    direction = 0;
                }
                // If the direction is horizontal
                else if (direction === 0) {
                    let flag = false;
                    for (let k = 0; k < numColumns; k++) {
                        if (currentCell[0] === i && k === j && path.length > 1) {
                            flag = true;
                            break;
                        }
                        if (allocationMatrix[currentCell[0]][k] !== null && path[path.length - 1][1] !== k) {
                            currentCell = [currentCell[0], k];
                            if (k > j) {
                                break;
                            }
                        }
                    }
                    if (flag) {
                        path.push([i, j]);
                    }
                    else {
                        path.push(currentCell);
                    }
                    direction = 1;
                }
                if (path[0][0] === path[path.length - 1][0] && path[0][1] === path[path.length - 1][1] && path.length > 1) {
                    break;
                }
            }
            // If we find repeated cells in the path, then delete the repeated cells
            const repeat = [];
            for (let k = 0; k < path.length; k++) {
                for (let l = 0; l < path.length; l++) {
                    if (path[k][0] === path[l][0] && path[k][1] === path[l][1] && k !== l && k !== 0 && l !== 0) {
                        repeat.push(path[k]);
                        break;
                    }
                }
            }
            console.table(path);

            // delete the repeated cells from the path
            for (let k = 0; k < repeat.length; k++) {
                for (let l = 0; l < path.length; l++) {
                    if (repeat[k][0] === path[l][0] && repeat[k][1] === path[l][1]) {
                        path.splice(l, 1);
                        break;
                    }
                }
            }
            console.table(repeat);


            // Find the minimum value between the evenly postioned cells in the path
            let alpha = Infinity;
            for (let k = 0; k < path.length - 1; k++) {
                if (k % 2 !== 0) {
                    if (allocationMatrix[path[k][0]][path[k][1]] < alpha) {
                        alpha = allocationMatrix[path[k][0]][path[k][1]];
                    }
                }
            }
            // We need to balance the solution, so will add alpha to the odd positioned cells and subtract alpha from the even positioned cells
            for (let k = 0; k < path.length - 1; k++) {
                if (k % 2 === 0) {
                    allocationMatrix[path[k][0]][path[k][1]] += alpha;
                } else {
                    allocationMatrix[path[k][0]][path[k][1]] -= alpha;
                }
            }
        }
        // Replace the 0 values with null
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                if (allocationMatrix[i][j] === 0) {
                    allocationMatrix[i][j] = null;
                }
            }
        }
        console.table(allocationMatrix);
        count++;
        if (count === 4) {
            break;
        }
    }

    // console.table(allocationMatrix);
    // // Calculate the total cost
    // const totalCost = getTotalCost(cost, allocationMatrix);
    // console.table(allocationMatrix);
    // console.log(totalCost);

}

function optimalSolution(numRows, numColumns, cost, allocationMatrix) {
    // Let's check this using the MODI method (UV method).
    // We will use two arrays to store the U and V values.
    const u = Array.from({ length: numRows }, () => null);
    const v = Array.from({ length: numColumns }, () => null);
    // We will use a while loop to calculate the U and V values.
    // The loop will continue until all the U and V values are calculated.
    // Initialize the U value with the minimum/maximum cost value in the cost matrix
    u[0] = Math.min(...cost.map(row => Math.min(...row)));
    // We will use a while loop to calculate the U and V values. 
    // The loop will continue until all the U and V values are calculated.
    let k = 0;
    while (u.includes(null) || v.includes(null)) {
        // Loop through the cost matrix
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                // If the current cell is not empty
                if (allocationMatrix[i][j] !== null) {
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
        k++;
        if (u[k] === null) {
            u[k] = u[0];
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
    // Return the position where the minimum value is negative
    let i = [];
    let j = [];
    let min = [];
    for (let k = 0; k < numRows; k++) {
        for (let l = 0; l < numColumns; l++) {
            if (cMatrix[k][l] < 0) {
                i.push(k);
                j.push(l);
                min.push(cMatrix[k][l]);
            }
        }
    }
    i = i[min.indexOf(Math.min(...min))];
    j = j[min.indexOf(Math.min(...min))];

    console.table(cMatrix);

    // If the minimum value is negative, the solution is not optimal
    return {
        isOptimal: i === -1 && j === -1,
        i: i,
        j: j
    }
}

function getTotalCost(cost, allocationMatrix) {
    let totalCost = 0;
    for (let i = 0; i < cost.length; i++) {
        for (let j = 0; j < cost[i].length; j++) {
            totalCost += cost[i][j] * allocationMatrix[i][j];
        }
    }
    return totalCost;
}



transportAlgorithm(data);
