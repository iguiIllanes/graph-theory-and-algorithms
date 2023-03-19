import React, { useState } from 'react';
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";

import "../styles/AsignationTransport.css";
const AsignationTransport = () => {
    const [chooseAlgorithm, setChooseAlgorithm] = useState(false);
    const [numRows, setNumRows] = useState(2);
    const [numColumns, setNumColumns] = useState(2);
    const [matrix, setMatrix] = useState([]);
    const [from, setFrom] = useState([]);
    const [to, setTo] = useState([]);
    const [available, setAvailable] = useState([]);
    const [demand, setDemand] = useState([]);


    const handleAlgorithm = () => {
        setChooseAlgorithm(!chooseAlgorithm);
    };

    const handleNumRows = () => {
        const numRows = prompt("Ingrese el numero de filas");
        if (numRows === null || numRows === "") {
            return;
        }
        if (isNaN(numRows) || numRows < 1) {
            alert("Ingrese un numero valido");
            return;
        }
        setNumRows(numRows);
        setInputMatrix(Array.from({ length: numRows }, () => new Array(numColumns).fill("")));
        setTo(Array.from({ length: numRows }, () => new Array(numColumns).fill("")));
        if (chooseAlgorithm) {
            setAvailable(Array.from({ length: numRows }, () => new Array(numColumns).fill("")));
        }
    };

    const handleNumColumns = () => {
        const numColumns = prompt("Ingrese el numero de columnas");
        if (numColumns === null || numColumns === "") {
            return;
        }
        if (isNaN(numColumns) || numColumns < 1) {
            alert("Ingrese un numero valido");
            return;
        }
        setNumColumns(numColumns);
        setInputMatrix(Array.from({ length: numRows }, () => new Array(numColumns).fill("")));
        setFrom(Array.from({ length: numRows }, () => new Array(numColumns).fill("")));
        if (chooseAlgorithm) {
            setDemand(Array.from({ length: numRows }, () => new Array(numColumns).fill("")));
        }
    };

    const handleMax = () => {
        console.log(to);
    }


    return (
        <>
            <h1>
                {!chooseAlgorithm ? "Algoritmo de Asignación" : "Algoritmo de Transporte"}
            </h1>
            {!chooseAlgorithm ?
                <div className="matrix">
                    <div className="matrix-header">
                        <div className="matrix-header-cell"></div>
                        {Array.from({ length: numColumns }, (_, i) => (
                            <div className="matrix-header-cell" key={i}>
                                <input type="text" value={to[i]} onChange={(e) => {
                                    const value = e.target.value;
                                    setTo((prev) => {
                                        const newTo = [...prev];
                                        newTo[i] = value;
                                        return newTo;
                                    });
                                }} />
                            </div>
                        ))}
                    </div>
                    {Array.from({ length: numRows }, (_, i) => (
                        <div className="matrix-row" key={i}>
                            <div className="matrix-header-cell">
                                <input type="text" />
                            </div>
                            {Array.from({ length: numColumns }, (_, j) => (
                                <div className="matrix-cell" key={j}>
                                    <input type="text" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                :
                <div className="matrix">
                    <div className="matrix-header">
                        <div className="matrix-header-cell"></div>
                        {Array.from({ length: numColumns }, (_, i) => (
                            <div className="matrix-header-cell" key={i}>
                                <input type="text" />
                            </div>
                        ))}
                        <div className="matrix-header-cell">
                            Disponibilidad
                        </div>
                    </div>
                    {Array.from({ length: numRows }, (_, i) => (
                        <div className="matrix-row" key={i}>
                            <div className="matrix-header-cell">
                                <input type="text" />
                            </div>
                            {Array.from({ length: numColumns }, (_, j) => (
                                <div className="matrix-cell" key={j}>
                                    <input type="text" />
                                </div>
                            ))}
                            <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }}>
                                <input type="text" />
                            </div>
                        </div>
                    ))}
                    <div className="matrix-row">
                        <div className="matrix-header-cell" style={{ backgroundColor: "#f2f2f2", fontWeight: "bold" }}>
                            Demanda
                        </div>
                        {Array.from({ length: numColumns }, (_, i) => (
                            <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }} key={i}>
                                <input type="text" />
                            </div>
                        ))}
                        <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }}>
                        </div>
                    </div>
                </div>

            }

            <div className="controls-bottom-left">
                <button className="controls-botton" style={{ fontSize: 10 }} onClick={handleAlgorithm}>ALG</button>
                <button className="controls-botton" onClick={handleNumRows}>#F</button>
                <button className="controls-botton" onClick={handleNumColumns}>#C</button>
                <button className="controls-botton" style={{ fontSize: 10 }} onClick={handleMax}>MAX</button>
                <button className="controls-botton" style={{ fontSize: 10 }}>MIN</button>
                <button className="controls-botton">
                    <img
                        src={UploadIcon}
                        alt="A"
                        style={{
                            width: "20px",
                        }}
                    />
                </button>
                <button className="controls-botton">
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


export default AsignationTransport;