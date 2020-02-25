import React from 'react'
import { withStyles } from '@material-ui/styles'
import { CircularProgress } from '@material-ui/core'

const styles ={
    load:{
        textAlign: 'center',
        marginTop: 25,
        width: '100%'
    },
    loadIcon:{
        color: '#bf07ac'
    }
}

function LoadingPosts({classes}) {
    return (
        <div className={classes.load}>
            <CircularProgress className={classes.loadIcon} />
            
        </div>
    )
}

export default withStyles(styles)(LoadingPosts)

