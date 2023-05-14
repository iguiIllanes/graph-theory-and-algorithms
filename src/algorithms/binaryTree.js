export const generateTreeFromList = (list, rootCoordinates) => {
  const coordinates = [];
  const labels = [];
  const parent = [];
  const queue = [...list];
  const root = {
    coordinates: rootCoordinates,
    label: queue.shift(),
    left: null,
    right: null,
    parent: null,
  };
  coordinates.push(rootCoordinates);
  labels.push(root.label);
  parent.push(root.parent);
  while (queue.length > 0) {
    const node = queue.shift();
    let currentNode = root;
    while (true) {
      if (node < currentNode.label) {
        if (currentNode.left === null) {
          currentNode.left = {
            coordinates: [
              currentNode.coordinates[0] - 100,
              currentNode.coordinates[1] + 100,
            ],
            label: node,
            left: null,
            right: null,
            parent: currentNode.label,
          };
          coordinates.push(currentNode.left.coordinates);
          labels.push(currentNode.left.label);
          parent.push(currentNode.left.parent);
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = {
            coordinates: [
              currentNode.coordinates[0] + 100,
              currentNode.coordinates[1] + 100,
            ],
            label: node,
            left: null,
            right: null,
            parent: currentNode.label,
          };
          coordinates.push(currentNode.right.coordinates);
          labels.push(currentNode.right.label);
          parent.push(currentNode.right.parent);
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }
  const binaryTree = [];
  for (let i = 0; i < coordinates.length; i++) {
    binaryTree.push({
      x: coordinates[i][0],
      y: coordinates[i][1],
      label: labels[i],
      parent: parent[i],
    });
  }
  // Si se solapan en el eje x y el eje y, se desplaza el nodo a la derecha
  for (let i = 0; i < binaryTree.length; i++) {
    for (let j = i + 1; j < binaryTree.length; j++) {
      if (
        binaryTree[i].x === binaryTree[j].x &&
        binaryTree[i].y === binaryTree[j].y
      ) {
        binaryTree[j].x += 100;
      }
    }
  }
  console.table(binaryTree);

  return binaryTree;
};

export const generateListFromOrders = (preOrder, inOrder) => {
  const list = [];
  const preOrderQueue = [...preOrder];
  const inOrderQueue = [...inOrder];
  while (preOrderQueue.length > 0) {
    const node = preOrderQueue.shift();
    if (inOrderQueue.includes(node)) {
      list.push(node);
    }
  }
  return list;
};

export const getOrdersFromTree = (tree) => {};
