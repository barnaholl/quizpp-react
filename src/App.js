import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Comonent/Home";
import Games from "./Comonent/Games"
import Navbar from './Comonent/Navbar';
import SoloGame from "./Comonent/SoloGame";
import SoloGamePlay from './Comonent/PlayGameModule/SoloGamePlay';
import Login from "./Comonent/Login";
import Registration from './Comonent/Registration';


const App = () => {
  return (
  
  <Router>
    <Navbar/>
    <Route exact path="/" component={Home} />
    <Route exact path="/games" component={Games} />
    <Route exact path="/soloGame/:gameId" component={SoloGame} />
    <Route exact path="/soloGamePlay/:gameId" component={SoloGamePlay} />
    <Route exact path="/soloGame/Play/:sessionId" component={SoloGamePlay} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/registration" component={Registration} />
  </Router>)
  
}

export default App;
