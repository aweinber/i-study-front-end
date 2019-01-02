import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import HeaderMenu from './HeaderMenu'
import HomeIcon from '@material-ui/icons/Home'

const styles = theme =>  ({
    root: {

    },
    appBar: {
        backgroundColor: "#274386",
        position: "static",

    },
    title: {
        color: 'white',
        fontFamily: 'gill sans',
        flex: '1',
        fontSize: '30px'
    },
    iconLink: {
        color: 'white',
        marginRight: '10px'
    },
    menu: {
        marginLeft: 'auto',
        marginRight: '-12px'
    }
});

class Header extends Component {
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <Link to="/" className={classes.iconLink}><HomeIcon/></Link>
                        <Typography className={classes.title}>Bear Gov</Typography>
                        <HeaderMenu className={classes.menu}/>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

}



export default withStyles(styles)(Header);