import {
  TAXABLE_PAYS_LIST_REQUEST,
  TAXABLE_PAYS_LIST_FAIL,
  TAXABLE_PAYS_LIST_SUCCESS,
  TAXABLE_PAYS_CREATE_REQUEST,
  TAXABLE_PAYS_CREATE_SUCCESS,
  TAXABLE_PAYS_CREATE_FAIL,
} from '../types';

export const taxablePaysListReducers = (state = { taxablePays: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case TAXABLE_PAYS_LIST_REQUEST:
      return { ...state, loading: true };
    case TAXABLE_PAYS_LIST_SUCCESS:
      return { ...state, loading: false, taxablePays: payload.taxablePays };
    case TAXABLE_PAYS_LIST_FAIL:
      return { ...state, loading: false };
    case TAXABLE_PAYS_CREATE_SUCCESS:
      return { ...state, taxablePays: [...state.taxablePays, payload.taxablePay] };
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
