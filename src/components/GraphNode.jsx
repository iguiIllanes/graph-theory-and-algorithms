import React, { memo } from "react";

import { Handle } from "reactflow";

import useStore from "./../store/FlowStore";
import { shallow } from "zustand/shallow";

import "./../styles/RingHandle.css";

const selector = (state) => ({
  // Persona
  deletePersona: state.deletePersona,

  // actions
  deleteNode: state.deleteNode,
});

export default memo(({ id, handleId, data, isConnectable }) => {
  const { deletePersona, deleteNode } = useStore(selector, shallow);

  const handleNodeClick = () => {
    if (deletePersona) {
      deleteNode(id);
    }
  };
  // console.log(data.earlyTime);

  return (
    <div className="node-container" onClick={handleNodeClick}>
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
      {data.earlyTime === undefined && data.lateTime === undefined ? (
        <div className="customNode">{data.label}</div>
      ) : (
        <div class="customJohnsonNode">
          {data.label}
          <hr />
          {data.earlyTime} | {data.lateTime}
        </div>
      )}

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
  );
});
