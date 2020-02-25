import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { addPost } from '../../actions/postActions'

const styles = {
    paper:{
        padding: 8
    },
    textField:{
        width: '100%'
    },
    button:{
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: 'yellowgreen',
        color: '#fff',
        '&:hover':{
            color: '#bf07ac'
        }
    }
    
}

 class AddPost extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              text:''
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);

     }

     handleChange(e){
         this.setState({
             text: e.target.value
         })
     }
     handleSubmit(e){
        e.preventDefault();

        const postData = {
            text: this.state.text
        }
        this.props.addPost(postData)
        this.setState({
            text: ''
        })
     }
     
    render() {
        const {classes} = this.props
        return (
            <Paper className={classes.paper}>
                <TextField 
                    className={classes.textField}
                    label="What's new?"
                    multiline
                    rows="4"
                    onChange={this.handleChange}
                    value={this.state.text}
                />
                <Button 
                    variant="outlined"
                    className={classes.button}
                    onClick={this.handleSubmit}
                >
                    Send
                </Button>
            </Paper>
        )
    }
}

export default connect(null, {addPost}) (withStyles(styles)(AddPost))
