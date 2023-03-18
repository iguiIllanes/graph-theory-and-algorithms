import React from "react";
import {
  getBezierPath,
  EdgeLabelRenderer,
  getStraightPath,
  ControlButton,
} from "reactflow";
import editIcon from "/icons/editar.png";

import useStore from "./../store/FlowStore";

const foreignObjectSize = 40;
const GraphEdge = ({
  id,
  source,
  target,
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
  data = { label: "", weight: 1 },
  markerEnd,
}) => {
  const setWeight = useStore((state) => state.setWeight);

  let edgePath, controlX, controlY, labelX, labelY;
  if (source == target) {
    // Use getBezierPath to get a curved path
    const curveFactor = 0.5; // adjust this to control the curve
    [edgePath, controlX, controlY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      curvature: curveFactor,
    });
    // Set labelX and labelY to the control point
    labelX = controlX;
    labelY = controlY;
  } else {
    // Use getStraightPath to get a straight path
    [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    // Change color when using johnson algorithm
    if (data.label !== "") {
      style = {
        ...style,
        stroke: data.label === "h = 0" ? "green" : "#342e37",
      };
    }
  }

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
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <button className="edgebutton" onClick={() => setWeight(id)}>
            {data.weight}
          </button>
        </div>
      </foreignObject>
    </>
  );
};

export default GraphEdge;
