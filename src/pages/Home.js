import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    gridContainer: {
        justify: 'center',
        alignItems: 'center',
    },
    gridItem: {
        justify: 'center',
        margin: '10px'
    },
    card: {
        minWidth: '400px',
        maxWidth: '600px',
        textAlign: 'center',
        margin: '10px'
    },
    list: {
        textAlign: 'center',
    },
    listItem: {
        color: 'blue',
        float: 'right',
    },
    link: {
        // border: '1px red dotted',
        textAlign: 'center',
        color: 'blue',
    },
    title: {
        textAlign: 'center',
        fontSize: '25px',
        borderBottom: '1px solid black',
        marginBottom: '5px'
    }


});



class Home extends Component {
    render() {
        const { classes } = this.props;
        return(
            <Grid container direction="column" className={classes.gridContainer}>
                <Grid item className={classes.gridItem}>

                    <Typography className={classes.title}>
                        Welcome to BearGov!
                    </Typography>
                    <Typography>
                        Explore Congressional bills, groups, or members by following these links!
                    </Typography>
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}><Link to="/bill-detail" className={classes.link}>Bills</Link></ListItem>
                        <ListItem className={classes.listItem}><Link to="/committee-members" className={classes.link}>Committee Members</Link></ListItem>
                        <ListItem className={classes.listItem}><Link to="/members" className={classes.link}>Members</Link></ListItem>
                    </List>

                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Home);