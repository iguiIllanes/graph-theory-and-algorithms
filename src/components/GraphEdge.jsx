import React from "react";
import { getBezierPath, EdgeLabelRenderer, getStraightPath, ControlButton } from "reactflow";
import editIcon from "/icons/editar.png";
import CreateNodeIcon from "/icons/createNode.png";
const foreignObjectSize = 10;
const GraphEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {
    flex: "1 1",
    stroke: "#342e37",
    strokeWidth: 3,
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
      <EdgeLabelRenderer id="capa2">
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            color: "#342e37",
          }}
          className="nodrag nopan"
        >
          {data.weight}
          <br />
          <br />
          {data.label}
        </div>
      </EdgeLabelRenderer>
      <foreignObject
        id="capa1"
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
      >
        <div>
        <ControlButton onClick="">
            <img
              src={editIcon}
              alt="A"
              style={{
                width: "10px",
                hover: "pointer",
              }}
            />
          </ControlButton>
        </div>
      </foreignObject>
    </>
  );
};

export default GraphEdge;