import React, { useState, useCallback, useEffect } from "react";

import ReactFlow, {
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
  ControlButton,
} from "reactflow";

import RemoveAllIcon from "/icons/removeAll.png";
import CreateNodeIcon from "/icons/createNode.png";
import RemoveNodeIcon from "/icons/removeNode.png";
import ShowAdjacencyMatrixIcon from "/icons/showMatrix.png";
import HideAdjacencyMatrixIcon from "/icons/hideMatrix.png";
import JonsonIcon from "/icons/cpm.png";
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";
import CriticPathIcon from "/icons/johnson.jpeg";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import MiniMapNode from "./MiniMapNode";
import AdjacencyMatrix from "./AdjacencyMatrix";

import fileService from "./../service/file";

import useFlowStore from "./../store/FlowStore";
import { shallow } from "zustand/shallow";

import Modal from "./Modal";
import { dijkstraAlgorithm } from "../algorithms/dijkstra";

const bgColor = "#fff";

const nodeTypes = {
  "graph-node-start": GraphNode,
};

const edgeTypes = {
  "graph-edge": GraphEdge,
};
/* Set state modal */
//const [isModalOpen, setIsModalOpen] = useState(false);

const selector = (state) => ({
  // Persona
  deletePersona: state.deletePersona,
  toggleDeletePersona: state.toggleDeletePersona,

  // adjacency matrix
  adjacencyMatrix: state.adjacencyMatrix,
  setAdjacencyMatrix: state.setAdjacencyMatrix,

  //assignation matrix
  assignationMatrix: state.assignationMatrix,
  setAssignationMatrix: state.setAssignationMatrix,

  //Positions matrix
  posMatrix: state.posMatrix,
  setPosMatrix: state.setPosMatrix,

  //costo total
  totalCost: state.totalCost,
  setTotalCost: state.setTotalCost,

  // nodes
  nodes: state.nodes,
  addNode: state.addNode,
  setNodes: state.setNodes,
  onNodesChange: state.onNodesChange,
  setWeight: state.setWeight,

  // edges
  edges: state.edges,
  setEdges: state.setEdges,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const Dijkstra = () => {
  const {
    deletePersona,
    toggleDeletePersona,
    adjacencyMatrix,
    setAdjacencyMatrix,
    assignationMatrix,
    setAssignationMatrix,
    posMatrix,
    setPosMatrix,
    totalCost,
    setTotalCost,
    nodes,
    addNode,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setWeight,
  } = useFlowStore(selector, shallow);
  // // adjacency matrix
  // const adjMatrix = useFlowStore((state) => state.adjMatrix);
  // const setAdjMatrix = useFlowStore((state) => state.setAdjMatrix);
  //
  const [showMatrix, setShowMatrix] = useState(false);
  const [DijkstraRef, setDijktraref] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //Matriz de adyancecia
  const handleCloseModal = () => {
    setShowModal(false);
    setShowMatrix(false);
  };

  const handleMatrix = () => {
    const matrix = [];
    // fill matrix with zeros
    for (let i = 0; i < nodes.length; i++) {
      matrix[i] = new Array(nodes.length).fill(0);
    }

    edges.forEach((edge) => {
      matrix[edge.source][edge.target] =
        typeof edge.data.weight === "undefined" ? 1 : edge.data.weight;
    });
    console.log("matrix", matrix);
    setAdjacencyMatrix(matrix);

    // hide/show matrix
    setShowMatrix(!showMatrix);
    setShowModal(!showModal);
    console.log("showMatrix", showMatrix);

    //handleAssignation();

    /* 
    
    ALGORITMO de Asignacion 
 
    */
    // Si cambias los pesos de los nodos se vuelve string, por eso  convierto xd
    // matrix = [[7, 3, 12], [2, 4, 6], [2, 7, 4]];
    let matrixConverted = matrix.map((innerArr) => innerArr.map(Number));

    console.log(matrixConverted);

    //Array de valores minimos por columna
    let min = minColumns(matrixConverted);
    console.log("minimos", min);
    //Array de valores maximos por columna
    let max = maxColumns(matrixConverted);
    console.log("maximos", max);
    // Para sacar alpha prima
    let alphaPrime = alphaMatrix(min);
    console.log("alphaprima", alphaPrime);

    // comparacion entre la mtariz principal y alpha prima
    let comparacion = restarMatrices(matrixConverted, alphaPrime);
    console.log("matrix - alpha", comparacion);

    /* maximos elementos por fila
    let maxfilas= rowElements(comparacion);
    console.log('Beta máximos',maxfilas); */

    //minimos elementos por fila
    let minfilas = minrowElements(comparacion);
    console.log("Beta", minfilas);

    //Beta prima
    let betaPrime = betaPrima(minfilas);
    console.log("prime", betaPrime);

    // matrix-alpha-beta
    //que es la matriz a analizar
    let AAB = restarMatrices(comparacion, betaPrime);
    console.log("MATRIZ A ANALIZAR", AAB);
  };


  //minimos de cada columna
  function minColumns(matrix) {
    const minCol = [];
    for (let i = 0; i < matrix[0].length; i++) {
      let min = matrix[0][i];
      for (let j = 1; j < matrix.length; j++) {
        if (matrix[j][i] < min) {
          min = matrix[j][i];
        }
      }
      minCol.push(min);
    }
    return minCol;
  }

  //maximos de cada columna xd
  function maxColumns(matrix) {
    let max = new Array(matrix[0].length).fill(0);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] > max[j]) {
          max[j] = matrix[i][j];
        }
      }
    }
    return max;
  }

  // alpha prima

  function alphaMatrix(matrix) {
    let alphaPrima = [];
    for (let i = 0; i < matrix.length; i++) {
      alphaPrima.push(matrix);
    }
    return alphaPrima;
  }

  //restar matrices
  function restarMatrices(matriz1, matriz2) {
    if (
      matriz1.length !== matriz2.length ||
      matriz1[0].length !== matriz2[0].length
    ) {
      return null;
    }
    const resultado = [];
    for (let i = 0; i < matriz1.length; i++) {
      resultado.push(new Array(matriz1[0].length));
    }
    for (let i = 0; i < matriz1.length; i++) {
      for (let j = 0; j < matriz1[0].length; j++) {
        resultado[i][j] = matriz1[i][j] - matriz2[i][j];
      }
    }
    return resultado;
  }

  // minimos elementos por fila
  function minrowElements(matrix) {
    const minRow = [];
    for (let i = 0; i < matrix.length; i++) {
      let min = matrix[i][0];
      for (let j = 1; j < matrix[i].length; j++) {
        if (matrix[i][j] < min) {
          min = matrix[i][j];
        }
      }
      minRow.push(min);
    }
    return minRow;
  }

  // BETA PRIMA

  function betaPrima(lista) {
    const resultado = [];
    for (let i = 0; i < lista.length; i++) {
      let columna = [];
      for (let j = 0; j < lista.length; j++) {
        if (j === 1) {
          columna.push(lista[i]);
        } else {
          columna.push(0);
        }
      }
      resultado.push(columna);
    }
    return resultado;
  }

  // encontrar 0 que dan solucion

  function assignInitial(matrix) {
    let assignments = [];
    let rows = matrix.length;
    let cols = matrix[0].length;

    let assignedRows = new Set();
    let assignedCols = new Set();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] == 1 && !assignedRows.has(i) && !assignedCols.has(j)) {
          let rowSum = matrix[i].reduce((acc, val) => acc + val, 0);
          let colSum = 0;
          for (let k = 0; k < rows; k++) {
            colSum += matrix[k][j];
          }
          assignments.push([i, j]);
          assignedRows.add(i);
          assignedCols.add(j);
        }
      }
    }

    return assignments;
  }

  //extrae los valores de los 0
  function extractValues(matrix, positions) {
    let values = [];

    for (let i = 0; i < positions.length; i++) {
      let row = positions[i][0];
      let col = positions[i][1];

      let value = matrix[row][col];
      values.push(value);
    }

    return values;
  }




  // uses /service/file.js to upload the graph and set the nodes and edges
  const handleFileUpload = async (event) => {
    await fileService.upload(event).then((response) => {
      setNodes(response.nodes);
      setEdges(response.edges);
      let showJohnson = false;
      for (let i = 0; i < response.nodes.length; i++) {
        console.log(response.nodes[i].data.earlyTime);
        if (response.nodes[i].data.earlyTime != null) {
          showJohnson = true;
          break;
        }
      }

      //setJohnsonRef(showJohnson);
      return response;
    });
  };

  const handleFileDownload = () => {
    const fileName = prompt("Introduzca el nombre del archivo");
    if (fileName === null) return;
    console.log(fileName);
    // fileService.download(nodes, edges, `${fileName}.json`);
    fileService.downloadApi(nodes, edges, `${fileName}.json`);
  };

  const handleDijkstra = () => {
    if (nodes.length === 0 || edges.length === 0) {
      alert("No hay nodos o aristas");
      return;
    }
  
    // Construir matriz de adyacencia
    const matrix = new Array(nodes.length)
      .fill(0)
      .map(() => new Array(nodes.length).fill(0));
  
    const sortedNodes = nodes.sort((a, b) => a.position.x - b.position.x);
  
    const sortedEdges = edges.sort((a, b) => {
      const sourceNodeA = nodes.find(node => node.id === a.source);
      const sourceNodeB = nodes.find(node => node.id === b.source);
      return sourceNodeA.position.x - sourceNodeB.position.x;
    });
  
    sortedEdges.forEach((edge) => {
      const sourceIndex = sortedNodes.indexOf(nodes.find(node => node.id === edge.source));
      const targetIndex = sortedNodes.indexOf(nodes.find(node => node.id === edge.target));
      matrix[sourceIndex][targetIndex] =
        typeof edge.data.weight === "undefined"
          ? 1
          : parseInt(edge.data.weight);
    });
  
    // Aplicar el algoritmo de Dijkstra
    const { distances, previousNodes } = dijkstraAlgorithm(matrix);
  
    // Construir las aristas óptimas
    const optimalEdges = [];
    for (let i = 0; i < previousNodes.length; i++) {
      if (previousNodes[i] !== null) {
        const sourceIndex = previousNodes[i];
        const targetIndex = i;
        const sourceNode = sortedNodes[sourceIndex];
        const targetNode = sortedNodes[targetIndex];
        const edge = sortedEdges.find(edge =>
          edge.source === sourceNode.id && edge.target === targetNode.id
        );
        if (edge) {
          optimalEdges.push(edge);
        }
      }
    }
  
    console.log("Aristas óptimas:", optimalEdges);
  
    // Actualizar el estado de las aristas si es necesario
    setEdges(optimalEdges);
  
    // Actualizar el estado de los nodos con las distancias óptimas
    const newNodes = sortedNodes.map((node, index) => {
      return {
        ...node,
        data: {
          ...node.data,
          distance: distances[index]
        }
      };
    });
    setNodes(newNodes);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    //setJohnsonRef(false);
  }

  return (
    <div style={{ //give 80% height 
      height: "100vh"
    }}>
      {showMatrix ? (
        <div >
          <Modal
            title={`Matriz de Adyacencia`}
            content={<AdjacencyMatrix nodes={nodes} matrix={adjacencyMatrix} />}
            show={showModal}
            onClose={handleCloseModal}
          ></Modal>
        </div>
      ) : (
        <></>
      )}



      <input
        id="file-input"
        type="file"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: bgColor }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineType="straight"
        connectionLineStyle={{ stroke: "#342e37", strokeWidth: 2 }}
        connectionMode="loose"
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap
          nodeColor="#5e90e1"
          nodeStrokeWidth={3}
          nodeComponent={MiniMapNode}
          zoomable
          pannable
        />
        <Controls>
          <ControlButton onClick={addNode}>
            <img
              src={CreateNodeIcon}
              alt="A"
              style={{
                width: "20px",
                hover: "pointer",
              }}
            />
          </ControlButton>
          <ControlButton
            onClick={toggleDeletePersona}
            style={{ backgroundColor: deletePersona ? "#ff0000" : "#fff" }}
          >
            <img
              src={RemoveNodeIcon}
              alt="A"
              style={{
                width: "20px",
              }}
            />
          </ControlButton>
          <ControlButton onClick={handleMatrix}>
            <img
              src={
                showMatrix ? HideAdjacencyMatrixIcon : ShowAdjacencyMatrixIcon
              }
              alt="A"
              style={{
                width: "20px",
              }}
            />
          </ControlButton>
          <ControlButton onClick={handleDijkstra}>
            <img
              src={JonsonIcon}
              alt="A"
              style={{
                width: "20px",
              }}
            />
          </ControlButton>

          <ControlButton onClick={handleFileDownload}>
            <img
              src={DownloadIcon}
              alt="A"
              style={{
                width: "20px",
              }}
            />
          </ControlButton>
          <ControlButton
            onClick={() => document.getElementById("file-input").click()}
          >
            <img
              src={UploadIcon}
              alt="A"
              style={{
                width: "20px",
              }}
            />
          </ControlButton>
          <ControlButton onClick={handleClear}>
            <img
              src={RemoveAllIcon}
              alt="Remove All"
              style={{
                width: "20px",
              }}
            />
          </ControlButton>
          <ControlButton
            onClick={() =>
              window.open(
                "https://docs.google.com/document/u/0/d/19a-S0iG242SVOKOlIre3ltMluHy514fI3p2VMhAvp9w/edit?pli=1",
                "_blank"
              )
            }
            style={{ color: "#000" }}
          >
            ?
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
};

export default Dijkstra;
