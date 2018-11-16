import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

class Home extends Component {
    render() {
        return(
            <div>
                <Header/>
                <ul>
                    <li><Link to="/bill-detail">Bill Detail</Link></li>
                    <li><Link to="/committee-members">Committee Members</Link></li>
                    <li><Link to="/influence">Influence</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/members">Members</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/roll-call">Roll Call</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        )
    }
}

export default Home;