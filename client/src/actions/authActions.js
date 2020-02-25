import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../constants';
import setAuthHeader from '../ulits/setAuthHeader'

//login as registered user
export const loginUser = (userData) => dispatch => {
    //use axios to connect to server
    axios.post('http://localhost:5000/api/users/login', userData)
        //if serever, send token
        .then(res => {
            //when we get token, save to local storage
            const { token } = res.data
            localStorage.setItem('jwtToken', token)
            setAuthHeader(token)
                //after header is set, use getCurrentUser action to get user data from server
            dispatch(getCurrentUser())
        })
        //if error - add msg to errorReducer
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//register new user with backend api
export const registerUser = (userData, history) => dispatch => {
    //use axios to connect to server
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//get current user functoin with backend api
export const getCurrentUser = () => dispatch => {
        //use axios to connect to server
        axios.get('http://localhost:5000/api/users')
            .then(res => dispatch(setCurrentUser(res.data)))
    }
    //function setCurrentUser use the SET_CURRENT_USER type
export const setCurrentUser = (data) => {
    return ({
        type: SET_CURRENT_USER,
        payload: data
    })
}

//create logout function
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthHeader()
    dispatch(setCurrentUser())
}