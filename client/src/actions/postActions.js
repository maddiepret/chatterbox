import axios from 'axios'
import {
    ADD_POSTS,
    LOADING_POSTS,
    GET_POSTS
} from '../constants'

//post methode to add text
export const addPost = postData => dispatch => {
    //use axios to connect to server
    axios.post('http://localhost:5000/api/posts/add', postData)
        .then(res => dispatch({
            type: ADD_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

//get methode to access/get text
export const getPost = () => dispatch => {
    dispatch(loadPosts)
        //use axios to connect to server
    axios.get('http://localhost:5000/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}
export const getPostsByFollowingUsers = () => dispatch => {
    //use axios to connect to server
    axios.get('http://localhost:5000/api/posts/following')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const loadPosts = () => {
    return {
        type: LOADING_POSTS
    }
}