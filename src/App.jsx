import Flow from "./components/Flow";
import "./styles/styles.css";
import './styles/Navbar.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "reactflow/dist/style.css";
// TODO: Remove the imports when routing is implemented
import React, { useState } from 'react';
import AssignmentTransport from './components/AssignmentTransport';
import Navbar from "./components/Sidebar";
import TestSort from "./components/TestSorts";
import AssignmentScreen from "./components/AssignmentScreen";

/*
 * Generate the App component.
 * @param {object} props - The props passed to the component.
 * @param {object} props.sidebar - The sidebar state.
 * @param {function} props.setSidebar - The sidebar state setter.
 * @param {object} props.SidebarData - The sidebar data.
 * @param {object} props.Flow - The Flow component.
 * @param {object} props.AssignmentScreen - The AssignmentScreen component.
 * @param {object} props.AssignmentTransport - The AssignmentTransport component.
 * @param {object} props.TestSort - The TestSort component.
 */
const App = () => {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Flow/>} ></Route> 
        <Route path='/Jhonson' element={<Flow/>} ></Route> 
        <Route path='/AsignacionM' element={<AssignmentTransport/>} ></Route>
        <Route path='/AsignacionN' element={<AssignmentScreen/>} ></Route>
        <Route path='/TestSort' element={<TestSort/>} ></Route>
      </Routes>
    </Router>
  </>
  );
};

export default App;
