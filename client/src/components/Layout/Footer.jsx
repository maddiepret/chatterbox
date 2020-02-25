import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	root: {
		textAlign: 'center',
		marginTop: 20
	}
}

const Footer = ({ classes }) => (
	<div className={classes.root}>
		~we love to chat~
	</div>
)


export default withStyles(styles)(Footer)