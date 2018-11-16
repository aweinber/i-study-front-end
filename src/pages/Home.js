import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    link: {
        color: 'blue',
        fontSize: '15px'
    }
});



class Home extends Component {
    render() {
        const { classes } = this.props;
        return(
            <div>
                <List>
                    <ListItem className={classes.link}><Link to="/bill-detail">Bill Detail</Link></ListItem>
                    <ListItem className={classes.link}><Link to="/committee-members">Committee Members</Link></ListItem>
                    <ListItem className={classes.link}><Link to="/members">Members</Link></ListItem>
                    <ListItem className={classes.link}><Link to="/about">About</Link></ListItem>
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(Home);