import React, {useState, useEffect} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {useSelector} from 'react-redux'
import {SnackbarType} from '../../../reducers/snackbar.type'
import { info, error } from '../../../actions/snackbar/snackbar.action';
import { useDispatch } from 'react-redux';

const BCSnackbar: React.FC = () => {
    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => {
        dispatch(info(''))
        setOpenSnackbar(false)
    }
    const snackbar = useSelector((state: any) => state.snackbar)
    useEffect(()=>{
        if (snackbar.message) {
            setOpenSnackbar(true)
        }
    }, [snackbar])
    if (snackbar.message) {
        return (
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbar.type}>
                {snackbar.message}
                </Alert>
            </Snackbar>
        )
    }
    return null
}
export default BCSnackbar