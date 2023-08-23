import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        margin: '20px auto',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        maxWidth: '600px',
    },
    tableContainer: {
        borderRadius: '10px',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: theme.palette.grey[500],
    },
    closeIcon: {
        fontSize: '20px',
    },
    tableHead: {
        background: theme.palette.primary.main,
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
}));

function viewHistoryTable() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton className={classes.closeButton}>
                <CloseIcon className={classes.closeIcon} />
            </IconButton>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="custom table">
                    <TableHead>
                        <TableRow className={classes.tableHead}>
                            <TableCell>User</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        </TableRow>
                   </TableBody>
                </Table>
            </TableContainer>
            </div>
    );
}

export default viewHistoryTable;
