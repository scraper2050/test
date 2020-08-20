import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './app/Components/Header';

import GroupPage from './app/Pages/People/Group';

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
                <Route path="/people" component={GroupPage} />
              </Switch>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
