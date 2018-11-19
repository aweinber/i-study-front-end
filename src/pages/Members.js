import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'


class Members extends Component {


    render() {
        const memberOne = ["Mike Senator", "Florida", "Means and Ways"];
        const memberTwo = ["Jill Congressperson", "Maine-2", "Foreign Affairs"];
        const members = [memberOne, memberTwo];

        let memberItems = [];
        members.forEach((member) => memberItems.push(<Grid item>{member}</Grid>));

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

export default Members;
