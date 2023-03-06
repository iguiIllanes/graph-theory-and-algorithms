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
    (changes) => {
      console.log("changes", changes);
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
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
    console.log("add node", nodes.length);
    const newNode = {
      id: `${nodes.length}`,
      handleId: `${nodes.length}`,
      type: "graph-node-start",
      data: { label: `${String.fromCharCode(letters + nodes.length)}` },
      position: { x: 210, y: 400 },
    };

    setNodes(nodes.concat(newNode));
    console.log("nodes", nodes);
  };

  const handleRemoveElements = () => {
    // console.log("remove elements");

    //remove last element in nodes
    const newNodes = nodes.slice(0, nodes.length - 1);
    setNodes(newNodes);
    console.log("edges", edges);
  };

  const handleFileUpload = async (event) => {
    const data = await fileService.upload(event).then((response) => {
      setNodes(response.nodes);
      setEdges(response.edges);
    });
    // console.log(data.nodes);
  };

  return (
    <>
      {showMatrix ? (
        <AdjacencyMatrix nodes={nodes} matrix={adjmatrix} />
      ) : (
        <>
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
              <ControlButton onClick={addNode}>
                <img
                  src="./../../assets/createNode.png"
                  alt="A"
                  style={{
                    width: "20px",
                    hover: "pointer",
                  }}
                />
              </ControlButton>
              <ControlButton onClick={handleRemoveElements}>
                <img
                  src="./../../assets/removeNode.png"
                  alt="A"
                  style={{
                    width: "20px",
                  }}
                />
              </ControlButton>
              <ControlButton onClick={handleMatrix}>
                <img
                  src={
                    showMatrix
                      ? "./../../assets/hideMatrix.png"
                      : "./../../assets/showMatrix.png"
                  }
                  alt="A"
                  style={{
                    width: "20px",
                  }}
                />
              </ControlButton>
              <ControlButton
                onClick={() =>
                  fileService.download(nodes, edges, "archivo.json")
                }
              >
                <img
                  src="./../../assets/download.png"
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
                  src="./../../assets/upload.png"
                  alt="A"
                  style={{
                    width: "20px",
                  }}
                />
              </ControlButton>
              <ControlButton style={{ color: "#000" }}>?</ControlButton>
            </Controls>
          </ReactFlow>
        </>
      )}
    </>
  );
};

export default Flow;
