import AuthRoute from 'auth-route';
import BCHeader from './app/components/bc-header/bc-header';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const DashboardPage = React.lazy(() => import('./app/pages/dashboard/dashboard'));
const CustomersPage = React.lazy(() => import('./app/pages/customer/customer'));
const NewCustomerPage = React.lazy(() => import('./app/pages/customer/new-customer/new-customer'));
const InvoicingPage = React.lazy(() => import('./app/pages/invoicing/invoicing'));
const LoginPage = React.lazy(() => import('./app/pages/login/login'));
const SignUpPage = React.lazy(() => import('./app/pages/signup/signup'));
const RecoverPage = React.lazy(() => import('./app/pages/recover/recover'));
const TechnicianPage = React.lazy(() => import('./app/pages/employee/technician/technician'));
const OfficeAdminPage = React.lazy(() => import('./app/pages/employee/office/office'));
const ScheduleJobsPage = React.lazy(() => import('./app/pages/customer/schedule-jobs/schedule-jobs'));
const ManagerPage = React.lazy(() => import('./app/pages/employee/manager/manager'));
const GroupPage = React.lazy(() => import('./app/pages/employee/group/group'));

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className={'App'}>
          <Switch>
            <Suspense fallback={<div>
              {'Loading'}
            </div>}>
              <Route
                component={LoginPage}
                exact
                path={'/'}
              />
              <Route
                component={SignUpPage}
                path={'/signup'}
              />
              <Route
                component={RecoverPage}
                path={'/recover'}
              />
              <Route>
                <BCHeader />
                <div className={'main-container'}>
                  <Switch>
                    <AuthRoute
                      Component={DashboardPage}
                      exact
                      path={'/dashboard'}
                    />
                    <AuthRoute
                      Component={GroupPage}
                      exact
                      path={'/employees'}
                    />
                    <AuthRoute
                      Component={GroupPage}
                      exact
                      path={'/employees/group'}
                    />
                    <AuthRoute
                      Component={TechnicianPage}
                      exact
                      path={'/employees/technician'}
                    />
                    <AuthRoute
                      Component={ManagerPage}
                      exact
                      path={'/employees/manager'}
                    />
                    <AuthRoute
                      Component={OfficeAdminPage}
                      exact
                      path={'/employees/office'}
                    />

                    <AuthRoute
                      Component={CustomersPage}
                      exact
                      path={'/customers'}
                    />
                    <AuthRoute
                      Component={CustomersPage}
                      exact
                      path={'/customers/customer-list'}
                    />
                    <AuthRoute
                      Component={NewCustomerPage}
                      exact
                      path={'/customers/new-customer'}
                    />

                    <AuthRoute
                        Component={InvoicingPage}
                        path={'/invoicing'}
                    />

                    {/* For dev */}
                    <AuthRoute
                      Component={ScheduleJobsPage}
                      exact
                      path={'/customers/schedule'}
                    />
                  </Switch>
                </div>
              </Route>
            </Suspense>
          </Switch>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
