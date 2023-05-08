export const dijkstraAlgorithm = (adjacencyMatrix) => {
    const n = adjacencyMatrix.length; // número de nodos
    const distances = new Array(n).fill(Infinity); // distancias desde el nodo inicial
    const visited = new Array(n).fill(false); // nodos visitados
    const previousNodes = new Array(n).fill(null); // nodos previos
  
    distances[0] = 0; // distancia al nodo inicial es 0
  
    for (let i = 0; i < n - 1; i++) {
      // Encuentra el nodo con la distancia mínima no visitada
      const minDistanceNode = findMinDistanceNode(distances, visited);
  
      visited[minDistanceNode] = true; // marca el nodo como visitado
  
      // Actualiza las distancias de los nodos vecinos no visitados
      for (let j = 0; j < n; j++) {
        if (!visited[j] && adjacencyMatrix[minDistanceNode][j] !== 0) {
          const distance = distances[minDistanceNode] + adjacencyMatrix[minDistanceNode][j];
          if (distance < distances[j]) {
            distances[j] = distance;
            previousNodes[j] = minDistanceNode; // guarda el nodo previo
          }
        }
      }
    }
  
    return { distances, previousNodes };
  };
  
  const findMinDistanceNode = (distances, visited) => {
    let minDistance = Infinity;
    let minDistanceNode = -1;
  
    for (let i = 0; i < distances.length; i++) {
      if (!visited[i] && distances[i] < minDistance) {
        minDistance = distances[i];
        minDistanceNode = i;
      }
    }
  
    return minDistanceNode;
  };
  