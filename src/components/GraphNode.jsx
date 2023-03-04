import React, { memo } from "react";
import { Handle } from "reactflow";

export default memo(({ data, isConnectable, sourcePosition }) => {
  return (
    <>
      <Handle
        type="source"
        position={sourcePosition}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="left"
        id="a"
        isConnectable={isConnectable}
      />
    </>
  );
});

// {data.label && <div className="label-wrapper">{data.label}</div>}
