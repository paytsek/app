import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REGISTER_REQUEST,
	AUTH_REQUEST,
	AUTH_SUCCESS,
	AUTH_FAIL,
} from '../actions/types';

export const authUserReducers = (
	state = { auth: false, loading: true },
	action
) => {
	const { type } = action;
	switch (type) {
		case AUTH_REQUEST:
			return { ...state, loading: true };
		case AUTH_SUCCESS:
			return { ...state, loading: false, auth: true };
		case AUTH_FAIL:
			return { ...state, loading: false, auth: false };
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
			return { ...state, loading: false, userInfo: payload.user };
		case REGISTER_FAIL:
			return { loading: false, errors: payload };
		default:
			return state;
	}
};
