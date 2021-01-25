import {
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
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
