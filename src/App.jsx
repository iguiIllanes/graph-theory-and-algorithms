import Flow from "./components/Flow";
import "./styles/styles.css";

import "reactflow/dist/style.css";
// TODO: Remove the imports when routing is implemented
import React, { useState } from 'react';
import TestSorts from './components/TestSorts';
import Sorts from './components/Sorts';

const App = () => {
  // TODO: Remove the state when routing is implemented
  const [showFlow, setShowFlow] = useState(true);
  const handleToggle = () => {
    setShowFlow(!showFlow);
    


  };

  return (
    <div className="App">
      {/* <button onClick={handleToggle} className="toggle"> {showFlow ? 'Algoritmos de Asignacion/Transporte' : 'Grafos / Johnson'} </button>
      {showFlow ? <Flow /> : <AssignmentTransport />} */}

      <button onClick={handleToggle} className="toggle"> {showFlow ? 'SORTS' : 'Grafos / Johnson'} </button>
      {showFlow ? <Flow /> : <TestSorts/>} 
    </div>
  );
};

export default App;
