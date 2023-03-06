// The React.JS code for the download method:

const download = (nodes, edges, filename) => {
  const data = {
    nodes: nodes,
    edges: edges,
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

// TODO: fix upload
const upload = (event) => {
  return new Promise((resolve, reject) => {
    console.log("sexo");
    const file = event.target.files[0];
    console.log("sexo2");
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
      const data = JSON.parse(reader.result);
      // console.log("upload", data);
      resolve({
        nodes: data.nodes,
        edges: data.edges,
      });
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
};

export default {
  download: download,
  upload: upload,
};
