import {
  COMPANY_DELETE_FAIL,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_RESET,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_RESET,
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
  COMPANY_SETTINGS_CREATE_FAIL,
  COMPANY_SETTINGS_CREATE_REQUEST,
  COMPANY_SETTINGS_CREATE_RESET,
  COMPANY_SETTINGS_CREATE_SUCCESS,
  COMPANY_TENANT_HEADERS_FAIL,
  COMPANY_TENANT_HEADERS_REQUEST,
  COMPANY_TENANT_HEADERS_SUCCESS,
  COMPANY_TENANT_REMOVE,
  COMPANY_TENANT_REQUEST,
  COMPANY_TENANT_SUCCESS,
  COMPANY_TENANT_FAIL,
} from '../types';

export const companiesListReducers = (state = { companies: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_LIST_REQUEST:
      return { loading: true, companies: [] };
    case COMPANY_LIST_SUCCESS:
      return { loading: false, companies: payload.companies };
    case COMPANY_NAME_CREATE_SUCCESS:
      return { ...state, companies: [...state.companies, payload.company] };
    case COMPANY_LIST_FAIL:
      return { loading: false, companies: [] };
    case COMPANY_DELETE_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter((company) => company._id !== payload),
      };
    default:
      return state;
  }
};

export const companyDetailsReducers = (
  state = { company: { department: [], taxablePays: [], nonTaxablePays: [] } },
  action,
) => {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COMPANY_DETAILS_SUCCESS:
      return { loading: false, company: payload.company };
    case COMPANY_DETAILS_FAIL:
      return { loading: false, company: {} };
    case COMPANY_DETAILS_RESET:
      return { company: {} };
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

export const companyDeleteReducers = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case COMPANY_DELETE_REQUEST:
      return { loading: true };
    case COMPANY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_DELETE_FAIL:
      return { loading: false, success: false };
    case COMPANY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const companySettingsCreateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_SETTINGS_CREATE_REQUEST:
      return { ...state, loading: true };
    case COMPANY_SETTINGS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        companySettings: payload.companySettings,
        errors: {},
      };
    case COMPANY_SETTINGS_CREATE_FAIL:
      return { ...state, loading: false, errors: payload };
    case COMPANY_SETTINGS_CREATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};

export const companyTenantReducers = (state = { authSlug: false }, action) => {
  const { type, payload, isAdministrator } = action;

  switch (type) {
    case COMPANY_TENANT_REQUEST:
      return { ...state, loading: true };
    case COMPANY_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        slug: payload.tenant.slug,
        authSlug: true,
        id: payload.tenant.id,
        administrators: payload.tenant.administrators,
        isAdministrator,
      };
    case COMPANY_TENANT_FAIL:
      return { loading: false, authSlug: false };
    case COMPANY_TENANT_REMOVE:
      localStorage.removeItem('tenant');
      return { authSlug: false };
    default:
      return state;
  }
};

export const companySetCompanyTenantReducers = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_TENANT_HEADERS_REQUEST:
      return { loading: true };
    case COMPANY_TENANT_HEADERS_SUCCESS:
      localStorage.setItem('tenant', payload.tenant.slug);
      return { loading: false, slug: payload.tenant.slug };
    case COMPANY_TENANT_HEADERS_FAIL:
      return { loading: false };
    default:
      return state;
  }
};
