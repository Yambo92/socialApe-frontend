import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Scream from '../components/Scream'
import Profile from '../components/Profile'
import {URI} from '../config/api'
import {connect} from 'react-redux'
import { getScreams } from '../redux/actions/dataAction'
export class home extends Component {
  
    componentDidMount(){
        this.props.getScreams();
    }
    render() {
        const { data: { screams, loading } } = this.props;
        let recentScreamsMarkup = !loading ? (
        screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
        ) : (
            <p>Loading...</p>
        )
        return (
           <Grid container spacing={2}>
               <Grid item sm={8} xs={12} >
                   {recentScreamsMarkup}
               </Grid>
               <Grid item sm={4} xs={12}>
                   <Profile />
               </Grid>
           </Grid>
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(home)
