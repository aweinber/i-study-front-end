import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'


class Committees extends Component {
    render() {

        const { classes } = this.props;

        const committeeOne = ["Agriculture, Nutrition, And Forestry"];
        const committeeTwo = ["Foreign Relations"];
        const committeeThree = ["Armed Services"];
        const committees = [committeeOne, committeeTwo, committeeThree];

        let committeeMembers = [];

        //later add members to members to correct committee
        for (let i = 0; i < committees.length; i++) {
            let committee = committees[i];
            let committeeCreated = [];
            for (let j = 0; j < committee.length; j++) {
                if (j === 0) {
                    committeeCreated.push(<Typography className={classes.name}>{committee}</Typography>);
                    } else {
                    committeeCreated.push(<Typography>{committees}</Typography>);
                    }
            }

            committeeMembers.push(<Grid item className={classes.gridItem} xs={2}>{committeeCreated}</Grid>)
        }


        return(
            <div>
                <h1>Committee</h1>
                <Grid container spacing={24} className={classes.gridContainer}>
                    {committeeMembers}
                </Grid>
            </div>
        )
    }
}

const styles = theme => ({
    gridItem: {
        // border: "1px solid black",
        margin: "10px",
        padding: "5px",
        backgroundColor: "#bbbbc1",
        borderRadius: "5px"
    },
    gridContainer: {
        margin: "10px"
    },
    name: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        textAlign: 'center',
        fontSize: '15px'
    }
});

export default (withStyles)(styles)(Committees)
