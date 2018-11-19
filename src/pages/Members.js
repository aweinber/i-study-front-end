import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'


class Members extends Component {


    render() {
        const memberOne = ["Mike Senator", "Florida", "Means and Ways"];
        const memberTwo = ["Jill Congressperson", "Maine-2", "Foreign Affairs"];
        const members = [memberOne, memberTwo];

        let memberItems = [];
        // members.forEach((member) => memberItems.push(<Grid item>{member}</Grid>));
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
            memberItems.push(<Grid item>{memberListed}</Grid>)
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

export default Members;
