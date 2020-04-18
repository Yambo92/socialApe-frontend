import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Scream from '../components/Scream'

import {URI} from '../config/api'
export class home extends Component {
    state = {
        screams: null
    }
    componentDidMount(){
        axios.get(`${URI}/screams`)
            .then(res => {
                // console.log(res.data);
                
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err.message))
    }
    render() {
        let recentScreamsMarkup = this.state.screams ? (
        this.state.screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
        ) : (
            <p>Loading...</p>
        )
        return (
           <Grid container spacing={2}>
               <Grid item sm={8} xs={12} >
                   {recentScreamsMarkup}
               </Grid>
               <Grid item sm={4} xs={12}>
                   <p>Profile...</p>
               </Grid>
           </Grid>
        )
    }
}

export default home