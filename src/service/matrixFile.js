// Description: This file contains the functions to download and upload a matrix file for the tranport and assignment problem.
const downloadMatrix = (algorithm, numRows, numColumns, matrix, filename) => {
    const data = {
        algorithm: algorithm,
        numRows: numRows,
        numColumns: numColumns,
        matrix: matrix,
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const uploadMatrix = (file) => {
    return new Promise((resolve, reject) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
            const data = JSON.parse(reader.result);
            // console.log("upload", data);
            resolve({
                algorithm: data.algorithm,
                numRows: data.numRows,
                numColumns: data.numColumns,
                matrix: data.matrix,
            });
        };
        reader.onerror = () => {
            reject(reader.error);
        };
    });
}

export default {
    downloadMatrix,
    uploadMatrix,
};