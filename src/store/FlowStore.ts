import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

// import initialNodes from './nodes';
// import initialEdges from './edges';

type RFState = {
  adjacencyMatrix: number[][];
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  // adjacency matrix
  adjacencyMatrix: [],
  setAdjacencyMatrix: (adjacencyMatrix: number[][]) =>
    set({ adjacencyMatrix: adjacencyMatrix }),

  // nodes
  // BIG WARNING: lsp server marks this as error, it works fine though
  nodes: [],
  addNode: () =>
    set((state) => {
      // ask user for label and validate
      const label = prompt("Introduzca la etiqueta del nodo:");
      if (label.length === 0 || typeof label === "undefined") {
        alert("La etiqueta no puede estar vacía");
        return state.nodes;
      }

      const nodeExists = state.nodes.find((n) => n.data.label === label);
      if (typeof nodeExists === "undefined") {
        // add node to nodes array
        const newNode = {
          id: `${state.nodes.length}`,
          handleId: `${state.nodes.length}`,
          type: "graph-node-start",
          data: { label: label },
          position: { x: 210, y: 400 },
        };
        console.log("newNode", newNode);
        return {
          nodes: [...state.nodes, newNode],
        };
      } else {
        alert("Ya existe un nodo con ese nombre, intenta con otro.");
        return state.nodes;
      }
    }),
  setNodes: (nodes: Node[]) => set({ nodes: nodes }),
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // edges
  edges: [],
  setEdges: (edges: Edge[]) => set({ edges: edges }),
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        {
          id: `${connection.source}-${connection.target}`,
          source: connection.source,
          target: connection.target,
          sourceHandle: connection.sourceHandle,
          targetHandle: connection.targetHandle,
          type: "graph-edge",
          data: { label: "h=0", weight: 21 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#342e37",
          },
        },
        get().edges
      ),
    });
  },
}));

export default useStore;
