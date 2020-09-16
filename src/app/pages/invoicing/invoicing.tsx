import BCSnackbar from '../../components/bc-snackbar/bc-snackbar';
import InvoiceManage from './invoice-manage';
import JobsRoute from './job';
import React, {} from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import createBCTheme from './create-theme';
import useStyles from './invoicing.styles';
import { Redirect, Route, Switch } from 'react-router-dom';

const theme = createBCTheme({});

function InvoicingScreen() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.invoicing}>
        <div className={classes.invoicingContent}>
          <Switch>
            <Route
              exact
              path={'/main/invoicing'}>
              <Redirect to={'/main/invoicing/jobs'} />
            </Route>
            <Route path={'/main/invoicing/jobs'}>
              <JobsRoute />
            </Route>
            <Route path={'/main/invoicing/manage'}>
              <InvoiceManage />
            </Route>
          </Switch>
          <BCSnackbar />
        </div>
      </div>
    </ThemeProvider>
  );
}
export default InvoicingScreen;
