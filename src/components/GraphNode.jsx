import React, { memo } from "react";
import { Handle } from "reactflow";
import "./RingHandle.css"; 

export default memo(({ handleId, data, isConnectable, sourcePosition }) => {
  return (
    <>
    <div className="node-container">
      <Handle
        id={`${handleId}-left`}
        type="source"
        position="left"
        style={{ background: "#b36c6c", marginLeft:"5px", border:"1px solid #b36c6c" }}
        isConnectable={isConnectable}
        className="ring-handle"
      />
      <Handle
        id={`${handleId}-right`}
        type="source"
        position="right"
        style={{ background: "#b36c6c", marginRight:"5px", border:"1px solid #b36c6c" }}

        isConnectable={isConnectable}
      />
      <div className="customNode">{data.label}</div>
      <Handle
        id={`${handleId}-top`}
        type="source"
        position="top"
        style={{ background: "#b36c6c", border:"1px solid #b36c6c", marginTop:"3px" }}

        isConnectable={isConnectable}
      />
      <Handle
        id={`${handleId}-bottom`}
        type="source"
        position="bottom"
        style={{ background: "#b36c6c", border:"1px solid #b36c6c", marginBottom:"3px" }}

        isConnectable={isConnectable}
      />
      </div>
      {/* <div className="node-label">{data.label}</div> */}
    </>
  );
});
