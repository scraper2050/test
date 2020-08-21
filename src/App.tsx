import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './app/Components/Header';

import GroupPage from './app/Pages/People/Group';
import TechnicianPage from './app/Pages/People/Technician';
import ManagerPage from './app/Pages/People/Manager';
import OfficeAdminPage from './app/Pages/People/OfficeAdmin';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" />
          <Route path="/recover" />
          <Route path="/">
            <Header />
            <div className="main-container">
              <Switch>
                <Route exact path="/people" component={GroupPage} />
                <Route exact path="/people/group" component={GroupPage} />
                <Route exact path="/people/technician" component={TechnicianPage} />
                <Route exact path="/people/manager" component={ManagerPage} />
                <Route exact path="/people/officeadmin" component={OfficeAdminPage} />
              </Switch>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
