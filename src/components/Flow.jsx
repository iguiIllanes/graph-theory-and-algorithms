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
import useStore from "./../store/FlowStore";
import { shallow } from "zustand/shallow";

const bgColor = "#fff";

const nodeTypes = {
  "graph-node-start": GraphNode,
};

const edgeTypes = {
  "graph-edge": GraphEdge,
};

const selector = (state) => ({
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
  };

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
            return "#fff";
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
          <ControlButton onClick={handleRemoveElements}>
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
