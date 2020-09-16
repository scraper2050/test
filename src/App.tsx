import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

const LoginPage = React.lazy(() => import('./app/pages/login/login'));
const SignUpPage = React.lazy(() => import('./app/pages/signup/signup'));
const RecoverPage = React.lazy(() => import('./app/pages/recover/recover'));
const MainPage = React.lazy(() => import('./app/pages/main/main'));

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
              <Route
                component={MainPage}
                path={'/main'}
              />
            </Suspense>
          </Switch>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
