import BCCircularLoader from './app/components/bc-circular-loader/bc-circular-loader';
import DateFnsUtils from '@date-io/date-fns';
import LogRocket from 'logrocket';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { SocketMessage } from 'helpers/contants';
import Config from './config';
import { io } from 'socket.io-client';
import { pushNotification } from 'actions/notifications/notifications.action';
const LoginPage = React.lazy(() => import('./app/pages/login/login'));
const SignUpPage = React.lazy(() => import('./app/pages/signup/signup'));
const RecoverPage = React.lazy(() => import('./app/pages/recover/recover'));
const MainPage = React.lazy(() => import('./app/pages/main/main'));

LogRocket.init('lt4dnt/blueclerk');

function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { user, token } = useSelector(({ auth }: any) => auth);
  const dispatch = useDispatch();
  const AuthenticationCheck =
    isAuthenticated
      ? <Switch>
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
      </Switch>

      : <Switch>
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
        <Route render={() => <Redirect to={'/'} />} />
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

  useEffect(() => {
    if (token) {
      // This is an example script - don't forget to change it!
      LogRocket.identify(user._id, {
        'email': user.auth.email,
        'name': user.profile.displayName

        /*
         * Add your own custom user variables here, ie:
         * 'subscriptionType': 'pro'
         */
      });

      const socket = io(`${Config.socketSever}`, {
        'extraHeaders': { 'Authorization': token }
      });
      socket.on(SocketMessage.CREATENOTIFICATION, data => {
        dispatch(pushNotification(data));
      });

      return () => {
        socket.close();
      };
    }
  }, [token]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className={'App'}>
          <Suspense fallback={<BCCircularLoader />}>
            {
              isLoading
                ? <BCCircularLoader />
                : AuthenticationCheck
            }
          </Suspense>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
