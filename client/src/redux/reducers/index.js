import { combineReducers } from 'redux';

import {
	registerUserReducer,
	authUserReducers,
	loginUserReducer,
} from '../reducers/userReducers';
import { usersListReducers } from './usersListReducers';

import snackbarReducer from '../reducers/snackbarReducers';

const reducers = combineReducers({
	registerUser: registerUserReducer,
	authUser: authUserReducers,
	loginUser: loginUserReducer,
	snackbar: snackbarReducer,
	usersList: usersListReducers,
});

export default reducers;
