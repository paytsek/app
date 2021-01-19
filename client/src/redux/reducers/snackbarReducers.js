import {
	ENQUEUE_SNACKBAR,
	CLOSE_SNACKBAR,
	REMOVE_SNACKBAR,
} from '../actions/types';

const snackbarReducer = (state = { notifications: [] }, action) => {
	const { type, notification, key, dismissAll } = action;
	switch (type) {
		case ENQUEUE_SNACKBAR:
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						key: key,
						...notification,
					},
				],
			};

		case CLOSE_SNACKBAR:
			return {
				...state,
				notifications: state.notifications.map((notification) =>
					dismissAll || notification.key === key
						? { ...notification, dismissed: true }
						: { ...notification }
				),
			};

		case REMOVE_SNACKBAR:
			return {
				...state,
				notifications: state.notifications.filter(
					(notification) => notification.key !== key
				),
			};

		default:
			return state;
	}
};

export default snackbarReducer;
