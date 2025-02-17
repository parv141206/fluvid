"use client";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "1",
    style: {
      backgroundColor: "black",
      color: "white",
      border: "solid gray 1px",
    },
    position: { x: 250, y: 0 },
    data: { label: "Your phone" },
  },
  {
    id: "2",
    style: {
      backgroundColor: "black",
      color: "white",
      border: "solid gray 1px",
    },
    position: { x: 250, y: 100 },
    data: { label: "Your PC (chunks)" },
  },
  {
    id: "3",
    style: {
      backgroundColor: "black",
      color: "white",
      border: "solid gray 1px",
    },
    position: { x: 250, y: 200 },
    data: { label: "Your PC (video)" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    label: "Upload Chunks",
    animated: true,
    style: { strokeDasharray: "5 5" },
  },
  {
    id: "1-3",
    source: "2",
    target: "3",
    label: "Combine Chunks",
    animated: true,
    style: { strokeDasharray: "5 5" },
  },
];

export default function AppFlow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const reactFlowInstance = useReactFlow();

  const handleResize = () => {
    reactFlowInstance.fitView({ duration: 500 });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodesConnectable={false}
        draggable={false}
        nodesDraggable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        maxZoom={1.5}
      />
    </div>
  );
}
