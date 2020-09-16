import BCPageLoader from 'app/components/bc-page-loader/bc-page-loader';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const LoginPage = React.lazy(() => import('./app/pages/login/login'));
const SignUpPage = React.lazy(() => import('./app/pages/signup/signup'));
const RecoverPage = React.lazy(() => import('./app/pages/recover/recover'));
const MainPage = React.lazy(() => import('./app/pages/main/main'));

function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const AuthenticationCheck =
    isAuthenticated
      ? <Switch>
        <Suspense fallback={<BCPageLoader />}>
          <Route
            component={MainPage}
            path={'/main'}
          />
          <Redirect to={'/main/dashboard'} />
        </Suspense>
      </Switch>

      : <Switch>
        <Suspense fallback={<BCPageLoader />}>
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
          <Redirect to={'/'} />
        </Suspense>
      </Switch>;

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, []);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className={'App'}>
          {
            isLoading
              ? <BCPageLoader />
              : AuthenticationCheck
          }
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
