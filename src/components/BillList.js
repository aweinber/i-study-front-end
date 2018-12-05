import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Bill from './Bill'
import { withStyles } from '@material-ui/core/styles'


class BillList extends Component {


    render() {
        const bills = this.props.billList;
        const {classes} = this.props;


        return(
            <Grid container className={classes.gridContainer}>
                {bills.map(bill => (
                    <Grid item key={bill.name} className={classes.gridItem}>
                        <h1>{bill.name}</h1>
                        <h5>{bill.description}</h5>
                        <h5>{bill.date}</h5>
                    </Grid>
                ))}
            </Grid>
        )
    }
}

const styles = theme => ({
    gridContainer: {
        margin: "10px"
    },
    gridItem: {
        // border: "1px solid black",
        margin: "10px",
        padding: "5px",
        backgroundColor: "#bbbbc1",
        borderRadius: "5px"
    },
    name: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        textAlign: 'center',
        fontSize: '15px'
    }
});


BillList.propTypes = {
    billList: PropTypes.array.isRequired
}

export default (withStyles)(styles)(BillList);
