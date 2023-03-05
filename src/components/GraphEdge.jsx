import React from "react";
import { getBezierPath, EdgeLabelRenderer, getStraightPath } from "reactflow";

const GraphEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {
    stroke: "#fff",
    strokeWidth: 2,
  },
  data = { label: "" },
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
          }}
          className="nodrag nopan"
        >
          {data.weight}
          <br />
          <br />
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default GraphEdge;
