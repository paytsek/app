import { COMPANY_LIST_FAIL, COMPANY_LIST_REQUEST, COMPANY_LIST_SUCCESS } from '../actions/types';

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

export const companyDefaultReducers = (state, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
