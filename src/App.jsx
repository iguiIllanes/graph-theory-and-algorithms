import Flow from "./components/Flow";
import "./styles/styles.css";
import './styles/Navbar.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "reactflow/dist/style.css";
// TODO: Remove the imports when routing is implemented
import React, { useState } from 'react';
import AssignmentTransport from './components/AssignmentTransport';
import TransportationMatrix from "./components/TransportationMatrix";
import Navbar from "./components/Sidebar";

const App = () => {
  // TODO: Remove the state when routing is implemented

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Flow/>} ></Route> 
      | <Route path='/Jhonson' element={<Flow/>} ></Route> 
      | <Route path='/Nortwest' component={<TransportationMatrix/>} />
        <Route path='/Asignacion' element={<AssignmentTransport/>} ></Route>
      </Routes>
    </Router>
  </>
  );
};

export default App;
