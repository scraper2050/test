import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "AuthRoute";
import Header from "./app/components/Header";

import LoginPage from "./app/pages/Login";
import SignUpPage from "./app/pages/SignUp";
import RecoverPage from "./app/pages/Recover";

import DashboardPage from "./app/pages/Dashboard";
import GroupPage from "./app/pages/Employees/Group";
import TechnicianPage from "./app/pages/Employees/Technician";
import ManagerPage from "./app/pages/Employees/Manager";
import OfficeAdminPage from "./app/pages/Employees/Office";
import CustomersPage from "./app/pages/Customers";
import NewCustomerPage from "./app/pages/Customers/NewCustomer";

// for dev
import ScheduleJobsPage from "./app/pages/Customers/schedule-jobs";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/recover" component={RecoverPage} />

            <Route>
              <Header />
              <div className="main-container">
                <Switch>
                  <AuthRoute
                    exact
                    path="/dashboard"
                    Component={DashboardPage}
                  />
                  <AuthRoute exact path="/employees" Component={GroupPage} />
                  <AuthRoute
                    exact
                    path="/employees/group"
                    Component={GroupPage}
                  />
                  <AuthRoute
                    exact
                    path="/employees/technician"
                    Component={TechnicianPage}
                  />
                  <AuthRoute
                    exact
                    path="/employees/manager"
                    Component={ManagerPage}
                  />
                  <AuthRoute
                    exact
                    path="/employees/office"
                    Component={OfficeAdminPage}
                  />

                  <AuthRoute
                    exact
                    path="/customers"
                    Component={CustomersPage}
                  />
                  <AuthRoute
                    exact
                    path="/customers/customer-list"
                    Component={CustomersPage}
                  />
                  <AuthRoute
                    exact
                    path="/customers/new-customer"
                    Component={NewCustomerPage}
                  />

                  {/* for dev */}
                  <AuthRoute
                    exact
                    path="/customers/schedule"
                    Component={ScheduleJobsPage}
                  />
                </Switch>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
};
export default App;
