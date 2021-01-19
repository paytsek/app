import {
	USERS_LIST_FAIL,
	USERS_LIST_SUCCESS,
	USERS_LIST_REQUEST,
} from '../actions/types';

export const usersListReducers = (state = { users: [] }, action) => {
	const { type, payload } = action;

	switch (type) {
		case USERS_LIST_REQUEST:
			return { ...state, loading: true };
		case USERS_LIST_SUCCESS:
			return { ...state, loading: false, users: payload.users };
		case USERS_LIST_FAIL:
			return { ...state, loading: false, users: [] };
		default:
			return state;
	}
};
