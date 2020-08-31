import { Action } from 'redux-actions';
import Button from '@material-ui/core/Button';
import CreateJob from 'app/modals/create-job';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loadCustomersActions } from 'actions/customer/customer.action';
import { loadJobTypesActions } from 'actions/job-type/job-type.action';
import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles
} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  'margin': {
    'alignSelf': 'center',
    'margin': theme.spacing(1)
  }
}));

const theme = createMuiTheme({
  'palette': {
    'primary': {
      'contrastText': '#fff',
      'dark': '#002884',
      'light': '#757ce8',
      'main': '#3f50b5'
    },
    'secondary': {
      'contrastText': '#fff',
      'dark': '#002884',
      'light': '#757ce8',
      'main': '#3f50b5'
    }
  }
});

const NEW_TICKET = 0;
const NEW_JOB = 1;

interface Props {
  loadCustomers: () => Action<any>;
  loadJobTypesActions: () => Action<any>;
}

function ScheduleJobsPage({ loadCustomers, loadJobTypesActions }: Props) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(NEW_JOB);

  useEffect(
    () => {
      loadCustomers();
      loadJobTypesActions();
    },
    [loadCustomers, loadJobTypesActions]
  );

  return (
    <div
      style={{
        'height': '100vh',
        'width': '100%'
      }}>
      <div
        style={{
          'alignContent': 'center',
          'display': 'flex',
          'height': '100vh',
          'justifyContent': 'center',
          'width': '100%'
        }}>
        <ThemeProvider theme={theme}>
          <Button
            className={classes.margin}
            color={'primary'}
            onClick={() => {
              setModal(true);
              setModalMode(NEW_TICKET);
            }}
            variant={'contained'}>
            {'New Ticket'}
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            className={classes.margin}
            color={'secondary'}
            onClick={() => {
              setModal(true);
              setModalMode(NEW_JOB);
            }}
            variant={'contained'}>
            {'New Job'}
          </Button>
        </ThemeProvider>
      </div>
      {/* Component use */}
      <CreateJob
        cancel={() => setModal(false)}
        modal={modal}
        modalMode={modalMode}
        submit={() => setModal(false)}
      />
      {/* ************* */}
    </div>
  );
}

/*
 * Const mapStateToProps = (state: {}) => ({
 *   // blabla: state.blabla,
 * });
 */

const mapDispatchToProps = (dispatch: Dispatch) => ({
  'loadCustomers': () => dispatch(loadCustomersActions.fetch()),
  'loadJobTypesActions': () => dispatch(loadJobTypesActions.fetch())
});

export default connect(
  null,
  mapDispatchToProps
)(ScheduleJobsPage);
