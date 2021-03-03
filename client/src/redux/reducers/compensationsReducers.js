import {
  COMPENSATIONS_CREATE_FAIL,
  COMPENSATIONS_CREATE_REQUEST,
  COMPENSATIONS_CREATE_RESET,
  COMPENSATIONS_CREATE_SUCCESS,
  COMPENSATIONS_LIST_FAIL,
  COMPENSATIONS_LIST_REQUEST,
  COMPENSATIONS_LIST_SUCCESS,
  COMPENSATIONS_DELETE_FAIL,
  COMPENSATIONS_DELETE_REQUEST,
  COMPENSATIONS_DELETE_SUCCESS,
  COMPENSATIONS_DELETE_RESET,
  COMPENSATIONS_UPDATE_REQUEST,
  COMPENSATIONS_UPDATE_SUCCESS,
  COMPENSATIONS_UPDATE_FAIL,
  COMPENSATIONS_UPDATE_RESET,
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
    case COMPENSATIONS_DELETE_SUCCESS:
      return {
        ...state,
        compensations: state.compensations.filter(
          (compensation) => compensation._id !== payload,
        ),
      };
    case COMPENSATIONS_UPDATE_SUCCESS:
      return {
        ...state,
        compensations: state.compensations.map((compensation) =>
          (compensation._id === payload.compensation._id
            ? payload.compensation
            : compensation)),
      };
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

export const compensationDeleteReducers = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case COMPENSATIONS_DELETE_REQUEST:
      return { loading: true };
    case COMPENSATIONS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMPENSATIONS_DELETE_FAIL:
      return { loading: false };
    case COMPENSATIONS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const compensationUpdateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPENSATIONS_UPDATE_REQUEST:
      return { ...state, loading: true };
    case COMPENSATIONS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        compensation: payload.compensation,
        success: true,
      };
    case COMPENSATIONS_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case COMPENSATIONS_UPDATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};
