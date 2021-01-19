import axios from 'axios';

import {
	REGISTER_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	AUTH_FAIL,
	AUTH_REQUEST,
	AUTH_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
} from './types';
import notification from '../../utils/notification';

export const authUser = (token) => async (dispatch) => {
	dispatch({ type: AUTH_REQUEST });

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	dispatch({ type: AUTH_REQUEST });

	try {
		const { data } = await axios.get('/api/v1/auth', config);

		dispatch({ type: AUTH_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: AUTH_FAIL });
	}
};

export const registerUser = (userData) => async (dispatch) => {
	dispatch({ type: REGISTER_REQUEST });

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const { data } = await axios.post(
			'/api/v1/auth/register',
			userData,
			config
		);
		dispatch({ type: REGISTER_SUCCESS, payload: data });
		dispatch(authUser(data.token));
	} catch (error) {
		const { errors } = error.response.data;
		dispatch({ type: REGISTER_FAIL, payload: errors });
	}
};

export const loginUser = (userData) => async (dispatch) => {
	dispatch({ type: LOGIN_REQUEST });

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const { data } = await axios.post('/api/v1/auth/login', userData, config);

		dispatch({ type: LOGIN_SUCCESS, payload: data });
		dispatch(authUser(data.token));
	} catch (error) {
		const { message } = error.response.data.errors;

		dispatch({ type: LOGIN_FAIL });
		dispatch(notification('error', message, dispatch));
	}
};
