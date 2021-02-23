import {
  TAXABLE_PAYS_LIST_REQUEST,
  TAXABLE_PAYS_LIST_FAIL,
  TAXABLE_PAYS_LIST_SUCCESS,
  TAXABLE_PAYS_CREATE_REQUEST,
  TAXABLE_PAYS_CREATE_SUCCESS,
  TAXABLE_PAYS_CREATE_FAIL,
  TAXABLE_PAYS_DELETE_REQUEST,
  TAXABLE_PAYS_DELETE_SUCCESS,
  TAXABLE_PAYS_DELETE_FAIL,
  TAXABLE_PAYS_UPDATE_REQUEST,
  TAXABLE_PAYS_UPDATE_RESET,
  TAXABLE_PAYS_UPDATE_FAIL,
  TAXABLE_PAYS_UPDATE_SUCCESS,
} from '../types';

export const taxablePaysListReducers = (state = { taxablePays: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case TAXABLE_PAYS_LIST_REQUEST:
      return { ...state, loading: true };
    case TAXABLE_PAYS_LIST_SUCCESS:
      return { ...state, loading: false, taxablePays: payload.taxablePays, success: true };
    case TAXABLE_PAYS_LIST_FAIL:
      return { ...state, loading: false };
    case TAXABLE_PAYS_CREATE_SUCCESS:
      return { ...state, taxablePays: [...state.taxablePays, payload.taxablePay] };
    case TAXABLE_PAYS_DELETE_SUCCESS:
      return {
        ...state,
        taxablePays: state.taxablePays.filter((taxablePay) => taxablePay._id !== payload),
      };
    case TAXABLE_PAYS_UPDATE_SUCCESS:
      return {
        ...state,
        taxablePays: state.taxablePays.map((taxablePay) =>
          (taxablePay._id === payload.taxablePay._id ? payload.taxablePay : taxablePay)),
      };
    default:
      return state;
  }
};

export const taxablePaysCreateReducers = (state = { error: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case TAXABLE_PAYS_CREATE_REQUEST:
      return { ...state, loading: true };
    case TAXABLE_PAYS_CREATE_SUCCESS:
      return { ...state, loading: false };
    case TAXABLE_PAYS_CREATE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const taxablePaysDeleteReducers = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case TAXABLE_PAYS_DELETE_REQUEST:
      return { ...state, loading: true };
    case TAXABLE_PAYS_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case TAXABLE_PAYS_DELETE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const taxablePaysUpdateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case TAXABLE_PAYS_UPDATE_REQUEST:
      return { ...state, loading: true };
    case TAXABLE_PAYS_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case TAXABLE_PAYS_UPDATE_FAIL:
      return { ...state, loading: false, errors: payload };
    case TAXABLE_PAYS_UPDATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};
