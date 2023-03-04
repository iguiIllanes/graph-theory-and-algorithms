import React, { useState, useEffect, useCallback } from "react";

import ReactFlow, {
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";

import GraphNode from "./GraphNode";

const initBgColor = "#918ecc";

const nodeTypes = {
  "graph-node-start": GraphNode,
};

const initialNodes = [
  {
    id: "12378561278",
    type: "graph-node-start",
    data: { label: "An input node" },
    position: { x: 80, y: 200 },
    sourcePosition: "right",
  },
  {
    id: "1237856127848p",
    type: "graph-node-start",
    data: { label: "An input node" },
    position: { x: 160, y: 200 },
    sourcePosition: "right",
  },
  {
    id: "1237856127pp8",
    type: "graph-node-start",
    data: { label: "An input node" },
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
    []
  );
  const onEdgesChange = useCallback((changes) => {
    console.log("changes", changes);
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge(params, eds), console.log("edges", edges)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: bgColor }}
      nodeTypes={nodeTypes}
      connectionMode="loose"
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === "input") return "#0041d0";
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
  );
};

export default Flow;
