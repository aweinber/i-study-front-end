import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    gridItem: {
        border: "1px solid black"
    },
});

class Members extends Component {

    render() {
        const { classes } = this.props;

        const memberOne = ["Mike Senator", "Florida", "Means and Ways"];
        const memberTwo = ["Jill Congressperson", "Maine-2", "Foreign Affairs"];
        const members = [memberOne, memberTwo];

        let memberItems = [];

        for (let i = 0; i < members.length; i++) {
            let member = members[i];
            let memberListed = []
            for (let j = 0; j < member.length; j++) {  //iterate through member of
                if (j === 0) {
                    memberListed.push(<h2>{member[j]}</h2>);
                }
                else {
                    memberListed.push(<h6>{member[j]}</h6>)
                }
            }
            memberItems.push(<Grid item className={classes.gridItem}>{memberListed}</Grid>)
        }

        return(
            <div>
                <h1>Members</h1>
                <Grid container>
                    {memberItems}
                </Grid>
            </div>
        )
    }
}

export default (withStyles)(styles)(Members);
