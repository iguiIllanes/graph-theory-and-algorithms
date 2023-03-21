import React from "react";

const TransportationMatrix = ({ inputMatrix, allocationMatrix, totalCost, minMax }) => {
    const numRows = inputMatrix.length - 2;
    const numColumns = inputMatrix[0].length - 2;
    const supply = Array.from(inputMatrix.slice(1, numRows + 1), row => parseInt(row[numColumns + 1]));
    const demand = Array.from(inputMatrix[numRows + 1].slice(1, numColumns + 1), val => parseInt(val));


    return (
        <>
            <h1 style={{ textTransform: "uppercase" }}>
                {(!minMax) ? "Minimización" : "Maximización"} con el algoritmo de transporte
            </h1>
            <br />
            <div className="matrix">
                <div className="matrix-header">
                    <div className="matrix-header-cell"></div>
                    {
                        Array.from({ length: numColumns }, (_, i) => (
                            <div className="matrix-header-cell" key={i}>
                                {inputMatrix[0][i + 1]}
                            </div>
                        ))
                    }
                    <div className="matrix-header-cell">
                        {/* <p style={{ fontSize: 10 }}>
                            DISPONIBILIDAD
                        </p> */}
                    </div>
                </div>
                {Array.from({ length: numRows }, (_, i) => (
                    <div className="matrix-row" key={i}>
                        <div className="matrix-header-cell" style={{ backgroundColor: "#ccc", fontWeight: "bold" }}>
                            {inputMatrix[i + 1][0]}
                        </div>
                        {Array.from({ length: numColumns }, (_, j) => (
                            <div className="matrix-cell" key={j}>
                                {(allocationMatrix[i][j] !== null) ? `${inputMatrix[i + 1][j + 1]} (${allocationMatrix[i][j]})` : `${inputMatrix[i + 1][j + 1]} (0)`}
                            </div>
                        ))}
                        <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }}>
                            {supply[i]}
                        </div>
                    </div>
                ))}
                <div className="matrix-row">
                    <div className="matrix-header-cell" style={{ backgroundColor: "#ccc", fontWeight: "bold" }}>
                        {/* <p style={{ fontSize: 10 }}>
                            DEMANDA
                        </p> */}
                    </div>
                    {Array.from({ length: numColumns }, (_, i) => (
                        <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }} key={i}>
                            {demand[i]}
                        </div>
                    ))}
                    <div className="matrix-cell" style={{ backgroundColor: "#f2f2f2" }}>
                    </div>
                </div>
            </div>
            <h2>
                Referencia: Costo (Cantidad)
            </h2>
            <br />
            <h1 style={{ textTransform: "uppercase" }}>
                Costo total: {totalCost} unidades
            </h1>
        </>
    );
};

export default TransportationMatrix;