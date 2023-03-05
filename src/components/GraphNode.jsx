import React, { memo } from "react";
import { Handle } from "reactflow";
import "./RingHandle.css"; 

export default memo(({ data, isConnectable, sourcePosition }) => {
  return (
    <>
      <div className="node-handle-container"> 
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          className="ring-handle" 
          style={{ 
            width: 38, 
            height: 38, 
            borderRadius: "50%", 
            border: "4px solid #4F4F4F",
            backgroundColor: "transparent"
          }}
        >
        </Handle>
      </div>
      <div className="node-label">{data.label}</div>
    </>
  );
});
