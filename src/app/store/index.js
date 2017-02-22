import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from './reducers.js';

const configureStore = (initialState = {}) => {
  const middlewares = [
    thunkMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  );

  return store;
};

export default configureStore;
