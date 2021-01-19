import axios from '../../axios';
import notification from '../../utils/notification';

import {
	USERS_LIST_SUCCESS,
	USERS_LIST_REQUEST,
	USERS_LIST_FAIL,
} from './types';

export const getUsersList = () => async (dispatch) => {
	dispatch({ type: USERS_LIST_REQUEST });

	try {
		const { data } = await axios.get('/users');
		dispatch({ type: USERS_LIST_SUCCESS, payload: data });
	} catch (error) {
		const { message } = error.response.data.errors;
		dispatch({ type: USERS_LIST_FAIL });
		dispatch(notification('error', message, dispatch));
	}
};
