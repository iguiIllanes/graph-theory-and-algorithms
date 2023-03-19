import React, { useState } from 'react';
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";
import fileService from "../service/matrixFile";

import "../styles/AssignmentTransport.css";
const AssignmentTransport = () => {
    const [chooseAlgorithm, setChooseAlgorithm] = useState(false);
    const [numRows, setNumRows] = useState(2);
    const [numColumns, setNumColumns] = useState(2);
    const [inputMatrix, setInputMatrix] = useState(Array.from({ length: numRows + 2 }, () => new Array(numColumns + 2).fill("")));


    const handleAlgorithm = () => {
        setChooseAlgorithm(!chooseAlgorithm);
    };

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
        setNumRows(newNumRows);
        // TODO: prevent the matrix from being reset when the number of rows is changed
        setInputMatrix(Array.from({ length: newNumRows + 2 }, () => new Array(numColumns + 2).fill("")));
    };

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
        setNumColumns(newNumColumns);
        // TODO: prevent the matrix from being reset when the number of columns is changed
        setInputMatrix(Array.from({ length: numRows + 2 }, () => new Array(newNumColumns + 2).fill("")));
    }

    const handleFileUpload = async (event) => {
        await fileService.uploadMatrix(event).then((response) => {
            console.log(response);
            setChooseAlgorithm((response.algorithm === "transport") ? true : false);
            setNumRows(response.numRows);
            setNumColumns(response.numColumns);
            setInputMatrix(response.matrix);
            return response;
        });
    };

    const handleMax = () => {
        console.log(inputMatrix);
    }


    return (
        <>
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




            <div className="controls-bottom-left">
                <button className="controls-botton" style={{ fontSize: 10 }} onClick={handleAlgorithm}>ALG</button>
                <button className="controls-botton" onClick={handleNumRows}>#F</button>
                <button className="controls-botton" onClick={handleNumColumns}>#C</button>
                <button className="controls-botton" style={{ fontSize: 10 }} onClick={handleMax}>MAX</button>
                <button className="controls-botton" style={{ fontSize: 10 }}>MIN</button>
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
                    onClick={() => fileService.downloadMatrix((chooseAlgorithm ? "transport" : "assignment"), numRows, numColumns, inputMatrix, "matriz.json")}
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
        </>
    );
};




export default AssignmentTransport;