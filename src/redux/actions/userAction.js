import { SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SET_UNAUTHENTICATED,  LOADING_USER} from '../types'
import {URI} from '../../config/api'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`${URI}/login`, userData)
    .then(res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.replace('/')
    })
    .catch(err => {
       dispatch({
           type: SET_ERRORS,
           payload: err.response.data
       })
    })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`${URI}/signup`, newUserData)
    .then(res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.replace('/')
    })
    .catch(err => {
       dispatch({
           type: SET_ERRORS,
           payload: err.response.data
       })
    })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['authorization']
    dispatch({type: SET_UNAUTHENTICATED})
}

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.get(`${URI}/user`)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post(`${URI}/user/image`, formData)
        .then(res => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post(`${URI}/user`, userDetails)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', `Bearer ${token}`)
    axios.defaults.headers.common['authorization'] = FBIdToken
}