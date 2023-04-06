import Flow from "./components/Flow";
import "./styles/styles.css";

import "reactflow/dist/style.css";
// TODO: Remove the imports when routing is implemented
import React, { useState } from 'react';
import TestSorts from './components/TestSorts';
import Sorts from './components/Sorts';
import AssignmentTransport from './components/AssignmentTransport';

const App = () => {
  // TODO: Remove the state when routing is implemented
  const [selectScreen, setSelectScreen] = useState(0);

  const handleGraph = () => {
    setSelectScreen(0);
  };

  const handleSorts = () => {
    setSelectScreen(1);
  };

  const handleAssignmentTransport = () => {
    setSelectScreen(2);
  };

  return (
    <div className="App">
      {/* <button onClick={handleToggle} className="toggle"> {showFlow ? 'Algoritmos de Asignacion/Transporte' : 'Grafos / Johnson'} </button>
      {showFlow ? <Flow /> : <AssignmentTransport />} */}

      {/* <button onClick={handleToggle} className="toggle"> {showFlow ? 'SORTS' : 'Grafos / Johnson'} </button>
      {showFlow ? <Flow /> : <TestSorts />} */}
      <button onClick={handleGraph} className="toggle1"> Grafos / Johnson </button>
      <button onClick={handleAssignmentTransport} className="toggle2"> Algoritmos de Asignacion/Transporte </button>
      <button onClick={handleSorts} className="toggle3"> Algoritmos de Ordenamiento </button>
      {selectScreen === 0 ? <Flow /> : selectScreen === 1 ? <TestSorts /> : <AssignmentTransport />}
    </div>
  );
};

export default App;
