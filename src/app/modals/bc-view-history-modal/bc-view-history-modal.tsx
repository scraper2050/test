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
import { useDispatch } from "react-redux";
import { setModalDataAction, closeModalAction } from "actions/bc-modal/bc-modal.action";



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

function ViewHistoryTable({ classes, data }: Props): JSX.Element {
    const dispatch = useDispatch();

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
    }
    return (
        <DialogContent classes={{ root: classes.dialogContent }}>
            <Typography className={classes.description}>
                Table in Progress
            </Typography>
            <Box className={classes.buttons}>
    
                <Fab
                    classes={{
                        root: classes.fabRoot,
                    }}
                    color={"primary"}
                    type={"submit"}
                    variant={"extended"}
                    onClick={onConfirm}
                >
                    {"Cancel"}
                </Fab>
            </Box>
        </DialogContent>
    );
}
export default withStyles(styles, { withTheme: true })(ViewHistoryTable);

