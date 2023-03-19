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
    // Let's check this using the MODI method (UV method).
    // We will use two arrays to store the U and V values.

    const u = Array.from({ length: numRows }, () => null);
    const v = Array.from({ length: numColumns }, () => null);

    // We will use a while loop to calculate the U and V values.
    // The loop will continue until all the U and V values are calculated.

    // Initialize the U value with the minimum/maximum cost value in the cost matrix
    u[0] = cost.reduce((a, b) => a.concat(b)).sort(compareFunc)[0];

    // We will use a while loop to calculate the U and V values. 
    // The rule is that (U[i] + V[j]) should be equal to the cost at the current cell.
    // The loop will continue until all the U and V values are calculated.
    console.log(cost);
    while (u.includes(null) || v.includes(null)) {
        // Loop through the cost matrix
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                // If the current cell is not empty
                if (allocationMatrix[i][j] !== 0) {
                    console.log(cost[i][j]);
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
                console.log(u);
                console.log(v);
            }
        }
    }


    // console.log(u);
    // console.log(v);
}


transportAlgorithm(data);