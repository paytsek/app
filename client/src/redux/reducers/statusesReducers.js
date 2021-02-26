import {
  STATUS_LIST_REQUEST,
  STATUS_LIST_SUCCESS,
  STATUS_LIST_FAIL,
  STATUS_CREATE_REQUEST,
  STATUS_CREATE_SUCCESS,
  STATUS_CREATE_FAIL,
  STATUS_CREATE_RESET,
  STATUS_DELETE_REQUEST,
  STATUS_DELETE_SUCCESS,
  STATUS_DELETE_FAIL,
} from '../types';

export const statusesListReducers = (state = { statuses: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case STATUS_LIST_REQUEST:
      return { ...state, loading: true };
    case STATUS_LIST_SUCCESS:
      return { ...state, loading: false, statuses: payload.statuses };
    case STATUS_LIST_FAIL:
      return { ...state, loading: false };
    case STATUS_CREATE_SUCCESS:
      return { ...state, statuses: [...state.statuses, payload.status] };
    case STATUS_DELETE_SUCCESS:
      return {
        ...state,
        statuses: state.statuses.filter((status) => status._id !== payload),
      };
    default:
      return state;
  }
};

export const statusesCreateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case STATUS_CREATE_REQUEST:
      return { ...state, loading: true };
    case STATUS_CREATE_SUCCESS:
      return { ...state, loading: false, status: payload.status, success: true };
    case STATUS_CREATE_FAIL:
      return { ...state, loading: false, errors: payload };
    case STATUS_CREATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};

export const statusesDeleteReducers = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case STATUS_DELETE_REQUEST:
      return { loading: true };
    case STATUS_DELETE_SUCCESS:
      return { loading: false };
    case STATUS_DELETE_FAIL:
      return { loading: false };
    default:
      return state;
  }
};
