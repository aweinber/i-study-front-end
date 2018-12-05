import React, { Component } from 'react';
import './App.css';
import BillsContainer from "./containers/BillsContainer";
import About from "./components/About";
import Committees from "./components/Committees";
import Login from "./old-pages/Login";
import Members from "./components/Members";
import Home from "./components/Home";
import Header from './components/Header';
import RollCallContainer from './containers/RollCallContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'




class App extends Component {
  render() {
    return (

        <Router>
            <div>
                <Header />
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/bills" component={BillsContainer} />
                <Route path="/committees" component={Committees} />
                <Route path="/members" component={Members} />
                <Route path="/roll-call" component={RollCallContainer} />
            </div>
        </Router>

    );
  }
}

export default App;
