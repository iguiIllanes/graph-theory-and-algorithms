import React, { useState, useCallback } from "react";

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
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import AdjacencyMatrix from "./AdjacencyMatrix";

import fileService from "./../service/file";

import useFlowStore from "./../store/FlowStore";
import { shallow } from "zustand/shallow";

const bgColor = "#fff";

const nodeTypes = {
  "graph-node-start": GraphNode,
};

const edgeTypes = {
  "graph-edge": GraphEdge,
};

const selector = (state) => ({
  // Persona
  deletePersona: state.deletePersona,
  toggleDeletePersona: state.toggleDeletePersona,

  // adjacency matrix
  adjacencyMatrix: state.adjacencyMatrix,
  setAdjacencyMatrix: state.setAdjacencyMatrix,

  // nodes
  nodes: state.nodes,
  addNode: state.addNode,
  setNodes: state.setNodes,
  onNodesChange: state.onNodesChange,

  // edges
  edges: state.edges,
  setEdges: state.setEdges,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const Flow = () => {
  const {
    deletePersona,
    toggleDeletePersona,
    adjacencyMatrix,
    setAdjacencyMatrix,
    nodes,
    addNode,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useFlowStore(selector, shallow);
  // // adjacency matrix
  // const adjMatrix = useFlowStore((state) => state.adjMatrix);
  // const setAdjMatrix = useFlowStore((state) => state.setAdjMatrix);
  //
  const [showMatrix, setShowMatrix] = useState(false);

  const handleMatrix = () => {
    let matrix = [];
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

    /* 
    
    ALGORITMO de Asignacion 

    */
   // Si cambias los pesos de los nodos se vuelve string, por eso  convierto xd
    matrix = [[7,3,12],[2,4,6],[2,7,4]] 
    let matrixConverted=  matrix.map(innerArr => innerArr.map(Number));
     
    console.log(matrixConverted);

    //Array de valores minimos por columna
    let min= minColumns(matrixConverted);
    console.log('minimos',min);
    //Array de valores maximos por columna
    let max = maxColumns(matrixConverted);
    console.log('maximos',max);
    // Para sacar alpha prima
    let alphaPrime=alphaMatrix(min);
    console.log('alphaprima',alphaPrime);
    
    // comparacion entre la mtariz principal y alpha prima
    let comparacion= restarMatrices(matrixConverted,alphaPrime);
    console.log('matrix - alpha',comparacion);

    // maximos elementos por fila
    let maxfilas= rowElements(comparacion);
    console.log('Beta',maxfilas);

    //minimos elementos por fila
    let minfilas= minrowElements(comparacion);
    console.log('Beta',minfilas);


    //Beta prima
    let betaPrime= betaPrima(minfilas)
    
    ;
    console.log('prime', betaPrime);

    // matrix-alpha-beta
    //que es la matriz a nalizar
    let AAB= restarMatrices(comparacion,betaPrime);
    console.log('MATRIZ A ANALIZAR',AAB);

    // Buscar ceros en la matriz final
    //obtiene un arreglo de pares, cada par es una posicion de ceros
    let ceros = assignInitial(AAB);
    console.log('PosicionesCeros',ceros);

    // obtiene un array de los costos 
    let costo=extractValues(matrixConverted,ceros);
    console.log('costo', costo);

    // suma de todo el costo
    let costotot= sum(costo);
    console.log(costotot);
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

  function alphaMatrix(matrix){
    let alphaPrima=[];
    for(let i=0;i<matrix.length;i++){
      alphaPrima.push(matrix);
    }
    return alphaPrima;
  }


  //restar matrices
  function restarMatrices(matriz1, matriz2) {
    if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
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




  // maximos elementos por fila
  function rowElements(matrix) {
    const maxRow = [];
    for (let i = 0; i < matrix.length; i++) {
      let max = matrix[i][0];  
      for (let j = 1; j < matrix[i].length; j++) {
        if (matrix[i][j] > max) {
          max = matrix[i][j];
        }
      }
      maxRow.push(max);
    }
    return maxRow;
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
        if (matrix[i][j] == 0 && !assignedRows.has(i) && !assignedCols.has(j)) {
          
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

  //costo total xd
  function sum(costo){
    let cost=0;
    //console.log(typeof costo[0]);
    for(let i=0;i<costo.length;i++){
      cost=cost+costo[i];
    }
    return cost
  }

  // TODO: add delete persona
  const handleRemoveElements = () => {
    const newNodes = nodes.slice(0, nodes.length - 1);
    setNodes(newNodes);

    const newEdges = [];
    edges.forEach((edge) => {
      // TODO: wtf is this? there is a better way to do this
      if (
        edge.source === String(nodes.length - 1) ||
        edge.target === String(nodes.length - 1)
      ) {
      } else {
        newEdges.push(edge);
      }
    });
    setEdges(newEdges);
  };

  // uses /service/file.js to upload the graph and set the nodes and edges
  const handleFileUpload = async (event) => {
    await fileService.upload(event).then((response) => {
      setNodes(response.nodes);
      setEdges(response.edges);
      return response;
    });
  };

  return (
    <>
      {showMatrix ? (
        <AdjacencyMatrix nodes={nodes} matrix={adjacencyMatrix} />
      ) : (
        <> </>
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
          nodeStrokeColor={(n) => {
            if (n.type === "input") return "#0f41d0";
            if (n.type === "selectorNode") return bgColor;
            if (n.type === "output") return "#ff0072";
          }}
          nodeColor={(n) => {
            if (n.type === "selectorNode") return bgColor;
            return "#5191df";
          }}
        />
        <Controls>
          <ControlButton onClick={() => window.location.reload(true)}>
            <img
              src={RemoveAllIcon}
              alt="Remove All"
              style={{
                width: "20px",
              }}
            />
          </ControlButton>
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
          <ControlButton
            onClick={() => fileService.download(nodes, edges, "archivo.json")}
          >
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
          <ControlButton
            onClick={() => window.open("/manual.pdf")}
            style={{ color: "#000" }}
          >
            ?
          </ControlButton>
        </Controls>
      </ReactFlow>
    </>
  );
};

export default Flow;
