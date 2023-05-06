import React, { useState } from "react";

const Perceptron = () => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState(0);

  const handleClear = () => {
    setTableData([]);
    setTableColumns(0);
  };

  const handleTableCreate = () => {
    const columns = parseInt(prompt("Introduzca el número de columnas"));

    if (isNaN(columns)) {
      alert("Ingrese un número válido para las columnas");
      return;
    }

    const rows = Math.pow(2, columns); // Calcular el número de filas

    const newData = generateCombinations(rows, columns);

    setTableData(newData);
    setTableColumns(columns);
  };

  const generateCombinations = (rows, columns) => {
    const combinations = [];
    generateRow([], 0);
    return combinations;

    function generateRow(row, columnIndex) {
      if (columnIndex === columns) {
        combinations.push(row);
        return;
      }

      generateRow([...row, 1], columnIndex + 1);
      generateRow([...row, 0], columnIndex + 1);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Perceptron</h1>
      <br />

      <div className="row">
        {/* Input fields */}
      </div>

      <div className="row-intial">
        <button className="buttonSort" onClick={handleClear}>
          Limpiar
        </button>

        <button className="buttonSort" onClick={handleTableCreate}>
          Crear Tabla
        </button>
        {/* Other buttons */}
      </div>

      {/* Table */}
      {tableColumns > 0 && (
        <table>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Perceptron;
