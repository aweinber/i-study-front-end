import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        backgroundColor: 'blue',
        color: 'white'
    },
    input: {
        display: 'none',
    },
});

class Login extends Component {
    render() {
        const { classes } = this.props
        return(
            <div>
                <Button className={classes.button}>Login</Button>
                <Button color="primary" className={classes.button}>
                    Forgot Username
                </Button>
                <Button color="secondary" className={classes.button}>
                    Forgot Password
                </Button>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="flat-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="flat-button-file">
                    <Button component="span" className={classes.button}>
                        Upload
                    </Button>
                </label>
            </div>
        )
    }

};


export default (withStyles)(styles)(Login);

