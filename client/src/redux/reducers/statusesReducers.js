import { STATUS_LIST_REQUEST, STATUS_LIST_SUCCESS, STATUS_LIST_FAIL } from '../types';

export const statusesListReducers = (state = { statuses: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case STATUS_LIST_REQUEST:
      return { ...state, loading: true };
    case STATUS_LIST_SUCCESS:
      return { ...state, loading: false, statuses: payload.statuses };
    case STATUS_LIST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const x = () => {};
