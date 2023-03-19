// Description: This file contains the functions to download and upload a matrix file for the tranport and assignment problem.
const download = (algorithm, matrix, filename) => {
    const data = {
        algorithm: algorithm,
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

const upload = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = JSON.parse(event.target.result);
            resolve(data);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsText(file);
    });
}

export default {
    download: download,
    upload: upload,
};