import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'



class Members extends Component {


    constructor(props) {
        super(props);
        this.state = {data: [], requestFailed: '', classes: {}};
        console.log('gold member')
    }
    //create control components and select field to toggle between 113 and 114, set these as state to choose congress fetch
    componentDidMount() {
        var request = new Request('http://localhost:3001/api/congress/113/members', {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'})
        });

        fetch(request)
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                this.setState({ data: data });
                console.log("DATA STORED");
                console.log(data);
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ requestFailed: true });
            });
    }

    render() {



        //const { classes } = this.state;

        //http://localhost:3001/api/congress/113/members
        //controled form
        let memberItems = [];
        this.state.data.forEach((member)=> {
            memberItems.push(<Typography>{member.firstName}</Typography>)
            memberItems.push(<Typography>{member.lastName}</Typography>)
        })

        // for (let i = 0; i < members.length; i++) {
        //     let member = members[i];
        //     let memberListed = [];
        //     for (let j = 0; j < member.length; j++) {  //iterate through member of
        //         if (j === 0) {
        //             memberListed.push(<Typography className={classes.name}>{this.state.data}</Typography>);
        //         }
        //         else {
        //             member.push(<Typography>{member[j]}</Typography>);
        //         }
        //     }
        //     memberItems.push(<Grid item className={classes.gridItem} xs={2}>{member}</Grid>)
        // }

        return(
            <div>
                <h1>Members</h1>
                <Grid container spacing={24}>
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
