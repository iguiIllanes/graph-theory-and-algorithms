import React, { useState } from 'react';
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";
import fileService from "../service/matrixFile";
import { transportAlgorithm } from '../algorithms/transport';
import { assignmentAlgorithm } from '../algorithms/assignment';
import Modal from "./Modal";
import RemoveAllIcon from "/icons/removeAll.png";

import "../styles/AssignmentTransport.css";
import TransportationMatrix from './TransportationMatrix';
import AssignmentMatrix from './AssignmentMatrix';

const AssignmentTransport = () => {
    // 0: Assignment, 1: Transport
    const [chooseAlgorithm, setChooseAlgorithm] = useState(false);
    // Number of rows and columns of the matrix
    const [numRows, setNumRows] = useState(2);
    // Number of rows and columns of the matrix
    const [numColumns, setNumColumns] = useState(2);
    // Matrix of inputs
    const [inputMatrix, setInputMatrix] = useState(Array.from({ length: numRows + 2 }, () => new Array(numColumns + 2).fill("")));

    // Response for the transport algorithm
    const [allocationMatrix, setAllocationMatrix] = useState([]);
    // Response for the assignment algorithm
    const [assignmentMatrix, setAssignmentMatrix] = useState([]);

    // False: Minimize, True: Maximize
    const [minMax, setMinMax] = useState(false);
    // Common response for both algorithms
    const [totalCost, setTotalCost] = useState(0);
    const [showModal, setShowModal] = useState(false);


    // We can change the algorithm by clicking on the button, in case of transport it will show the supply and demand
    const handleAlgorithm = () => {
        setChooseAlgorithm(!chooseAlgorithm);
        // In case of chosing the assignment algorithm, we reset the only the supply and demand
        if (!chooseAlgorithm) {
            const newInputMatrix = inputMatrix.map((row) => row.map((cell) => cell));
            // Clear the last row and column with ""
            for (let i = 0; i < newInputMatrix[0].length; i++) {
                newInputMatrix[newInputMatrix.length - 1][i] = "";
            }
            for (let i = 0; i < newInputMatrix.length; i++) {
                newInputMatrix[i][newInputMatrix[0].length - 1] = "";
            }
            setInputMatrix(newInputMatrix);
        }
    };

    // We can change the number of rows by clicking on the button
    const handleNumRows = () => {
        let newNumRows = prompt("Ingrese el numero de filas");
        if (newNumRows === null || newNumRows === "") {
            return;
        }
        if (isNaN(newNumRows) || newNumRows < 1) {
            alert("Ingrese un numero valido");
            return;
        }
        newNumRows = parseInt(newNumRows);
        const difference = newNumRows - numRows;
        // In case we increase the number of rows, we add a new row with before the last row
        if (difference > 0) {
            const newInputMatrix = inputMatrix.map((row) => row.map((cell) => cell));
            for (let i = 0; i < difference; i++) {
                newInputMatrix.splice(newInputMatrix.length - 1, 0, new Array(newInputMatrix[0].length).fill(""));
            }
            setInputMatrix(newInputMatrix);
        }
        // In case we decrease the number of rows, we remove the last rows except the last one
        else {
            const newInputMatrix = inputMatrix.map((row) => row.map((cell) => cell));
            for (let i = 0; i < -difference; i++) {
                newInputMatrix.splice(newInputMatrix.length - 2, 1);
            }
            setInputMatrix(newInputMatrix);
        }
        setNumRows(newNumRows);
    };

    // We can change the number of columns by clicking on the button
    const handleNumColumns = () => {
        let newNumColumns = prompt("Ingrese el numero de columnas");
        if (newNumColumns === null || newNumColumns === "") {
            return;
        }
        if (isNaN(newNumColumns) || newNumColumns < 1) {
            alert("Ingrese un numero valido");
            return;
        }
        newNumColumns = parseInt(newNumColumns);
        const difference = newNumColumns - numColumns;
        // In case we increase the number of columns, we add a new column with before the last column
        if (difference > 0) {
            const newInputMatrix = inputMatrix.map((row) => row.map((cell) => cell));
            for (let i = 0; i < difference; i++) {
                for (let j = 0; j < newInputMatrix.length; j++) {
                    newInputMatrix[j].splice(newInputMatrix[j].length - 1, 0, "");
                }
            }
            setInputMatrix(newInputMatrix);
        }
        // In case we decrease the number of columns, we remove the last columns except the last one
        else {
            const newInputMatrix = inputMatrix.map((row) => row.map((cell) => cell));
            for (let i = 0; i < -difference; i++) {
                for (let j = 0; j < newInputMatrix.length; j++) {
                    newInputMatrix[j].splice(newInputMatrix[j].length - 2, 1);
                }
            }
            setInputMatrix(newInputMatrix);
        }
        setNumColumns(newNumColumns);
    }

    // We can change the value of the matrix by clicking on the input, this depends on matrixFile service
    const handleFileUpload = async (event) => {
        await fileService.uploadMatrix(event).then((response) => {
            // console.log(response);
            setChooseAlgorithm((response.algorithm === "transport") ? true : false);
            setNumRows(response.numRows);
            setNumColumns(response.numColumns);
            setInputMatrix(response.matrix);
            return response;
        });
    };

    // We can download the matrix by clicking on the button, this depends on matrixFile service
    const handleFileDownload = () => {
        const fileName = prompt("Introduzca el nombre del archivo");
        console.log(fileName);
        fileService.downloadMatrix((chooseAlgorithm ? "transport" : "assignment"), numRows, numColumns, inputMatrix, `${fileName}.json`);
    }

    // Maximize the matrix
    const handleMax = () => {
        const data = {
            algorithm: (chooseAlgorithm ? "transport-max" : "assignment-max"),
            numRows: numRows,
            numColumns: numColumns,
            matrix: inputMatrix
        }
        try {
            if (chooseAlgorithm) {
                const { allocationMatrix, totalCost } = transportAlgorithm(data);
                console.table(allocationMatrix);
                console.log(totalCost);
                setAllocationMatrix(allocationMatrix);
                setTotalCost(totalCost);
                setShowModal(true);
                setMinMax(true);
            } else {
                const { assignmentMatrix, totalCost } = assignmentAlgorithm(data);
                console.table(assignmentMatrix);
                console.log(totalCost);
                setAssignmentMatrix(assignmentMatrix);
                setTotalCost(totalCost);
                setShowModal(true);
                setMinMax(true);
            }
        } catch (error) {
            alert(error);
        }
    }
    // Minimize the matrix
    const handleMin = () => {
        const data = {
            algorithm: (chooseAlgorithm ? "transport-min" : "assignment-min"),
            numRows: numRows,
            numColumns: numColumns,
            matrix: inputMatrix
        }
        try {
            if (chooseAlgorithm) {
                const { allocationMatrix, totalCost } = transportAlgorithm(data);
                console.table(allocationMatrix);
                console.log(totalCost);
                setAllocationMatrix(allocationMatrix);
                setTotalCost(totalCost);
                setShowModal(true);
                setMinMax(false);
            } else {
                const { assignmentMatrix, totalCost } = assignmentAlgorithm(data);
                console.table(assignmentMatrix);
                console.log(totalCost);
                setAssignmentMatrix(assignmentMatrix);
                setTotalCost(totalCost);
                setShowModal(true);
                setMinMax(true);
            }
        } catch (error) {
            alert(error);
        }
    }

    const handleClear = () => {
        setNumRows(2);
        setNumColumns(2);
        setInputMatrix(Array.from({ length: numRows + 2 }, () => new Array(numColumns + 2).fill("")));
    }


    return (
        <>
            {(showModal) ? (
                (chooseAlgorithm) ? (
                    <div>
                        <Modal content={<TransportationMatrix inputMatrix={inputMatrix} allocationMatrix={allocationMatrix} totalCost={totalCost} minMax={minMax} />}
                            show={showModal} onClose={() => setShowModal(false)}>
                        </Modal>
                    </div>
                ) : (
                    <div>
                        <Modal content={<AssignmentMatrix inputMatrix={inputMatrix} assignmentMatrix={assignmentMatrix} totalCost={totalCost} minMax={minMax} />}
                            show={showModal} onClose={() => setShowModal(false)}>
                        </Modal>
                    </div>
                )

            ) :
                (<></>
                )}
            <input
                id="file-input"
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
            />

            <h1>
                {!chooseAlgorithm ? "Algoritmo de Asignación" : "Algoritmo de Transporte"}
            </h1>

            <br />

            <div className="matrix">
                <div className="matrix-header">
                    <div className="matrix-header-cell"></div>
                    {Array.from({ length: numColumns }, (_, i) => (
                        // Save the value of the input in the array to (first row)
                        <div className="matrix-header-cell" key={i}>
                            <input type="text" value={inputMatrix[0][i + 1]} onChange={(e) => {
                                const value = e.target.value;
                                setInputMatrix((prev) => {
                                    const newMatrix = [...prev];
                                    newMatrix[0][i + 1] = value;
                                    return newMatrix;
                                });
                            }} />
                        </div>
                    ))}
                    {
                        chooseAlgorithm ?
                            <div className="matrix-header-cell">
                                <p style={{ fontSize: 15 }}>
                                    DISPONIBILIDAD
                                </p>
                            </div> : null
                    }
                </div>
                {Array.from({ length: numRows }, (_, i) => (
                    <div className="matrix-row" key={i}>
                        <div className="matrix-header-cell" style={{ backgroundColor: "#ccc" }}>
                            <input type="text" value={inputMatrix[i + 1][0]} onChange={(e) => {
                                const value = e.target.value;
                                setInputMatrix((prev) => {
                                    const newMatrix = [...prev];
                                    newMatrix[i + 1][0] = value;
                                    return newMatrix;
                                });
                            }}
                            />
                        </div>
                        {Array.from({ length: numColumns }, (_, j) => (
                            <div className="matrix-cell" key={j}>
                                <input type="text" value={inputMatrix[i + 1][j + 1]} onChange={(e) => {
                                    const value = e.target.value;
                                    setInputMatrix((prev) => {
                                        const newMatrix = [...prev];
                                        newMatrix[i + 1][j + 1] = value;
                                        return newMatrix;
                                    });
                                }}
                                />
                            </div>
                        ))}
                        {
                            chooseAlgorithm ?
                                <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }}>
                                    <input type="text" value={inputMatrix[i + 1][numColumns + 1]} onChange={(e) => {
                                        const value = e.target.value;
                                        setInputMatrix((prev) => {
                                            const newMatrix = [...prev];
                                            newMatrix[i + 1][numColumns + 1] = value;
                                            return newMatrix;
                                        });
                                    }}
                                    />
                                </div> : null
                        }
                    </div>
                ))}
                {
                    chooseAlgorithm ?

                        <div className="matrix-row">
                            <div className="matrix-header-cell" style={{ backgroundColor: "#ccc", fontWeight: "bold" }}>
                                <p style={{ fontSize: 15 }}>
                                    DEMANDA
                                </p>
                            </div>
                            {Array.from({ length: numColumns }, (_, i) => (
                                <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }} key={i}>
                                    <input type="text" value={inputMatrix[numRows + 1][i + 1]} onChange={(e) => {
                                        const value = e.target.value;
                                        setInputMatrix((prev) => {
                                            const newMatrix = [...prev];
                                            newMatrix[numRows + 1][i + 1] = value;
                                            return newMatrix;
                                        });
                                    }}
                                    />
                                </div>
                            ))}
                            <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }}>
                            </div>
                        </div>
                        : null
                }
            </div>



            {(!showModal) ? (
                <div className="controls-bottom-left">
                    <button className="controls-botton" style={{ fontSize: 10 }} onClick={handleAlgorithm}>ALG</button>
                    <button className="controls-botton" onClick={handleNumRows}>#F</button>
                    <button className="controls-botton" onClick={handleNumColumns}>#C</button>
                    <button className="controls-botton" onClick={handleClear}>
                        <img
                            src={RemoveAllIcon}
                            alt="Remove All"
                            style={{
                                width: "20px",
                            }}
                        /></button>

                    <button className="controls-botton" style={{ fontSize: 10 }} onClick={handleMax}>MAX</button>
                    <button className="controls-botton" style={{ fontSize: 10 }} onClick={handleMin}>MIN</button>
                    <button className="controls-botton"
                        onClick={() => document.getElementById("file-input").click()}
                    >
                        <img
                            src={UploadIcon}
                            alt="A"
                            style={{
                                width: "20px",
                            }}
                        />
                    </button>
                    <button className="controls-botton"
                        onClick={handleFileDownload}
                    >
                        <img
                            src={DownloadIcon}
                            alt="A"
                            style={{
                                width: "20px",
                            }}
                        />
                    </button>
                    <button className="controls-botton"
                        onClick={() => window.open("/manual.pdf")}
                        style={{ color: "#000" }}
                    >?</button>
                </div>
            ) :
                (<></>
                )}

        </>
    );
};




export default AssignmentTransport;