import React, {} from 'react'
import {
    makeStyles,
    Divider, Button
} from '@material-ui/core'

export interface BCPaperProps {
    children?: React.ReactNode
    title?: string
    titleUnderline?: boolean
    handlePositive?: VoidFunction
    handleNagative?: VoidFunction
    handleInformation?: VoidFunction
    positiveButtonLabel?: string
    nagativeButtonLabel?: string
    informationByttonLabel?: string
}
const BCPaper: React.FC<BCPaperProps> = ({title, children, titleUnderline, positiveButtonLabel, nagativeButtonLabel, informationByttonLabel, handlePositive, handleNagative, handleInformation}) => {
    const classes = useStyles()
    return (
        <div className={classes.paper}>
            <div className={classes.title}>{title}</div>
            <div className={classes.floatRight}>
            {handleNagative && <Button color='primary' onClick={handleNagative}>{nagativeButtonLabel?nagativeButtonLabel:'Cancel'}</Button>}
            {handlePositive && <Button color='primary' onClick={handlePositive} variant='contained' className={classes.button} size='small'>{positiveButtonLabel?positiveButtonLabel:'Okay'}</Button>}
            </div>
            {
                title && titleUnderline!==false &&
                <Divider variant='fullWidth' className={classes.divider}/>
            }
            {children}
            {
                handleInformation &&
                <Button
                    color='primary'
                    className={classes.button}
                    onClick={handleInformation}
                >
                    {informationByttonLabel}
                </Button>
            }
        </div>
    )
}
export default BCPaper

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(2),
        // paddingRight: '20%',
        textAlign: "left",
        padding: theme.spacing(3),
    },
    title: {
        fontSize: 24, color: 'black', display: 'inline-block', marginBottom: 23
    },
    divider: {
        height: theme.spacing(0.5),
        marginBottom: theme.spacing(2),
    },
    floatRight: {
        float: 'right'
    },
    button: {
        borderRadius: theme.spacing(5),
        marginRight: theme.spacing(2),
    }
}))