import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Auth/Login'
import ListPost from './Posts/ListPost'

//use AddPost and ListPost components in Home page
 class Home extends Component {
    render() {
        const { isAuthenticated } = this.props
        return ( 
            <div>
                { isAuthenticated ? <ListPost/> : <Login/>}
                
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    //connect with isAuthenticated boolean from auth reducer
    isAuthenticated: !!state.auth.isAuthenticated,
})
export default connect(mapStateToProps)(Home)
