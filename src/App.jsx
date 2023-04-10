import Flow from "./components/Flow";
import "./styles/styles.css";
import "./styles/Navbar.css";
import "reactflow/dist/style.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Sidebar";
import TestSort from "./components/TestSorts";
import AssignmentScreen from "./components/AssignmentScreen";
import NorthWest from "./components/NorthWestScreen";

/*
 * Generate the App component.
 * @returns {JSX.Element} The App component.
 */
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Flow />}></Route>
          <Route path="/Jhonson" element={<Flow />}></Route>
          <Route path="/Asignacion" element={<AssignmentScreen />}></Route>
          <Route path="/Northwest" element={<NorthWest />}></Route>
          <Route path="/TestSort" element={<TestSort />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
