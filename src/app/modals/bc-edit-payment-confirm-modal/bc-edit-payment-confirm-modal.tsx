import React from "react";
import styles from "./bc-edit-payment-confirm-modal.style";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { setModalDataAction, closeModalAction } from "actions/bc-modal/bc-modal.action";
import { withStyles, DialogContent, Typography, Box, Fab } from "@material-ui/core";
import { modalTypes } from "../../../constants";

interface Props {
  classes: any;
  data?: any;
}
const useStyles = makeStyles({
  buttons: {
    width: "100%"
  }
})

function BCEditPaymentConfirmModal({classes, data}: Props):JSX.Element {
  const dispatch = useDispatch();
  const isBulk = data?.data?.isBulk;
  
  const closeModal = () => {
    if(data?.data?.fromHistory){
      dispatch(setModalDataAction({
        'data': {
          invoiceID: data.data.invoice._id,
          modalTitle: 'Payment History',
          removeFooter: false,
        },
        'type': modalTypes.PAYMENT_HISTORY_MODAL
      }));
    } else {
      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    }
  }
  
  const onConfirm = () => {
    dispatch(setModalDataAction(data));
  }

  return (
    <DialogContent classes={{ root: classes.dialogContent }}>
      <Typography className={classes.description}>
        Are you sure you want to edit this {isBulk ? 'bulk ' : ''}payment?
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

export default withStyles(styles, { withTheme: true })(BCEditPaymentConfirmModal);
