import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'



class Members extends Component {

    render() {
        const { classes } = this.props;

        const memberOne = ["Mike Senator", "Florida", "Means and Ways"];
        const memberTwo = ["Jill Congressperson", "Maine-2", "Foreign Affairs"];
        const members = [memberOne, memberTwo];

        let memberItems = [];

        for (let i = 0; i < members.length; i++) {
            let member = members[i];
            let memberListed = [];
            for (let j = 0; j < member.length; j++) {  //iterate through member of
                if (j === 0) {
                    memberListed.push(<Typography className={classes.name}>{member[j]}</Typography>);
                }
                else {
                    memberListed.push(<Typography>{member[j]}</Typography>);
                }
            }
            memberItems.push(<Grid item className={classes.gridItem} xs={2}>{memberListed}</Grid>)
        }

        return(
            <div>
                <h1>Members</h1>
                <Grid container spacing={24} className={classes.gridContainer}>
                    {memberItems}
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

export default (withStyles)(styles)(Members);