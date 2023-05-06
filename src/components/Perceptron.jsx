import React, { useState } from "react";

const Perceptron = () => {
  const [tableData, setTableData] = useState([]);
  const [tableRows, setTableRows] = useState(0);
  const [tableColumns, setTableColumns] = useState(0);


  const handleClear = () => {
    //setArray([]);
    //setSortedArray([]);
    setTableData([]);
    setTableRows(0);
    setTableColumns(0);
  };



  const handleTableCreate = () => {
    const rows = parseInt(prompt("Introduzca el número de filas"));
    const columns = parseInt(prompt("Introduzca el número de columnas"));

    if (isNaN(rows) || isNaN(columns)) {
      alert("Ingrese números válidos para filas y columnas");
      return;
    }

    const newData = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => "")
    );
    setTableData(newData);
    setTableRows(rows);
    setTableColumns(columns);
  };

  const handleCellValueChange = (rowIndex, columnIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][columnIndex] = value;
    setTableData(newData);
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
      {tableRows > 0 && tableColumns > 0 && (
        <table>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleCellValueChange(
                          rowIndex,
                          columnIndex,
                          e.target.value
                        )
                      }
                      readOnly={columnIndex !== tableColumns - 1}
                    />
                  </td>
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
``
