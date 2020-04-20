import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM} from '../types'
import axios from 'axios'
import {URI} from '../../config/api'
export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA })
    axios.get(`${URI}/screams`)
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

//like a scream
export const likeScream = (screamId) => dispatch => {
    axios.get(`${URI}/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}
//unlike a scream
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`${URI}/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}