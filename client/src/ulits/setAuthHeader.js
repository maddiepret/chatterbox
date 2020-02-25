import axios from 'axios'

//add token to axios header
export default function(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    } else {
        axios.defaults.headers.common['Authorization'] = null
    }
}