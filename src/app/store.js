import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createReducer from './reducers.js';

const configureStore = (initialState = {}, history) => {
	const middlewares = [
		thunkMiddleware,
	];

	// if (process.env.NODE_ENV !== 'production') {
	middlewares.push(createLogger());
	// }

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
