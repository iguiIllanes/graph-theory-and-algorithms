import munkres from "munkres-js";

function assignWithMunkres(matrix) {
  // Copiamos la matriz original para no modificarla
  const matrixCopy = matrix.map((row) => row.slice());

  // Convertimos la matriz de costos a una matriz de ganancias
  const max = Math.max(...matrixCopy.flat()) + 1;
  for (let i = 0; i < matrixCopy.length; i++) {
    for (let j = 0; j < matrixCopy[i].length; j++) {
      matrixCopy[i][j] = max - matrixCopy[i][j];
    }
  }

  // Obtenemos la matriz de asignación
  const assignments = munkres(matrixCopy);

  // Creamos la matriz de asignaciones
  const n = matrixCopy.length;
  const assignedMatrix = new Array(n).fill(0).map(() => new Array(n).fill(0));

  // Iteramos sobre las asignaciones para obtener la matriz asignada y las posiciones de los elementos
  const positions = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < assignments.length; i++) {
    const [row, col] = assignments[i];
    assignedMatrix[row][col] = 1;
    positions[row][col] = 1;
  }

  // Creamos la matriz de posiciones de los elementos
  const originalPositions = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (positions[i][j] === 1) {
        originalPositions[i][j] = 1;
      } else {
        originalPositions[i][j] = 0;
      }
    }
  }

  return originalPositions;
}

export default assignWithMunkres;
