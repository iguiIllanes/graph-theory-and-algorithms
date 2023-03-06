import React, { memo } from "react";
import { Handle } from "reactflow";
import "./../styles/RingHandle.css";

export default memo(({ handleId, data, isConnectable }) => {
  return (
    <>
      <div className="node-container">
        <Handle
          id={`${handleId}-left`}
          type="source"
          position="left"
          style={{
            opacity: 0,
            marginLeft: "5px",
            border: "1px solid #fff",
          }}
          isConnectable={isConnectable}
          className="ring-handle"
        />
        <Handle
          id={`${handleId}-right`}
          type="source"
          position="right"
          style={{
            opacity: 0,
            marginRight: "5px",
            border: "1px solid #fff",
          }}
          isConnectable={isConnectable}
        />
        <div className="customNode">{data.label}</div>
        <Handle
          id={`${handleId}-top`}
          type="source"
          position="top"
          style={{
            opacity: 0,
            border: "1px solid #fff",
            marginTop: "5px",
          }}
          isConnectable={isConnectable}
        />
        <Handle
          id={`${handleId}-bottom`}
          type="source"
          position="bottom"
          style={{
            opacity: 0,
            border: "1px solid #fff",
            marginBottom: "5px",
          }}
          isConnectable={isConnectable}
        />
      </div>
      {/* <div className="node-label">{data.label}</div> */}
    </>
  );
});
