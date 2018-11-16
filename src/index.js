import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import About from './pages/About.js';
import BillDetail from './pages/BillDetail';
import CommitteeMembers from './pages/CommitteeMembers'
import Influence from './pages/Influence'
import Login from './pages/Members'
import Register from './pages/Register'
import Members from './pages/Members'
import RollCall from './pages/RollCall'
import Search from './pages/Search'
import Home from './pages/Home'



import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

ReactDOM.render((
    <Router>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/bill-detail" component={BillDetail} />
            <Route path="/committee-members" component={CommitteeMembers} />
            <Route path="/influence" component={Influence} />
            <Route path="/login" component={Login} />
            <Route path="/members" component={Members} />
            <Route path="/register" component={Register} />
            <Route path="/roll-call" component={RollCall} />
            <Route path="/search" component={Search} />
        </Switch>
    </Router>
    ),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
