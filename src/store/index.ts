import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from 'sagas';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { apiRTK } from 'services/jobs';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const jobsMiddleware = apiRTK.middleware
const middleware = [sagaMiddleware, ReduxThunk,jobsMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
