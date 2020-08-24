import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './app/Components/Header';
import TempPage from './app/Customers/tempPage';

import GroupPage from './app/Pages/People/Group';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/signup" />
            <Route path="/recover" />
            <Route path="/customers/schedule" component={TempPage} />
            <Route path="/">
              <Header />
              <div className="main-container">
                <Switch>
                  <Route path="/people" component={GroupPage} />
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
