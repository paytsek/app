import {
  COMPENSATIONS_CREATE_FAIL,
  COMPENSATIONS_CREATE_REQUEST,
  COMPENSATIONS_CREATE_RESET,
  COMPENSATIONS_CREATE_SUCCESS,
  COMPENSATIONS_LIST_FAIL,
  COMPENSATIONS_LIST_REQUEST,
  COMPENSATIONS_LIST_SUCCESS,
} from '../types';

export const compensationsListReducers = (state = { compensations: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPENSATIONS_LIST_REQUEST:
      return { ...state, loading: true };
    case COMPENSATIONS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        compensations: payload.compensations,
      };
    case COMPENSATIONS_LIST_FAIL:
      return { ...state, loading: false };
    case COMPENSATIONS_CREATE_SUCCESS:
      return { ...state, compensations: [...state.compensations, payload.compensation] };
    default:
      return state;
  }
};

export const compensationCreateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPENSATIONS_CREATE_REQUEST:
      return { ...state, loading: true };
    case COMPENSATIONS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        compensation: payload.compensation,
        success: true,
      };
    case COMPENSATIONS_CREATE_FAIL:
      return { ...state, loading: false, errors: payload };
    case COMPENSATIONS_CREATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};
