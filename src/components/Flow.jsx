import React, { useState, useEffect, useCallback } from "react";

import ReactFlow, {
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
} from "reactflow";

import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";

const initBgColor = "#918ecc";

const nodeTypes = {
  "graph-node-start": GraphNode,
};

const edgeTypes = {
  "graph-edge": GraphEdge,
};

const initialNodes = [
  {
    id: "0",
    type: "graph-node-start",
    data: { label: "A" },
    position: { x: 80, y: 200 },
    sourcePosition: "right",
  },
  {
    id: "1",
    type: "graph-node-start",
    data: { label: "B" },
    position: { x: 160, y: 200 },
    sourcePosition: "left",
  },
  {
    id: "2",
    type: "graph-node-start",
    data: { label: "C" },
    position: { x: 210, y: 300 },
    sourcePosition: "right",
  },
];

const initialEdges = [];

const Flow = () => {
  const [bgColor, setBgColor] = useState(initBgColor);

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
            id: `${connection.source}-${connection.target}`,
            source: connection.source,
            target: connection.target,
            type: "graph-edge",
            data: { label: "h=0", weight: 23 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#fff",
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const handler = () => {
    console.log("edges", edges);
    console.log("nodes", nodes);
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
  };

  const addNode = () => {
    const newNode = {
      id: `${nodes.length}`,
      type: "graph-node-start",
      data: { label: "An input node" },
      position: { x: 210, y: 300 },
      sourcePosition: "right",
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <>
      <button type="button" onClick={handler}>
        Print nodes and edges
      </button>

      <button type="button" onClick={handleMatrix}>
        Print matrix
      </button>
      <button type="button" onClick={addNode}>
        Add node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: bgColor }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode="loose"
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
        <Controls />
      </ReactFlow>
    </>
  );
};

export default Flow;
