import React, { Component } from 'react'
import AddPost from './AddPost';
import Post from './Post';
import LoadingPosts from './LoadingPosts'
import { getPost } from '../../actions/postActions'
import { connect } from 'react-redux'


 class ListPost extends Component {

    componentDidMount(){
        this.props.getPost()
    }

    render() {
        const { list, loading } = this.props
        const items = list && list.map(el => <Post key={el._id} post={el} />)
        return (
            <div>
                <AddPost />
                { loading ? <LoadingPosts /> : items }   
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    list: state.post.list,
    loading: state.post.loading
})

export default connect(mapStateToProps, { getPost })(ListPost)
