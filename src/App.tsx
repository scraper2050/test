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
import { setMessageRead, setNewMessage } from 'actions/chat/bc-chat.action';
import { RootState } from 'reducers';
const LoginPage = React.lazy(() => import('./app/pages/auth/login/login'));
const SignUpPage = React.lazy(() => import('./app/pages/auth/signup/signup'));
const RecoverPage = React.lazy(() => import('./app/pages/recover/recover'));
const MainPage = React.lazy(() => import('./app/pages/main/main'));

// LogRocket.init('lt4dnt/blueclerk');

function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { user, token } = useSelector(({ auth }: RootState) => auth);

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
    if (localStorage.getItem('token') && localStorage.getItem('tokenCustomerAPI')) {
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
    if (token && user.auth) {
      LogRocket.identify(user._id, {
        'email': user.auth.email,
        'name': user.profile.displayName
      });

      const socket = io(`${Config.socketServer}`, {
        'extraHeaders': { 'Authorization': token }
      });
      socket.on(SocketMessage.CREATENOTIFICATION, data => {
        dispatch(pushNotification(data));
      });

      const customerSocket = io(`${Config.customerSocketServer}`, {
        'extraHeaders': { 'Authorization': token }
      });
      customerSocket.on(SocketMessage.CREATENOTIFICATION, data => {
        if (data.notificationType === 'NewChat') {
          dispatch(pushNotification(data));
          // console.log(modal.type, modal.data?.jobRequest?._id, data.metadata.jobRequest?._id)
          // if (modal.type === 'view-job-request-modal') {
          dispatch(setNewMessage(data.metadata));
          // }
        } else if (data.notificationType === 'ChatRead') {
          dispatch(setMessageRead(data.metadata));
        } else {
          dispatch(pushNotification(data));
        }

      });

      return () => {
        socket.close();
        customerSocket.close();
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
