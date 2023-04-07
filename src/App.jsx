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
      <button onClick={handleGraph} className="toggle1"> Grafos / Johnson </button>
      <button onClick={handleAssignmentTransport} className="toggle2"> Algoritmos de Asignacion/Transporte </button>
      <button onClick={handleSorts} className="toggle3"> Algoritmos de Ordenamiento </button>
      {selectScreen === 0 ? <Flow /> : selectScreen === 1 ? <TestSorts /> : <AssignmentTransport />}
    </div>
  );
};

export default App;
