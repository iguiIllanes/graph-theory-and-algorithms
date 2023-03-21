// const data = {
//     "algorithm": "transport-max",
//     "numRows": 3,
//     "numColumns": 4,
//     "matrix": [
//         ["", "1", "2", "3", "4", ""],
//         ["a", "3", "2", "8", "9", "6"],
//         ["b", "7", "3", "2", "6", "5"],
//         ["c", "7", "3", "3", "3", "3"],
//         ["", "2", "6", "5", "1", ""]
//     ]
// };

const data = {
    "algorithm": "transport-max",
    "numRows": 3,
    "numColumns": 4,
    "matrix": [
        ["", "1", "2", "3", "4", ""],
        ["a", "3", "2", "6", "8", "6"],
        ["b", "6", "3", "3", "9", "6"],
        ["c", "2", "6", "4", "2", "7"],
        ["", "2", "6", "10", "1", ""]
    ]
};

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
    let totalCost = Infinity;
    let copyAllocationMatrix;
    console.table(cost);
    while (!isOptimal) {
        console.table(allocationMatrix);
        optimalSol = optimalSolution(numRows, numColumns, cost, allocationMatrix);
        isOptimal = optimalSol.isOptimal;
        i = optimalSol.i;
        j = optimalSol.j;
        if (!isOptimal) {
            let path = [];
            let alpha;
            for (let k = 0; k < i.length; k++) {
                allocationMatrix[i[k]][j[k]] = 0;
                console.log(k);
                try {
                    path = getLoopPath(numRows, numColumns, allocationMatrix, i[k], j[k]);
                }
                catch (err) {
                    allocationMatrix[i[k]][j[k]] = null;
                    continue;
                }
                allocationMatrix[i[k]][j[k]] = null;
                // Find the minimum value between the evenly postioned cells in the path
                alpha = Infinity;
                for (let l = 0; l < path.length - 1; l++) {
                    if (l % 2 !== 0) {
                        if (allocationMatrix[path[l][0]][path[l][1]] < alpha) {
                            alpha = allocationMatrix[path[l][0]][path[l][1]];
                        }
                    }
                }
                if (alpha > 0) {
                    break;
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
            // Replace the 0 values with null
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColumns; j++) {
                    if (allocationMatrix[i][j] === 0) {
                        allocationMatrix[i][j] = null;
                    }
                }
            }
            if (totalCost < getTotalCost(cost, allocationMatrix)) {
                break;
            }
            totalCost = getTotalCost(cost, allocationMatrix);
            copyAllocationMatrix = allocationMatrix.map(row => row.map(cell => cell));
            break;

        }
    }
    // Print the allocation matrix
    console.table(copyAllocationMatrix);
    // Calculate the total cost in with the costCopy matrix
    totalCost = getTotalCost(costCopy, copyAllocationMatrix);
    console.log(totalCost);

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
    let values = [];
    let isOptimal = true;
    for (let k = 0; k < numRows; k++) {
        for (let l = 0; l < numColumns; l++) {
            if (cMatrix[k][l] < 0) {
                // we push an array with the value, row and column
                values.push([cMatrix[k][l], k, l]);
                isOptimal = false;
            }
        }
    }
    // sort the min array from the smallest to the largest value, note that the first element is the minimum value
    values.sort((a, b) => a[0] - b[0]);
    // Get the row and column of the minimum value
    let i = [];
    let j = [];
    for (let k = 0; k < values.length; k++) {
        i.push(values[k][1]);
        j.push(values[k][2]);
    }
    console.table(cMatrix);
    console.table(values);
    // If the minimum value is negative, the solution is not optimal
    return {
        isOptimal: isOptimal,
        i: i,
        j: j
    }
}

function getLoopPath(numRows, numColumns, allocationMatrix, i, j) {
    // Create an empty list to store the coordinates of the cells in the path
    const path = [];
    // Start from the pivot cell
    let currentCell = [i, j, ""]
    // Add the current cell to the path
    path.push(currentCell);
    // Create a matrix with falses in order to keep track of the cells that doesn't make a loop
    const visited = Array.from({ length: numRows }, () => Array.from({ length: numColumns }, () => false));
    // Count the not null cells
    const count = allocationMatrix.reduce((accumulator, row) => {
        return accumulator + row.filter(column => column !== null).length;
    }, 0);

    for (let k = 0; k < count; k++) {
        let flag = false;
        let ii = currentCell[0];
        let jj = currentCell[1];
        // Move the cursor from i to 0 (Up)
        for (let k = ii - 1; k >= 0; k--) {
            if (currentCell[2] === "down") break; // Don't go back to the cell from which you came
            if (allocationMatrix[k][jj] !== null && !visited[k][jj]) {
                currentCell = [k, jj, "up"];
                path.push(currentCell);
                flag = true;
                break;
            }
        }
        if (currentCell[0] === i && currentCell[1] === j && path.length > 1) break;
        if (flag) continue;
        // Move the cursor from j to numColumns - 1 (Right)
        for (let k = jj + 1; k < numColumns; k++) {
            if (currentCell[2] === "left") break; // Don't go back to the cell from which you came
            if (allocationMatrix[ii][k] !== null && !visited[ii][k]) {
                currentCell = [ii, k, "right"];
                path.push(currentCell);
                flag = true;
                break;
            }
        }
        if (currentCell[0] === i && currentCell[1] === j && path.length > 1) break;
        if (flag) continue;
        // Move the cursor from i to numRows - 1 (Down)
        for (let k = ii + 1; k < numRows; k++) {
            if (currentCell[2] === "up") break; // Don't go back to the cell from which you came
            if (allocationMatrix[k][jj] !== null && !visited[k][jj]) {
                currentCell = [k, jj, "down"];
                path.push(currentCell);
                flag = true;
                break;
            }
        }
        if (currentCell[0] === i && currentCell[1] === j && path.length > 1) break;
        if (flag) continue;
        // Move the cursor from j to 0 (Left)
        for (let k = jj - 1; k >= 0; k--) {
            if (currentCell[2] === "right") break; // Don't go back to the cell from which you came
            if (allocationMatrix[ii][k] !== null && !visited[ii][k]) {
                currentCell = [ii, k, "left"];
                path.push(currentCell);
                flag = true;
                break;
            }
        }
        if (currentCell[0] === i && currentCell[1] === j && path.length > 1) break;
        if (flag) continue;
        // If we reach this point, then the node is not connected to the pivot cell
        visited[currentCell[0]][currentCell[1]] = true;
        // Remove the last cell from the path
        path.pop();
        // Set the last cell of the path as the current cell
        currentCell = path[path.length - 1];
        k--;
    }
    // If we find two consecutive moves in the same direction, then we have to remove the first one
    for (let k = 0; k < path.length - 1; k++) {
        if (path[k][2] === path[k + 1][2]) {
            path.splice(k, 1);
            k--;
        }
    }
    return path;
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
