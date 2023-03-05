import React, { memo } from "react";
import { Handle } from "reactflow";
import "./RingHandle.css"; 

export default memo(({ handleId, data, isConnectable, sourcePosition }) => {
  return (
    <>
      <Handle
        id={`${handleId}-left`}
        type="source"
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
        className="ring-handle"
      />
      <Handle
        id={`${handleId}-right`}
        type="source"
        position="right"
        style={{ background: "#555" }}

        isConnectable={isConnectable}
      />
      <div className="customNode">{data.label}</div>
      <Handle
        id={`${handleId}-top`}
        type="source"
        position="top"
        style={{ background: "#555" }}

        isConnectable={isConnectable}
      />
      <Handle
        id={`${handleId}-bottom`}
        type="source"
        position="bottom"
        style={{ background: "#555" }}

        isConnectable={isConnectable}
      />
      {/* <div className="node-label">{data.label}</div> */}
    </>
  );
});
