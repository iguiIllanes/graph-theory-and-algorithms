import Flow from "./components/Flow";
import "./styles/styles.css";

import "reactflow/dist/style.css";
// TODO: Remove the imports when routing is implemented
import React, { useState } from 'react';
import AssignmentTransport from './components/AssignmentTransport';

const App = () => {
  // TODO: Remove the state when routing is implemented
  const [showFlow, setShowFlow] = useState(true);
  const handleToggle = () => {
    setShowFlow(!showFlow);
  };

  return (
    <div className="App">
      {/* <button onClick={handleToggle} className="toggle"> {showFlow ? 'Algoritmos de Asignacion/Transporte' : 'Grafos / Johnson'} </button> */}
      {showFlow ? <Flow /> : <AssignmentTransport />}
    </div>
  );
};

export default App;
