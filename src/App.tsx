import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "AuthRoute";
import Header from "./app/Components/Header";

import LoginPage from "./app/Pages/Login";
import SignUpPage from "./app/Pages/SignUp";
import RecoverPage from "./app/Pages/Recover";

import DashboardPage from "./app/Pages/Dashboard";
import GroupPage from "./app/Pages/Employees/Group";
import TechnicianPage from "./app/Pages/Employees/Technician";
import ManagerPage from "./app/Pages/Employees/Manager";
import OfficeAdminPage from "./app/Pages/Employees/Office";
import CustomersPage from "./app/Pages/Customers";
import NewCustomerPage from "./app/Pages/Customers/NewCustomer";

// for dev
import TempPage from "./app/Pages/Customers/ScheduleJobs/tempPage";

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
                    path="/people/manager"
                    Component={ManagerPage}
                  />
                  <AuthRoute
                    exact
                    path="/employees/managers"
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
                    Component={TempPage}
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
