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
  deletePersona: Boolean;
  adjacencyMatrix: number[][];
  assignationMatrix:number[][];
  totalCost: string;
  posMatrix: number[][];
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  // Personas
  deletePersona: false,
  toggleDeletePersona: () =>
    set((state) => ({ deletePersona: !state.deletePersona })),

  // adjacency matrix
  adjacencyMatrix: [],
  setAdjacencyMatrix: (adjacencyMatrix: number[][]) =>
    set({ adjacencyMatrix: adjacencyMatrix }),


  //Assignation

  assignationMatrix: [],
  setAssignationMatrix: (assignationMatrix: number[][]) =>
    set({ assignationMatrix: assignationMatrix }),

  //Pos matrix

  posMatrix: [],
  setPosMatrix: (posMatrix: number[][]) =>
    set({ posMatrix: posMatrix }),

  // total cost
  
  totalCost: '',
  setTotalCost: (totalCost: string) =>
    set({ totalCost: totalCost }),

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
  deleteNode: (nodeId: string) =>
    set((state) => {
      const newNodes = state.nodes.filter((n) => n.id !== nodeId);

      const newEdges: Edge[] = [];
      state.edges.forEach((edge: Edge) => {
        // TODO: wtf? there must be a better way to do this
        if (edge.source === nodeId || edge.target === nodeId) {
          // do nothing
        } else {
          newEdges.push(edge);
        }
      });
      newEdges.forEach((edge: Edge, index: number) => {
        if (parseInt(edge.source) > parseInt(nodeId)) {
          edge.source = (parseInt(edge.source) - 1).toString();
        }
        if (parseInt(edge.target) > parseInt(nodeId)) {
          edge.target = (parseInt(edge.target) - 1).toString();
        }
      }
      );
      newNodes.forEach((node: Node, index: number) => {
        node.id = `${index}`;
      });
      return {
        nodes: newNodes,
        edges: newEdges,
      };
    }),
  setNodes: (nodes: Node[]) => set({ nodes: nodes }),
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // edges
  edges: [],
  setWeight: (edgeId: String) =>
    set((state) => {
      const weight = prompt("Introduzca el peso de la arista:");
      // validate weight
      if (weight.length === 0 || typeof weight === "undefined") {
        alert("El peso no puede estar vacío");
        return state.edges;
      } else {
        const newEdges = state.edges.map((edge) => {
          if (edge.id === edgeId) {
            return {
              ...edge,
              data: { ...edge.data, weight: weight },
            };
          } else {
            return edge;
          }
        });
        return {
          edges: newEdges,
        };
      }
      console.log("weight", weight);
    }),
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


// Nodes assign


export default useStore;
