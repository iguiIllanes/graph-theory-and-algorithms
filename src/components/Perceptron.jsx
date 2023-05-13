import React, { useState } from "react";
import Modal from "./Modal";
import "../styles/Sorts.css";
import "../styles/Perceptron.css";
import PerceptronSpinner from "./PerceptronSpinner";

const Perceptron = () => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState(0);
  const [editableColumn, setEditableColumn] = useState([]);
  //Para obtener en matriz las entradas
  const [tableValues, setTableValues] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [resultValues, setResultValues] = useState([]);
  const [weights, setWeights] = useState([]);


// Limpiar campos
  const handleClear = () => {
    setTableData([]);
    setTableColumns(0);
    setEditableColumn([]);
  };

  const handlexd = () => {
    console.log(weights);
    console.log(tableValues);
  
    // Utiliza los pesos sinápticos y los valores de la tabla para realizar el entrenamiento
    // ...
  };
  

  const handleTableCreate = () => {
    const columns = parseInt(prompt("Introduzca el número de entradas"));

    if (isNaN(columns)) {
      alert("Ingrese un número válido para las columnas");
      return;
    }

    const rows = Math.pow(2, columns); // Calcular el número de filas

    const newData = generateCombinations(rows, columns);

    setTableData(newData);
    setTableColumns(columns);
    setEditableColumn(Array.from({ length: rows }, () => ""));
    
    setEditableColumn(Array.from({ length: rows }, () => ""));
    setResultValues([]);
    setWeights([]);

    for (let i = 0; i < columns; i++) {
      const weight = parseFloat(prompt(`Introduzca el peso sináptico para x${i+1}`));
      if (isNaN(weight)) {
        alert("Ingrese un número válido para el peso sináptico");
        return;
      }
      setWeights((prev) => [...prev, weight]);
    }

    const matrix = generateCombinations(rows, columns);
    const newTableValues = matrix.map(row => Array.from({ length: columns }, (_, i) => row[i] ? 1 : 0));
    setTableValues(newTableValues);

    setTableData(matrix);
    setTableColumns(columns);
    setEditableColumn(Array.from({ length: rows }, () => ""));
    setResultValues([]);
    setWeights([]);




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

  const handleEditableCellValueChange = (rowIndex, value) => {
    const newEditableColumn = [...editableColumn];
    newEditableColumn[rowIndex] = value;
    setEditableColumn(newEditableColumn);
  
    const newResultValues = [...resultValues];
    newResultValues[rowIndex] = value;
    setResultValues(newResultValues);
  };

  const handleTrain = () => {
    console.log(weights);
    
    setShowModal(true);
    // Utiliza los pesos sinápticos para realizar el entrenamiento
    // ...
  };
  
  

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Perceptron</h1>
      <br />

      <div className="row">

          <div className="input-container">
              <label htmlFor="input1">Umbral</label>
              <input
              id="input1"
              className="perceptron-fields"
              type="text"
              
              />
          </div>

          <div className="input-container">
              <label htmlFor="input2">Razón</label>
              <input
              id="input2"
              className="perceptron-fields"
              type="text"
              />
          </div>
      </div>

      <div className="row-intial">
        <button className="buttonSort" onClick={handleClear}>
          Limpiar
        </button>

        <button className="buttonSort" onClick={handleTableCreate}>
          Crear Tabla
        </button>

        <button className="buttonSort" onClick={() => console.log(resultValues)}>
          Capturar Valores
        </button>

        <button className="buttonSort" onClick={handleTrain}>
          Entrenar Perceptron
        </button>

        <button className="buttonSort" onClick={handlexd}>
          Entrenar Perceptronx2x2
        </button>

        {/* Other buttons */}
      </div>

      {/* Table */}
      {tableColumns > 0 && (
        <div className="table-container">
        
          <table>
            <thead>
              <tr>
                {Array.from({ length: tableColumns }, (_, index) => (
                  <th key={index}>x{index + 1}</th>
                ))}
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, columnIndex) => (
                    <td key={columnIndex} >
                      {cell}
                    </td>
                  ))}
                  <td>
                    <input
                      type="text"
                      value={editableColumn[rowIndex]}
                      onChange={(e) =>
                        handleEditableCellValueChange(rowIndex, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} content={<PerceptronSpinner></PerceptronSpinner>}>
        </Modal>
        
                
    </div>
  );
};

export default Perceptron;
