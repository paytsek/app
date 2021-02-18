import {
  NON_TAXABLE_PAYS_LIST_REQUEST,
  NON_TAXABLE_PAYS_LIST_FAIL,
  NON_TAXABLE_PAYS_LIST_SUCCESS,
  NON_TAXABLE_PAYS_CREATE_REQUEST,
  NON_TAXABLE_PAYS_CREATE_SUCCESS,
  NON_TAXABLE_PAYS_CREATE_FAIL,
  NON_TAXABLE_PAYS_DELETE_REQUEST,
  NON_TAXABLE_PAYS_DELETE_SUCCESS,
  NON_TAXABLE_PAYS_DELETE_FAIL,
  NON_TAXABLE_PAYS_UPDATE_REQUEST,
  NON_TAXABLE_PAYS_UPDATE_RESET,
  NON_TAXABLE_PAYS_UPDATE_FAIL,
  NON_TAXABLE_PAYS_UPDATE_SUCCESS,
} from '../types';

export const taxablePaysListReducers = (state = { nonTaxablePays: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case NON_TAXABLE_PAYS_LIST_REQUEST:
      return { ...state, loading: true };
    case NON_TAXABLE_PAYS_LIST_SUCCESS:
      return { ...state, loading: false, nonTaxablePays: payload.nonTaxablePays };
    case NON_TAXABLE_PAYS_LIST_FAIL:
      return { ...state, loading: false };
    case NON_TAXABLE_PAYS_CREATE_SUCCESS:
      return { ...state, nonTaxablePays: [...state.nonTaxablePays, payload.nonTaxablePay] };
    case NON_TAXABLE_PAYS_DELETE_SUCCESS:
      return {
        ...state,
        nonTaxablePays: state.nonTaxablePays.filter(
          (nonTaxablePay) => nonTaxablePay._id !== payload,
        ),
      };
    case NON_TAXABLE_PAYS_UPDATE_SUCCESS:
      return {
        ...state,
        nonTaxablePays: state.nonTaxablePays.map((nonTaxablePay) =>
          nonTaxablePay._id === payload.nonTaxablePay._id ? payload.nonTaxablePay : nonTaxablePay,
        ),
      };
    default:
      return state;
  }
};

export const taxablePaysCreateReducers = (state = { error: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case NON_TAXABLE_PAYS_CREATE_REQUEST:
      return { ...state, loading: true };
    case NON_TAXABLE_PAYS_CREATE_SUCCESS:
      return { ...state, loading: false };
    case NON_TAXABLE_PAYS_CREATE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const taxablePaysDeleteReducers = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case NON_TAXABLE_PAYS_DELETE_REQUEST:
      return { ...state, loading: true };
    case NON_TAXABLE_PAYS_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case NON_TAXABLE_PAYS_DELETE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const taxablePaysUpdateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case NON_TAXABLE_PAYS_UPDATE_REQUEST:
      return { ...state, loading: true };
    case NON_TAXABLE_PAYS_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case NON_TAXABLE_PAYS_UPDATE_FAIL:
      return { ...state, loading: false, errors: payload };
    case NON_TAXABLE_PAYS_UPDATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};
