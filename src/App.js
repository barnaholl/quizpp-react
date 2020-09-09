import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Comonent/Home";
import Games from "./Comonent/Games"
import Navbar from './Comonent/Navbar';


const App = () => {
  return (
  
  <Router>
    <Navbar/>
    <Route exact path="/" component={Home} />
    <Route exact path="/games" component={Games} />
  </Router>)
  
}

export default App;
