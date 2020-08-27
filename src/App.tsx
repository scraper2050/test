import AuthRoute from 'AuthRoute';
import CustomersPage from './app/Pages/Customers';
import DashboardPage from './app/Pages/Dashboard';
import DateFnsUtils from '@date-io/date-fns';
import GroupPage from './app/Pages/Employees/Group';
import Header from './app/Components/Header';
import LoginPage from './app/Pages/Login';
import ManagerPage from './app/Pages/Employees/Manager';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import NewCustomerPage from './app/Pages/Customers/NewCustomer';
import OfficeAdminPage from './app/Pages/Employees/Office';
import React from 'react';
import RecoverPage from './app/Pages/Recover';
import SignUpPage from './app/Pages/SignUp';
import TechnicianPage from './app/Pages/Employees/Technician';
import TempPage from './app/Pages/Customers/ScheduleJobs/tempPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className={'App'}>
          <Switch>
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
              <Header />
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

                  {/* For dev */}
                  <AuthRoute
                    Component={TempPage}
                    exact
                    path={'/customers/schedule'}
                  />
                </Switch>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
