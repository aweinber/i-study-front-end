import React, { Component } from 'react'
import firebaseConnect from 'react-redux-firebase'
import connect from 'redux'




class RollCallItem extends Component {
    render() {
        const rolls = this.props.rolls

        return(
            <div>
                {rolls}
            </div>
        )
    }
}

compose(
    firebaseConnect( props => [
        {path : 'projects'}
        ]),
    connect( (state, props) => ({
        rolls: state.firebase.data.roll_call
    }))
)