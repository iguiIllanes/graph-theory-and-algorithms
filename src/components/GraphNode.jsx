import React, { memo } from "react";
import { Handle } from "reactflow";
import "./MyNode.css"; // Archivo CSS personalizado para el estilo del handle

export default memo(({ data, isConnectable, sourcePosition }) => {
  return (
    <>
      <div className="node-handle-container"> {/* Contenedor personalizado para el handle */}
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          style={{ width: 20, height: 20 }}
          className="node-handle" // Clase personalizada para el estilo del handle
        />
      </div>
      <div className="node-label">{data.label}</div>
    </>
  );
});
