import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./app/Components/Header";
import TempPage from "./app/Pages/Customers/ScheduleJobs/tempPage";

import LoginPage from "./app/Pages/Login";
import SignUpPage from "./app/Pages/SignUp";
import RecoverPage from "./app/Pages/Recover";
import GroupPage from "./app/Pages/People/Group";
import TechnicianPage from "./app/Pages/People/Technician";
import ManagerPage from "./app/Pages/People/Manager";
import OfficeAdminPage from "./app/Pages/People/OfficeAdmin";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/recover" component={RecoverPage} />
            <Route path="/customers/schedule" component={TempPage} />
            <Route path="/">
              <Header />
              <div className="main-container">
                <Switch>
                  <Route exact path="/people" component={GroupPage} />
                  <Route exact path="/people/group" component={GroupPage} />
                  <Route
                    exact
                    path="/people/technician"
                    component={TechnicianPage}
                  />
                  <Route exact path="/people/manager" component={ManagerPage} />
                  <Route
                    exact
                    path="/people/officeadmin"
                    component={OfficeAdminPage}
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
