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
        isConnectable={isConnectable}
      />
      <Handle
        id={`${handleId}-right`}
        type="source"
        position="right"
        isConnectable={isConnectable}
      />
      <Handle
        id={`${handleId}-top`}
        type="source"
        position="top"
        isConnectable={isConnectable}
      />
      <Handle
        id={`${handleId}-bottom`}
        type="source"
        position="bottom"
        isConnectable={isConnectable}
      />
    </>
  );
});
