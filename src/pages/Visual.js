import { initialize } from "../viz_D3/andrewPhillipsScript.js"
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
    button: {
        backgroundColor: 'blue',
        color: 'white',
    },
    input: {
        display: 'none',
    },
});

class Visual extends Component {
    componentDidMount() {
        initialize();
    }
    render() {
        const { classes } = this.props
        return(
            <div>
                <div className="graph" />
            </div>
        )
    }

};


export default (withStyles)(styles)(Visual);

