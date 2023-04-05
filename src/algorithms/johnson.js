export const johnsonAlgorithm = (adjacencyMatrix) => {
    // Delete the first row  and column of the adjacency matrix
    let matrix = adjacencyMatrix.slice(1).map((row) => row.slice(1));
    // Find the sums of all columns
    const sumColumns = matrix.reduce((acc, row) => {
        row.forEach((element, index) => {
            acc[index] += element;
        });
        return acc;
    }, new Array(matrix.length).fill(0));
    // Find the index of the column equal to 0
    const columnIndex = sumColumns.findIndex((sum) => sum === 0);

    // Swap the column with the first column
    adjacencyMatrix = adjacencyMatrix.map((row) => {
        const temp = row[1];
        row[1] = row[columnIndex + 1];
        row[columnIndex + 1] = temp;
        return row;
    });
    // Swap the row with the first row
    const temp1 = adjacencyMatrix[1];
    adjacencyMatrix[1] = adjacencyMatrix[columnIndex + 1];
    adjacencyMatrix[columnIndex + 1] = temp1;


    // Find the row with all elements equal to 0
    const rowIndex = matrix.findIndex((row) => row.every((element) => element === 0));
    // Swap the column with the last column
    adjacencyMatrix = adjacencyMatrix.map((row) => {
        const temp = row[row.length - 1];
        row[row.length - 1] = row[rowIndex + 1];
        row[rowIndex + 1] = temp;
        return row;
    });
    // Swap the row with the last row
    const temp2 = adjacencyMatrix[adjacencyMatrix.length - 1];
    adjacencyMatrix[adjacencyMatrix.length - 1] = adjacencyMatrix[rowIndex + 1];
    adjacencyMatrix[rowIndex + 1] = temp2;

    // We need to order the rest of the matrix


    // Replace matrix with the adjacency matrix
    matrix = adjacencyMatrix.slice(1).map((row) => row.slice(1));


    const n = matrix.length; // number of nodes
    const earlyTimes = new Array(n).fill(0); // early times
    const lateTimes = new Array(n).fill(0); // late times
    const slacks = new Array(n).fill(null).map(() => new Array(n).fill(null)); // slacks

    // Calculate early times
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] !== 0) {
                earlyTimes[j] = Math.max(earlyTimes[j], earlyTimes[i] + matrix[i][j]);
            }
        }
    }

    // Calculate late times
    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (matrix[i][j] !== 0) {
                if (lateTimes[j] === 0) {
                    lateTimes[j] = earlyTimes[j];
                }
                lateTimes[i] = Math.min(lateTimes[i] === 0 ? lateTimes[j] - matrix[i][j] : lateTimes[i], lateTimes[j] - matrix[i][j]);
            }
        }
    }

    // Calculate slacks
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] !== 0) {
                slacks[i][j] = lateTimes[j] - earlyTimes[i] - matrix[i][j];
            }
        }
    }
    console.table(slacks);
    console.table(earlyTimes);
    console.table(lateTimes);

    // Return slacks and times as a matrix and vectors, respectively
    return { slacks, earlyTimes, lateTimes };
}
