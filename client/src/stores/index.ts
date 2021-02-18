import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = applyMiddleware(thunk, logger);

const store = createStore(appReducer, composeWithDevTools(middleware));

export default store;
