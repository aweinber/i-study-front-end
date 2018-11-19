import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const styles = theme =>  ({
    appBar: {
        backgroundColor: "#274386",
        position: "static",
    },
    title: {
        color: 'white',
        fontFamily: 'gill sans',
        textDecoration: 'none'
    },
    aboutLink: {
        color: 'white',
        fontFamily: 'Arial',
        textDecoration: 'none',
        float: 'right'
    }
});

class Header extends Component {
    render() {
        const { classes } = this.props;
        return(
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" className={classes.title}>
                        <Link to="/" className={classes.title}> Bear Gov </Link>
                    </Typography>
                    <Typography className={classes.aboutLink}>
                        <Link to="/about" className={classes.aboutLink}> About </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }

}



export default withStyles(styles)(Header);