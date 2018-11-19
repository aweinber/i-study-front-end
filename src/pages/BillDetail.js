import React, { Component } from 'react'
<<<<<<< HEAD
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from "@material-ui/core";


class BillDetail extends Component {
    render() {
        const { classes } = this.props;

        const memberOne = ["Mike Senator", "  -Florida", "  -Means and Ways"];
        const memberTwo = ["Jill Congressperson", "  -Maine-2", "  -Foreign Affairs"];
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
=======
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

class BillDetail extends Component {
    render() {
        const { classes } = this.props

        const bill1 = ["H.R. 6784: Manage our Wolves Act",]
        const bill2 = ["H.R. 7115: 3D Firearms Prohibitions Act"]
        const bill3 = ["H.R. 5682: FIRST STEP Act"]
        const bills = [bill1, bill2, bill3]

        const formattedBills = []
        for (let i = 0; i < bills.length; i++) {
            const bill = bills[i]
            const billName = bill[0]
            const gridText = <Typography className={classes.name}>{billName}</Typography>
            formattedBills.push(<Grid item className={classes.gridItem}>{gridText}</Grid>)

        }
        return(
            <div>
                <h1>
                    Bill Detail
                </h1>
                <Grid container>
                    {formattedBills}
>>>>>>> 1e7867ab87fd3bc7a685bf3253bc4e5bd5630db4
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
<<<<<<< HEAD
        margin: "20px"
    },
    name: {
        fontWeight: 'bold',
        color: 'blue',
        textDecoration: 'underline',
        textAlign: 'center',
        fontSize: '18px'
    }
});

export default (withStyles)(styles)(BillDetail);
=======
        margin: "10px"
    },
    name: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        textAlign: 'center',
        fontSize: '15px'
    }
});

export default (withStyles)(styles)(BillDetail)
>>>>>>> 1e7867ab87fd3bc7a685bf3253bc4e5bd5630db4
