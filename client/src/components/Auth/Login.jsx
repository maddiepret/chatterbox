import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'

//css styling
const styles = {
	textField: {
		width: '100%',
		marginBottom: 5
	},
	btnBlock: {
		textAlign: 'center',
		marginBottom: 10,
		marginTop: 20
	}
}

class Login extends Component {
	constructor (props) {
        super(props)
        //create state for login
		this.state = {
			email: '',
			password: '',
			errors: {}
        }
        //bind functions
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	//user logged in can go to login route
	componentDidMount () {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/')
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}

		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/')
		}
	}
    //function to type into form
	handleChange (e) {
		this.setState({ [e.target.name]: e.target.value })
    }
    //function to regitster user and send them to login page(registerUser has the push method)
	handleSubmit (e) {
		e.preventDefault()
		const userData = {
			email: this.state.email,
			password: this.state.password,
		}
		//ehrn submit i will do the login user action
		this.props.loginUser(userData)

	}
	render () {
        const { classes } = this.props;
		const { errors } = this.state 


		return (
			<Paper style={{ padding: 15}}>
				<form onSubmit={this.handleSubmit}>
					<TextField
						type="email"
						label="Email"
						className={classes.textField}
						value={this.state.email}
						onChange={this.handleChange}
						name="email"
						helperText={errors.email ? errors.email : ''}
						error={errors.email ? true : false } 
					/>
					<TextField
						label="Password"
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						className={classes.textField}
						helperText={errors.password ? errors.password : ''}
						error={errors.password ? true : false }  
					/>
					<div className={classes.btnBlock}>
						<Button variant="outlined" type="submit">
							Submit
						</Button>
					</div>
				</form>
			</Paper>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect (mapStateToProps, { loginUser})(withRouter (withStyles(styles)(Login)));