import React, { Component } from 'react';
import './App.css';
import About from './pages/About.js';
import BillDetail from './pages/BillDetail';
import CommitteeMembers from './pages/CommitteeMembers'
import Influence from './pages/Influence'
import Login from './pages/Members'
import Register from './pages/Register'
import RollCall from './pages/RollCall'
import Search from './pages/Search'

import { BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path="/about" component={About} />
                <Route path="/bill-detail" component={BillDetail} />
                <Route path="/committee-members" component={CommitteeMembers} />
                <Route path="/influence" component={Influence} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/roll-call" component={RollCall} />
                <Route path="/search" component={Search} />
            </div>
        </Router>
    );
  }
}

export default App;
