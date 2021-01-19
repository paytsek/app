import { combineReducers } from 'redux';

import {
	registerUserReducer,
	authUserReducers,
	loginUserReducer,
} from '../reducers/userReducers';

import snackbarReducer from '../reducers/snackbarReducers';

const reducers = combineReducers({
	registerUser: registerUserReducer,
	authUser: authUserReducers,
	loginUser: loginUserReducer,
	snackbar: snackbarReducer,
});

export default reducers;
