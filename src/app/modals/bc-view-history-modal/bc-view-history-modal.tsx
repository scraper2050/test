import React from 'react';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Typography, Box, Fab } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setModalDataAction, closeModalAction } from "actions/bc-modal/bc-modal.action";
import moment from 'moment';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';


const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: 2,
        },
        closeButton: {
            position: 'absolute',
            right: 1,
            top: 1,
            color: "grey",
        },
        buttons:{
            
            right:1,
            bottom:1,
            
        }

    });

const useStyles = makeStyles(styles);

interface Props {
    data?:any;
    children: React.ReactNode;
    classes: any;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: Props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const initialJobState = {
    customer: {
        _id: '',
    },
    description: '',
    employeeType: false,
    equipment: {
        _id: '',
    },
    dueDate: '',
    scheduleDate: null,
    scheduledEndTime: null,
    scheduledStartTime: null,
    technician: {
        _id: '',
    },
    contractor: {
        _id: '',
    },
    ticket: {
        _id: '',
    },
    type: {
        _id: '',
    },
    jobLocation: {
        _id: '',
    },
    jobSite: {
        _id: '',
    },
    jobRescheduled: false,
};
const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function ViewHistoryTable({ classes, data, job = initialJobState }: any): JSX.Element {
    const dispatch = useDispatch();
    const track = job.track ? job.track : [];
    const closeModal = () => {
        setTimeout(() => {
            dispatch(
                setModalDataAction({
                    data: {},
                    type: "",
                })
            );
        }, 200);
        dispatch(closeModalAction());
    }

    const onConfirm = () => {
        closeModal();
        data.handleOnConfirm();
    };
    const { loading } = useSelector(
        ({ employeesForJob }: any) => employeesForJob
    );
    const vendorsList = useSelector(({ vendors }: any) =>
        vendors.data.filter((vendor: any) => vendor.status <= 1)
    );
    const columns: any = [
        {
            Header: 'User',
            id: 'user',
            sortable: true,
            Cell({ row }: any) {
                const user = row.original.user;
                const vendor = vendorsList.find((v: any) => v.contractor.admin._id === row.original.user);
                const { displayName } = user?.profile || vendor?.contractor.admin.profile || '';
                return <div>{displayName}</div>;
            },
        },
        {
            Header: 'Date',
            id: 'date',
            sortable: true,
            Cell({ row }: any) {
                const dataTime = moment(new Date(row.original.date)).format(
                    'MM/DD/YYYY h:mm A'
                );
                return (
                    <div style={{ color: 'gray', fontStyle: 'italic' }}>
                        {`${dataTime}`}
                    </div>
                );
            },
        },
        {
            Header: 'Actions',
            id: 'action',
            sortable: true,
            Cell({ row }: any) {
                const splittedActions = row.original.action.split('|');
                const actions = splittedActions.filter((action: any) => action !== '');
                return (
                    <>
                        {actions.length === 0 ? (
                            <div />
                        ) : (
                            <ul className={classes.actionsList}>
                                {actions.map((action: any) => (
                                    <li>{action}</li>
                                ))}
                            </ul>
                        )}
                    </>
                );
            },
        },
    ];
    return (
        <DialogContent classes={{ root: classes.dialogContent }}>
                <div style={{ height: 180, overflowY: 'auto' }}>
                    <BCTableContainer
                        className={classes.tableContainer}
                        columns={columns}
                        initialMsg={'No history yet'}
                        isDefault
                        isLoading={loading}
                        onRowClick={() => { }}
                        pageSize={5}
                        pagination={true}
                        stickyHeader
                        tableData={[{ action: 'Service Ticket Created', date: job.createdAt, user: job.createdBy }, ...track].reverse()}
                    />
                </div>
            
            <Box className={classes.buttons}>
                <DialogActions>
                <Button autoFocus 
                    onClick={onConfirm}
                    type={"submit"}
                color="primary">
                    Cancel
                </Button>
                </DialogActions>
             </Box>
        </DialogContent>
    );
}
export default withStyles(styles, { withTheme: true })(ViewHistoryTable);

