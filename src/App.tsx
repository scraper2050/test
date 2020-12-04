import BCCircularLoader from './app/components/bc-circular-loader/bc-circular-loader';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useSelector } from 'react-redux';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const LoginPage = React.lazy(() => import('./app/pages/login/login'));
const SignUpPage = React.lazy(() => import('./app/pages/signup/signup'));
const RecoverPage = React.lazy(() => import('./app/pages/recover/recover'));
const MainPage = React.lazy(() => import('./app/pages/main/main'));

function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const user = useSelector(({ auth }: any) => auth.user);
  const AuthenticationCheck =
    isAuthenticated
      ? <Switch>
        <Suspense fallback={<BCCircularLoader />}>
          <Route
            component={MainPage}
            path={'/main'}
          />
          <Route
            exact
            path={'/'}
            render={() => {
              return (
                <Redirect to={'/main/dashboard'} />
              );
            }}
          />
        </Suspense>
      </Switch>

      : <Switch>
        <Suspense fallback={<BCCircularLoader />}>
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
            render={() => {
              return (
                <Redirect to={'/'} />
              );
            }}
          />
        </Suspense>
      </Switch>;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } else {
      setIsAuthenticated(false);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [user]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className={'App'}>
          {
            isLoading
              ? <BCCircularLoader />
              : AuthenticationCheck
          }
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
