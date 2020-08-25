import React, { useState, useEffect } from "react";
import TicketJobModal from "./TicketJobModal";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Action } from "redux-actions";
import { customersLoad } from "actions/customers";

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

interface PropsType {
  loadCustomers: () => Action<any>;
}

const TempPage = ({ loadCustomers }: PropsType) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(NEW_JOB);

  useEffect(() => {
    loadCustomers();
  }, []);

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
      <TicketJobModal
        modal={modal}
        modalMode={modalMode}
        cancel={() => setModal(false)}
        submit={() => setModal(false)}
      />
      {/* ************* */}
    </div>
  );
};

interface RootState {}

const mapStateToProps = (state: RootState) => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadCustomers: () => dispatch(customersLoad.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TempPage);
