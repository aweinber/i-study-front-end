import React, { Component } from 'react';
import './App.css';
import BillsContainer from "./containers/BillsContainer";
import About from "./components/About";
import Committees from "./components/Committees";
import Login from "./old-pages/visual";
import MembersContainer from "./components/Members";
import Home from "./components/Home";
import Header from './components/Header';
import RollCallContainer from './containers/RollCallContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from "./old-pages/Register";




class App extends Component {


  render() {
    return (

        <Router>
            <div>
                <Header />
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/visual" component={Register} />
                <Route path="/bills" component={BillsContainer} />
                <Route path="/committees" component={Committees} />
                <Route path="/members" component={MembersContainer} />
                <Route path="/roll-call" component={RollCallContainer} />
            </div>
        </Router>

    );
  }
}

export default App;
