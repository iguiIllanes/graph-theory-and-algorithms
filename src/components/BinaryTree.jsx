import React, { useState } from "react";

import ReactFlow, { MiniMap, Controls, ControlButton } from "reactflow";

import RemoveAllIcon from "/icons/removeAll.png";
import TreeIcon from "/icons/tree.png";
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";
import ModeIcon from "/icons/mode.png";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import MiniMapNode from "./MiniMapNode";

import fileService from "../service/file";

import useFlowStore from "../store/FlowStore";
import { shallow } from "zustand/shallow";
import {
  generateTreeFromList,
  generateTreeFromOrders,
  getOrdersFromTree,
} from "../algorithms/binaryTree";
import "../styles/BinaryTree.css";

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

const BinaryTree = () => {
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useFlowStore(selector, shallow);

  const [listModeActive, setListModeActive] = useState(false);
  const [list, setList] = useState([]);
  const [listText, setListText] = useState("");
  const [preOrder, setPreOrder] = useState([]);
  const [preOrderText, setPreOrderText] = useState("");
  const [postOrder, setPostOrder] = useState([]);
  const [postOrderText, setPostOrderText] = useState("");

  // uses /service/file.js to upload the graph and set the nodes and edges
  const handleFileUpload = async (event) => {
    await fileService.upload(event).then((response) => {
      setNodes(response.nodes);
      setEdges(response.edges);
      return response;
    });
  };

  const handleFileDownload = () => {
    const fileName = prompt("Introduzca el nombre del archivo");
    if (fileName === null) return;
    fileService.download(nodes, edges, `${fileName}.json`);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setList([]);
  };

  const handleTextChange = (e) => {
    setListText(e.target.value);
  };

  const handleModeChange = () => {
    setListModeActive(!listModeActive);
  };

  const showOrder = () => {
    if (nodes.length === 0) {
      alert("Porfavor genere un arbol primero");
      return;
    }
  };

  const showTreeFromList = () => {
    if (listText === "" || listText === null) {
      alert("Porfavor ingrese un valor valido");
      return;
    }
    const arrayFromText = listText.split(",").map(Number); // Convertir texto a arreglo
    // Verify that all values are numbers
    if (arrayFromText.some(isNaN)) {
      alert("Porfavor ingrese un valor valido");
      return;
    }
    // Verify that there are not repeated values in the array
    if (new Set(arrayFromText).size !== arrayFromText.length) {
      alert("No se permiten valores repetidos");
      return;
    }
    // Verify that there are no repeated values in the list
    if (list.some((value) => arrayFromText.includes(value))) {
      alert("No se permiten valores repetidos");
      return;
    }
    setList([...list, ...arrayFromText]);
    setListText("");
    console.log([...list, ...arrayFromText]);
  };
  const showTreeFromOrders = () => {};

  return (
    <div
      style={{
        //give 80% height
        height: "100vh",
      }}
    >
      {!listModeActive ? (
        <div className="input-container">
          <label>Ingrese uno o mas datos del arbol</label>
          <input
            type="text"
            placeholder="Ej: 9, 2, 1, 16, 6, 11, 8, 4"
            onChange={handleTextChange}
            value={listText}
          />
          <button onClick={showTreeFromList}>Agregar - Generar arbol</button>
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
          <ControlButton onClick={showOrder}>
            <img
              src={TreeIcon}
              alt="A"
              style={{
                width: "20px",
              }}
            />
          </ControlButton>
          <ControlButton onClick={handleModeChange}>
            <img
              src={ModeIcon}
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

export default BinaryTree;
