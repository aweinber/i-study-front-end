import React, { Component } from 'react'
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

export default (withStyles)(styles)(BillDetail)