import React, { useState } from "react";
import styles from "./bc-make-admin-employee-confirm.style";
import { makeStyles } from '@material-ui/core/styles';
import { updateEmployeeRole } from 'actions/employee/employee.action';
import { success, info, error } from "actions/snackbar/snackbar.action";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
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

function BCMakeAdminConfirmModal({classes, data}: Props):JSX.Element {
  const dispatch = useDispatch();
	const location = useLocation<any>();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  
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

	const renderGoBack = (location: any) => {
    const baseObj = location;

    const stateObj = baseObj && baseObj['currentPage'] !== undefined ? {
      prevPage: baseObj['currentPage']
    } : {}

    history.push({
      pathname: `/main/admin/employees`,
      state: stateObj
    });

  }

  const makeAdmin = async () => {
		let response: any;
    try {
      response = await dispatch(updateEmployeeRole(data));
      if (response.message === "Employee Role Has Been Updated Successfully!") {
				await renderGoBack(location.state)
				dispatch(success("Employee role updated successfully."));
				setTimeout(() => {
          dispatch(
            setModalDataAction({
              data: {},
              type: "",
            })
          );
        }, 200);
        dispatch(closeModalAction());
      } else if (!!response?.message) {
        dispatch(info(response.message));
      }
    } catch (err) {
      dispatch(error('Something went wrong, please try other role'));
    }
  }

  return (
    <DialogContent classes={{ root: classes.dialogContent }}>
      <Typography className={classes.description}>
        Are you sure you want to make this employee an Admin?
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
          {"No"}
        </Fab>
        <Fab
          classes={{
            root: classes.fabRoot,
          }}
          color={"primary"}
          disabled={isSubmitting}
          type={"submit"}
          variant={"extended"}
          onClick={makeAdmin}
        >
          {"Yes"}
        </Fab>
      </Box>
    </DialogContent>
  )
}

export default withStyles(styles, { withTheme: true })(BCMakeAdminConfirmModal);
