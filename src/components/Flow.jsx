import React, { useState, useEffect, useCallback } from "react";

import ReactFlow, {
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
  ControlButton,
} from "reactflow";

import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import AdjacencyMatrix from "./AdjacencyMatrix";

import fileService from "./../service/file";

import RemoveAllIcon from "/icons/removeAll.png";
import CreateNodeIcon from "/icons/createNode.png";
import RemoveNodeIcon from "/icons/removeNode.png";
import ShowAdjacencyMatrixIcon from "/icons/showMatrix.png";
import HideAdjacencyMatrixIcon from "/icons/hideMatrix.png";
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";

const bgColor = "#fff";

const letters = 65;

const nodeTypes = {
  "graph-node-start": GraphNode,
};

const edgeTypes = {
  "graph-edge": GraphEdge,
};

const initialNodes = [];

const initialEdges = [];

const Flow = () => {
  const [removeElements, setRemoveElements] = useState(false);

  const [adjmatrix, setAdjmatrix] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) =>
        addEdge(
          {
            id: `${connection.source}->${connection.target}`,
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            type: "graph-edge",
            data: { label: "h=0", weight: 23 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#342e37",
            },
          },
          eds
        )
      ),
    [setEdges]
  );

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
    setAdjmatrix(matrix);

    // hide/show matrix
    setShowMatrix(!showMatrix);
  };

  const addNode = () => {
    const label = prompt("Introduzca la etiqueta del nodo");
    // check if label exists in node.label
    const nodeExists = nodes.find((node) => node.data.label === label);

    if (typeof nodeExists === "undefined") {
      const newNode = {
        id: `${nodes.length}`,
        handleId: `${nodes.length}`,
        type: "graph-node-start",
        data: { label: label },
        position: { x: 210, y: 400 },
      };

      setNodes(nodes.concat(newNode));
      console.log("nodes", nodes);
    } else {
      alert("Ya existe un nodo con ese nombre.");
    }
  };

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
        <AdjacencyMatrix nodes={nodes} matrix={adjmatrix} />
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
