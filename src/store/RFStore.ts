/**
 * IMPORTANT
 * this file is meant to be used only by ReactFlow components, this does not include node management
 * */
import { create } from "zustand";
import {
  Connection,
  Edge,
  Node,
  EdgeChange,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

type RFStore = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

/**
 * IMPORTANT
 * this variable keeps the componentNode always on the state
 * */
const initialNodes: Node[] = [
  {
    id: "component",
    type: "componentNode",
    data: { label: "Input Node" },
    position: { x: 250, y: 5 },
  },
];

const useStore = create<RFStore>((set, get) => ({
  /**
   * Nodes state variable
   * */
  nodes: initialNodes,

  /*
   * Updates the nodes when a change is made.
   * @param nodeChanges: NodeChange[] the changes to apply.
   * @returns new state of nodes.
   */
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  edges: [],

  /*
   * Updates the edges when changed.
   * @param changes: EdgeChange[] changes to apply to the edges.
   * @returns The state of the edges with the changes applied.
   */
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  /*
   * Adds an edge to the graph.
   * @param connection: Connection connection to add.
   * @returns The state of the edges with the new edge added.
   */
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));

export default useStore;
