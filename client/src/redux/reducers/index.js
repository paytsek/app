import { combineReducers } from 'redux';

import {
	registerUserReducer,
	authUserReducers,
	loginUserReducer,
	usersListReducers,
	userDetailsReducers,
	updateUserDetailsReducers,
} from '../reducers/usersReducers';

import snackbarReducer from '../reducers/snackbarReducers';

const reducers = combineReducers({
	registerUser: registerUserReducer,
	authUser: authUserReducers,
	loginUser: loginUserReducer,
	snackbar: snackbarReducer,
	usersList: usersListReducers,
	userDetails: userDetailsReducers,
	updateUserDetails: updateUserDetailsReducers,
});

export default reducers;
