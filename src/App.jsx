import Flow from "./components/Flow";
import "./styles/styles.css";

import "reactflow/dist/style.css";
// TODO: Remove the imports when routing is implemented
import React, { useState } from "react";
import TestSorts from "./components/TestSorts";
import AssignmentTransport from "./components/AssignmentTransport";
import Button from "./components/Button";

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

  /*
   * Selects the screen to be displayed
   * DEPENDS ON: selectScreen state
   * @retuns {JSX} The screen to be displayed
   */
  const handleSelectScreen = () => {
    switch (selectScreen) {
      case 0:
        return <Flow />;
      case 1:
        return <TestSorts />;
      case 2:
        return <AssignmentTransport />;
      default:
        return <Flow />;
    }
  };

  return (
    <div className="app-container">
      <div className="selector">
        <h1>Lista de algoritmos</h1>
        <Button onClick={handleGraph}> Grafos / Johnson </Button>
        <Button onClick={handleAssignmentTransport}>
          Algoritmos de Asignacion/Transporte
        </Button>
        <Button onClick={handleSorts}> Algoritmos de Ordenamiento </Button>
      </div>
      <div className="App">{handleSelectScreen()}</div>
    </div>
  );
};

export default App;
