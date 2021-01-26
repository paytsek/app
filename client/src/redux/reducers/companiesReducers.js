import {
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_NAME_CREATE_FAIL,
  COMPANY_NAME_CREATE_REQUEST,
  COMPANY_NAME_CREATE_RESET,
  COMPANY_NAME_CREATE_SUCCESS,
  COMPANY_NAME_UPDATE_FAIL,
  COMPANY_NAME_UPDATE_REQUEST,
  COMPANY_NAME_UPDATE_RESET,
  COMPANY_NAME_UPDATE_SUCCESS,
} from '../actions/types';

export const companiesListReducers = (state = { companies: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_LIST_REQUEST:
      return { loading: true, companies: [] };
    case COMPANY_LIST_SUCCESS:
      return { loading: false, companies: payload.companies };
    case COMPANY_LIST_FAIL:
      return { loading: false, companies: [] };
    default:
      return state;
  }
};

export const companyDetailsReducers = (state = { company: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COMPANY_DETAILS_SUCCESS:
      return { loading: false, company: payload.company };
    case COMPANY_DETAILS_FAIL:
      return { loading: false, company: {} };
    default:
      return state;
  }
};

export const createCompanyNameReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_NAME_CREATE_REQUEST:
      return { ...state, loading: true };
    case COMPANY_NAME_CREATE_SUCCESS:
      return { ...state, loading: false, company: payload.company };
    case COMPANY_NAME_CREATE_FAIL:
      return { loading: false, errors: payload };
    case COMPANY_NAME_CREATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};

export const updateCompanyNameReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_NAME_UPDATE_REQUEST:
      return { ...state, loading: true };
    case COMPANY_NAME_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case COMPANY_NAME_UPDATE_FAIL:
      return { loading: false, success: false, errors: payload };
    case COMPANY_NAME_UPDATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};
