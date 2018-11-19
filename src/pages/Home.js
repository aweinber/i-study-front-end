import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import bills from "../static/bill.jpg";
import committee from "../static/committee.jpg";
import congressmen from "../static/congressmen.jpg"




class Home extends Component {
    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={24}>

                <Grid item xs={4} className={classes.item}>
                    <Card className={classes.card}>
                        <CardActionArea href="/bills">
                            <CardMedia image={bills} className={classes.media} title="bills"/>
                            <div className={classes.linkBackground}>
                            <Typography className={classes.linkNames}>
                                Bills
                            </Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={4} className={classes.item}>
                    <Card className={classes.card}>
                        <CardActionArea href="/committees">
                        <CardMedia image={committee} className={classes.media}/>
                        <div className={classes.linkBackground}>
                            <Typography className={classes.linkNames}>
                                Committees
                            </Typography>
                        </div>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={4} className={classes.item}>
                    <Card className={classes.card}>
                        <CardActionArea href="/members">
                        <CardMedia image={congressmen} className={classes.media}/>
                            <div className={classes.linkBackground}>
                                <Typography className={classes.linkNames}>
                                    Congresspeople
                                </Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.subtitle}>
                        Explore by bill, committee, or individual congressperson by following the above links.
                    </Typography>
                </Grid>

            </Grid>
        )
    }
}

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
    },
    linkBackground: {
        height: '50px',
        backgroundColor: '#274386'
    },
    linkNames: {
        color: 'white',
        fontSize: '16px',
        paddingTop: '12px',
    }

});


export default withStyles(styles)(Home);