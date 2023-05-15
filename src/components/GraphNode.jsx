import React, { memo } from "react";
import PropTypes from "prop-types";

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

// eslint-disable-next-line react/display-name
const CustomNode = memo(({ id, handleId, data, isConnectable }) => {
  const { deletePersona, deleteNode } = useStore(selector, shallow);

  const handleNodeClick = () => {
    if (deletePersona) {
      deleteNode(id);
    }
  };

  const iscustomNode =
    (data.earlyTime === undefined &&
      data.lateTime === undefined &&
      data.cost === undefined &&
      data.weight === undefined) ||
    (data.earlyTime === null &&
      data.lateTime === null &&
      data.cost === null &&
      data.weight === null);
  const isJhonsonNode =
    data.earlyTime !== undefined &&
    data.earlyTime !== null &&
    data.lateTime !== undefined &&
    data.lateTime !== null;
  const isCentroidNode = data.weight !== undefined && data.weight !== null;
  const isDijkstraNode = data.cost !== undefined && data.cost !== null;

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

      {iscustomNode ? (
        <div className="customNode">{data.label}</div>
      ) : isJhonsonNode ? (
        <div className="customJohnsonNode">
          {data.label}
          <hr />
          {data.earlyTime} | {data.lateTime}
        </div>
      ) : isCentroidNode ? (
        <div className="customCentroidNode"> {data.label} </div>
      ) : isDijkstraNode ? (
        <div
          className="customDijkstraNode"
          style={
            data.cost == 0
              ? { backgroundColor: "salmon" }
              : { backgroundColor: "#3c91e6" }
          }
        >
          {data.label}
          <br />
          {`[${data.cost}]`}
        </div>
      ) : (
        <div className="customNode">{data.label}</div>
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

CustomNode.propTypes = {
  id: PropTypes.string.isRequired,
  handleId: PropTypes.string, //FIXME: isRequired
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    earlyTime: PropTypes.number,
    lateTime: PropTypes.number,
    cost: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired,
  isConnectable: PropTypes.bool.isRequired,
};

export default CustomNode;
