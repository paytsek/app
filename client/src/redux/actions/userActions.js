import axios from 'axios';
import {
	REGISTER_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	AUTH_FAIL,
	AUTH_REQUEST,
	AUTH_SUCCESS,
} from './types';

export const authUser = (token) => async (dispatch) => {
	dispatch({ type: AUTH_REQUEST });

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	dispatch({ type: AUTH_REQUEST });

	try {
		await axios.get('/api/v1/auth', config);
		dispatch({ type: AUTH_SUCCESS });
	} catch (error) {
		dispatch({ type: AUTH_FAIL });
	}
};

export const registerUser = (userData) => async (dispatch) => {
	dispatch({ type: REGISTER_REQUEST });

	try {
		const { data } = await axios.post('/api/v1/auth/register', userData);
		dispatch({ type: REGISTER_SUCCESS, payload: data });
		console.log(data);
	} catch (error) {
		const { errors } = error.response.data;
		dispatch({ type: REGISTER_FAIL, payload: errors });
	}
};
