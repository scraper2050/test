import React, {useState, useEffect} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {useSelector} from 'react-redux'
import {RootState} from '../../../reducers'
import {SnackbarType} from '../../../reducers/snackbar.type'

const BCSnackbar: React.FC = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }
    const snackbar = useSelector((state: RootState) => state.snackbarState)
    useEffect(()=>{
        if (snackbar) {
            setOpenSnackbar(true)
        }
    }, [snackbar])
    if (snackbar) {
        return (
            <Snackbar open={openSnackbar} autoHideDuration={snackbar.type==SnackbarType.ERROR?null:6000} onClose={handleCloseSnackbar}>
                <Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbar.type}>
                {snackbar.message}
                </Alert>
            </Snackbar>
        )
    }
    return null
}
export default BCSnackbar