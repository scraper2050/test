import React, {useEffect} from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import useStyles from './invoicing.styles'
import {useDispatch, useSelector} from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from "react-router-dom"

import {getJobs} from '../../../actions/invoicing/invoicing.action'
import {RootState} from '../../../reducers'
import BCPaper from '../../components/bc-paper/bc-paper'

export interface JobsProps {
}

const Jobs: React.FC<JobsProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const jobs = useSelector((state: RootState) => state.jobState)
    useEffect(()=>{
        dispatch(getJobs())
    }, [])
    const handleClickNew = ()=>{
        history.push('jobs/new')
    }
    return (
        <div className={classes.jobs}>
            <Button
                variant='contained'
                color='primary'
                className={classes.button}
                size='small'
                startIcon={<AddIcon/>}
                onClick={handleClickNew}
                >
                Create Invoice
            </Button>
            <BCPaper
                title={`Completed Jobs(${jobs.jobs?.length || 0})`}
            >
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell variant='head'>Job ID</TableCell>
                            <TableCell variant='head' align="right">Technician</TableCell>
                            <TableCell variant='head' align="right">Customer</TableCell>
                            <TableCell variant='head' align="right">Type</TableCell>
                            <TableCell variant='head' align="right">Schedule</TableCell>
                            <TableCell variant='head' align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.jobs?.map(job => (
                            <TableRow key={job._id}>
                                <TableCell variant='body' component="th" scope="row">{job._id}</TableCell>
                                <TableCell variant='body' align="right"></TableCell>
                                <TableCell variant='body' align="right">{job.customer}</TableCell>
                                <TableCell variant='body' align="right">{job.type}</TableCell>
                                <TableCell variant='body' align="right">`{job.startTime}-{job.endTime}`</TableCell>
                                <TableCell variant='body' align="right"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </BCPaper>
            <Backdrop className={classes.backdrop} open={jobs.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
export default Jobs