import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REGISTER_REQUEST,
	REGISTER_RESET,
	AUTH_REQUEST,
	AUTH_SUCCESS,
	AUTH_FAIL,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
} from '../actions/types';

export const authUserReducers = (
	state = { auth: false, loading: true, user: {} },
	action
) => {
	const { type, payload } = action;
	switch (type) {
		case AUTH_REQUEST:
			return { ...state, loading: true };
		case AUTH_SUCCESS:
			return { ...state, loading: false, auth: true, user: payload.user };
		case AUTH_FAIL:
			return { ...state, loading: false, auth: false, user: {} };
		default:
			return state;
	}
};

export const registerUserReducer = (state = { errors: {} }, action) => {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_REQUEST:
			return { ...state, loading: true };
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, loading: false };
		case REGISTER_FAIL:
			return { loading: false, errors: payload };
		case REGISTER_RESET:
			return { ...state, errors: {} };
		default:
			return state;
	}
};

export const loginUserReducer = (state = {}, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_REQUEST:
			return { ...state, loading: true };
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, loading: false };
		case LOGIN_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
