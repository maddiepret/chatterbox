import axios from 'axios'
import {
    LOAD_PROFILE,
    GET_PROFILE,
    GET_POSTS,
    LOADING_POSTS,
    FOLLOW,
    UNFOLLOW
} from '../constants'

export const getUserProfile = (userId) => dispatch => {
    dispatch(loadProfile())
        //use axios to connect to server
    axios.get(`http://localhost:5000/api/users/${userId}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const refreshUserProfile = (userId) => dispatch => {
    //use axios to connect to server
    axios.get(`http://localhost:5000/api/users/${userId}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const getPostsByUserId = (userId) => dispatch => {
    dispatch(loadPosts())
        //use axios to connect to server
    axios.get(`http://localhost:5000/api/posts/${userId}`)
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const loadProfile = () => {
    return {
        type: LOAD_PROFILE
    }
}

export const loadPosts = () => {
    return {
        type: LOADING_POSTS
    }
}

export const followUser = (userId) => dispatch => {
    //use axios to connect to server
    axios.post('http://localhost:5000/api/users/follow', { userId })
        .then(res => dispatch({
            type: FOLLOW,
            payload: res.data.userId
        }))
        .catch(err => console.log(err))
}

export const unfollowUser = (userId) => dispatch => {
    //use axios to connect to server
    axios.post('http://localhost:5000/api/users/unfollow', { userId })
        .then(res => dispatch({
            type: UNFOLLOW,
            payload: res.data.userId
        }))
        .catch(err => console.log(err))
}

export const searchUser = (searchData, history) => dispatch => {
    //use axios to connect to server
    axios.post('http://localhost:5000/api/users/search', searchData)
        .then(res => {
            history.push(`/profile/${res.data.userId}`)
        })
        .catch(err => history.push('/search'))
}