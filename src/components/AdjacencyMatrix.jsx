import React from "react";

const AdjacencyMatrix = ({ nodes, matrix }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            ‎
            {nodes.map((node) => (
              <th key={node.id}>{node.data.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{nodes[rowIndex].data.label}</td>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdjacencyMatrix;
