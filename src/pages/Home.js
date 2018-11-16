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
        marginLeft: '50px',
        marginRight: '50px'
    },
    link: {
        color: 'blue',
    },
    title: {
        textAlign: 'center',
        fontSize: '25px',
        margin: '5px',
        textDecoration: 'underline'
    },
    subtitle: {
        textAlign: 'center',
        marginTop: '50px'
    },
    item: {
        marginTop: '30px',
        textAlign: 'center',
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

                <Grid item xs={4} className={classes.item}>
                    <Card className={classes.card}>
                        <CardActionArea href="/bills">
                            <CardMedia image={bills} className={classes.media} title="bills"/>
                            <Typography>
                                Bills
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={4} className={classes.item}>
                    <Card className={classes.card}>
                        <CardActionArea href="/committee-members">
                        <CardMedia image={committee} className={classes.media}/>
                        <Typography>
                            Committees
                        </Typography>
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={4} className={classes.item}>
                    <Card className={classes.card}>
                        <CardActionArea href="/members">
                        <CardMedia image={congressmen} className={classes.media}/>
                        <Typography>
                            Members
                        </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.subtitle}>
                        Explore Congressional bills, groups, or members by following these links or by searching below!
                    </Typography>
                </Grid>

            </Grid>
        )
    }
}

export default withStyles(styles)(Home);