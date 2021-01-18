import { combineReducers } from 'redux';

import {
	registerUserReducer,
	authUserReducers,
} from '../reducers/userReducers';

const reducers = combineReducers({
	registerUser: registerUserReducer,
	authUser: authUserReducers,
});

export default reducers;
