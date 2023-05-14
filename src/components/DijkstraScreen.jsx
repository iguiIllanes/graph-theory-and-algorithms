import React from "react";

import ReactFlow, { MiniMap, Controls, ControlButton } from "reactflow";

import RemoveAllIcon from "/icons/removeAll.png";
import CreateNodeIcon from "/icons/createNode.png";
import RemoveNodeIcon from "/icons/removeNode.png";
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import MiniMapNode from "./MiniMapNode";
import fileService from "./../service/file";

import useFlowStore from "./../store/FlowStore";
import { shallow } from "zustand/shallow";
import { dijkstraAlgorithm } from "./../algorithms/dijkstra";

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
    nodes,
    addNode,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useFlowStore(selector, shallow);

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
  };

  const adjacencymatrix = () => {
    if (nodes.length === 0 || edges.length === 0) {
      alert("No hay nodos o aristas");
      return;
    }
    const matrix = new Array(nodes.length)
    .fill(0)
    .map(() => new Array(nodes.length).fill(0));
    edges.forEach((edge) => {
      const sourceIndex = nodes.indexOf(
        nodes.find((node) => node.id === edge.source)
      );
      const targetIndex = nodes.indexOf(
        nodes.find((node) => node.id === edge.target)
      );
      matrix[sourceIndex][targetIndex] =
        typeof edge.data.weight === "undefined"
          ? 1
          : parseInt(edge.data.weight);
    });
    return matrix;
  };

  const inputSourceNode = () => {
    const sourceNode = prompt("Ingrese el nodo de origen");
    if (sourceNode === null) return;
    const sourceNodeIndex = nodes.findIndex((node) => node.data.label === sourceNode);
    if (sourceNodeIndex === -1) {
      alert("El nodo no existe");
      return;
    }
    return sourceNodeIndex;
  };

  const handleMax = () => {
    const adjacencyMatrix = adjacencymatrix();
    const sourceNode = inputSourceNode();
    console.log(sourceNode);
    if (sourceNode === undefined) return;
    const { costs, idPaths  } = dijkstraAlgorithm(adjacencyMatrix, sourceNode, "max");
  };

  const handleMin = () => {
    const adjacencyMatrix = adjacencymatrix();
    const sourceNode = inputSourceNode();
    if (sourceNode === undefined) return;
    const { costs, idPaths  } = dijkstraAlgorithm(adjacencyMatrix, sourceNode, "min");

  };  

  return (
    <div
      style={{
        //give 80% height
        height: "100vh",
      }}
    >

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
          <ControlButton onClick={handleMax } style={{fontSize: 10}}>
            MAX 
          </ControlButton>
          <ControlButton onClick={handleMin } style={{fontSize: 10}}>
            MIN
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
