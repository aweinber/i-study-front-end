import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import bills from "../static/bill.jpg";
import committee from "../static/committee.jpg";
import congressmen from "../static/congressmen.jpg"

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
    link: {
        color: 'blue',
    },
    title: {
        textAlign: 'center',
        fontSize: '25px',
        borderBottom: '1px solid black',
        marginBottom: '5px'
    },
    subtitle: {
        textAlign: 'center'
    },
    item: {
        textAlign: 'center'
    },
    media: {
        height: '400px'
    }

});



class Home extends Component {
    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={24}>

                <Grid item xs={12}>
                    <Typography className={classes.title}>Welcome to BearGov!</Typography>
                    <Typography className={classes.subtitle}>
                        Explore Congressional bills, groups, or members by following these links!
                    </Typography>
                </Grid>

                <Grid item xs={4} className={classes.item}>
                    <Card>
                        <CardActionArea href="/bills">
                            <CardMedia image={bills} className={classes.media} title="bills"/>
                            <Typography>
                                Bills
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={4} className={classes.item}>
                    <Card>
                        <CardActionArea href="/committee-members">
                        <CardMedia image={committee} className={classes.media}/>
                        <Typography>
                            Committees
                        </Typography>
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={4} className={classes.item}>
                    <Card>
                        <CardActionArea href="/members">
                        <CardMedia image={congressmen} className={classes.media}/>
                        <Typography>
                            Members
                        </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>

            </Grid>
        )
    }
}

export default withStyles(styles)(Home);