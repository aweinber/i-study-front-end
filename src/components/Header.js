import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme =>  ({
    appBar: {
        backgroundColor: "grey",
        position: "static",
    },
    title: {
        color: 'white',
        // fontWeight: 'bold',
        fontFamily: 'gill sans'
    }
});

class Header extends Component {
    render() {
        const { classes } = this.props;
        return(
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" className={classes.title}>
                        Bear Gov
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }

}

export default withStyles(styles)(Header);