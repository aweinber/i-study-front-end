import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

class HeaderMenu extends Component {
    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = event => {
        this.setState({ anchorEl: null })
    }

    render() {

        const { anchorEl } = this.state
        const { classes } = this.props

        return(
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.menuButton} >
                    Menu
                </Button>
                <Menu
                    id="main-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose} >
                    <Link to="/bills" className={classes.link}>
                        <MenuItem onClick={this.handleClose}>Bills</MenuItem>
                    </Link>
                    <Link to="/committees" className={classes.link}>
                        <MenuItem onClick={this.handleClose}>Committees</MenuItem>
                    </Link>
                    <Link to="/members" className={classes.link}>
                        <MenuItem onClick={this.handleClose}>Congresspeople</MenuItem>
                    </Link>
                    <Link to="/" className={classes.link}>
                        <MenuItem onClick={this.handleClose}>Congressional Influence</MenuItem>
                    </Link>
                    <Link to="/" className={classes.link}>
                        <MenuItem onClick={this.handleClose}>Statistics</MenuItem>
                    </Link>
                    <Link to="/about" className={classes.link}>
                        <MenuItem onClick={this.handleClose}>About Us</MenuItem>
                    </Link>
                    <Link to="/login" className={classes.link}>
                        <MenuItem onClick={this.handleClose}>Login</MenuItem>
                    </Link>


                </Menu>
            </div>

        )
    }
}

const styles = theme => ({
    menuButton: {
        color: 'white',
    },
    link: {
        textDecoration: 'none'
    }
})

export default (withStyles)(styles)(HeaderMenu);