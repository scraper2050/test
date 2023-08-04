import React from "react";
import styles from "./bc-duplicate-invoice-confirm-modal.style";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { setModalDataAction, closeModalAction } from "actions/bc-modal/bc-modal.action";
import { withStyles, DialogContent, Typography, Box, Fab } from "@material-ui/core";

interface Props {
  classes: any;
  data?: any;
}
const useStyles = makeStyles({
  buttons: {
    width: "100%"
  }
})

function BCDuplicateInvoiceConfirmModal({classes, data}: Props):JSX.Element {
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
        Are you sure you want to duplicate this invoice?
      </Typography>
      <Box className={classes.buttons}>
        <Fab
          classes={{
            root: classes.fabRoot,
          }}
          className={"serviceTicketBtn"}
          onClick={() => closeModal()}
          variant={"extended"}
        >
          {"Cancel"}
        </Fab>
        <Fab
          classes={{
            root: classes.fabRoot,
          }}
          color={"primary"}
          type={"submit"}
          variant={"extended"}
          onClick={onConfirm}
        >
          {"Yes"}
        </Fab>
      </Box>
    </DialogContent>
  )
}

export default withStyles(styles, { withTheme: true })(BCDuplicateInvoiceConfirmModal);
