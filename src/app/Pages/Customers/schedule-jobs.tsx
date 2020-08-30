import React, { useState, useEffect } from "react";
import CreateJob from "app/Modals/create-job";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Action } from "redux-actions";
import { loadCustomersActions } from "actions/customer/customer.action";
import { loadJobTypesActions } from "actions/job-type/job-type.action";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    alignSelf: "center",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

const NEW_TICKET = 0;
const NEW_JOB = 1;

interface Props {
  loadCustomers: () => Action<any>;
  loadJobTypesActions: () => Action<any>;
}

const ScheduleJobsPage = ({ loadCustomers, loadJobTypesActions }: Props) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(NEW_JOB);

  useEffect(() => {
    loadCustomers();
    loadJobTypesActions();
  }, [loadCustomers, loadJobTypesActions]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => {
              setModal(true);
              setModalMode(NEW_TICKET);
            }}
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            New Ticket
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => {
              setModal(true);
              setModalMode(NEW_JOB);
            }}
            variant="contained"
            color="secondary"
            className={classes.margin}
          >
            New Job
          </Button>
        </ThemeProvider>
      </div>
      {/* component use */}
      <CreateJob
        modal={modal}
        modalMode={modalMode}
        cancel={() => setModal(false)}
        submit={() => setModal(false)}
      />
      {/* ************* */}
    </div>
  );
};

// const mapStateToProps = (state: {}) => ({
//   // blabla: state.blabla,
// });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadCustomers: () => dispatch(loadCustomersActions.fetch()),
  loadJobTypesActions: () => dispatch(loadJobTypesActions.fetch()),
});

export default connect(null, mapDispatchToProps)(ScheduleJobsPage);
