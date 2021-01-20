import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from '../actions/types';

const snackbarReducer = (state = { notifications: [] }, action) => {
  const { type, notification, key, dismissAll } = action;
  switch (type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key,
            ...notification,
          },
        ],
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          dismissAll || notif.key === key ? { ...notif, dismissed: true } : { ...notif },
        ),
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(notif => notif.key !== key),
      };

    default:
      return state;
  }
};

export default snackbarReducer;
