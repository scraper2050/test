import React, { useState } from "react";
import styles from "./bc-delete-billing-confirm.style";
import { makeStyles } from '@material-ui/core/styles';
import { refreshServiceTickets } from "actions/service-ticket/service-ticket.action";
import { DeleteBillingMethodAPI } from "api/billing-methods.api";
import { success } from "actions/snackbar/snackbar.action";
import { useDispatch, useSelector } from "react-redux";
import { setModalDataAction, closeModalAction } from "actions/bc-modal/bc-modal.action";
import { withStyles, DialogContent, Typography, Box, Fab } from "@material-ui/core";
import { getCompanyCards } from "api/company-cards.api";

interface Props {
  classes: any;
  data?: any;
}
const useStyles = makeStyles({
  buttons: {
    width: "100%"
  }
})

function BCDeleteBillingConfirmModal({classes, data}: Props):JSX.Element {
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false)
  
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

  const onDelete = () => {
    let formatedRequest = { cardId: data.cardId }
    DeleteBillingMethodAPI(formatedRequest)
      .then((response: any) => {
        dispatch(refreshServiceTickets(true));
        dispatch(getCompanyCards())
        setTimeout(() => {
          dispatch(
            setModalDataAction({
              data: {},
              type: "",
            })
          );
        }, 200);
        dispatch(closeModalAction());
        dispatch(success("Card deleted successfully"));
      })
      .catch((err: any) => {
        throw err;
      });
  }

  return (
    <DialogContent classes={{ root: classes.dialogContent }}>
      <Typography className={classes.description}>
          Are you sure you want to delete the card ending in ....{data.ending}
      </Typography>
      <Box className={classes.buttons}>
        <Fab
          classes={{
            root: classes.fabRoot,
          }}
          className={"serviceTicketBtn"}
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          type={"submit"}
          variant={"extended"}
          onClick={onDelete}
        >
          {"Delete"}
        </Fab>
      </Box>
    </DialogContent>
  )
}

export default withStyles(styles, { withTheme: true })(BCDeleteBillingConfirmModal);
