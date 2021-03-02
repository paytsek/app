import axios from '../../axios';
import setTenant from '../../utils/setTenant';

import {
  COMPANY_DELETE_FAIL,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_NAME_CREATE_FAIL,
  COMPANY_NAME_CREATE_REQUEST,
  COMPANY_NAME_CREATE_SUCCESS,
  COMPANY_NAME_UPDATE_FAIL,
  COMPANY_NAME_UPDATE_REQUEST,
  COMPANY_NAME_UPDATE_SUCCESS,
  COMPANY_SETTINGS_CREATE_FAIL,
  COMPANY_SETTINGS_CREATE_REQUEST,
  COMPANY_SETTINGS_CREATE_SUCCESS,
  COMPANY_TENANT_HEADERS_FAIL,
  COMPANY_TENANT_HEADERS_REQUEST,
  COMPANY_TENANT_HEADERS_SUCCESS,
  COMPANY_TENANT_REQUEST,
  COMPANY_TENANT_SUCCESS,
  COMPANY_TENANT_FAIL,
} from '../types';
import notification from '../../utils/notification';

export const getCompanyTenant = () => async (dispatch, getState) => {
  const slug = localStorage.getItem('tenant');

  setTenant(slug);

  dispatch({ type: COMPANY_TENANT_REQUEST });

  try {
    const { data } = await axios.get(`/companies/tenant/${slug}`);

    const { user } = getState().authUser;

    const isAdministrator = data.tenant.administrators.includes(user.id);

    dispatch({ type: COMPANY_TENANT_SUCCESS, payload: data, isAdministrator });
  } catch (error) {
    const { errors } = error.response.data;

    dispatch({ type: COMPANY_TENANT_FAIL, payload: errors });
  }
};

export const setCompanyTenant = (slug) => async (dispatch) => {
  dispatch({ type: COMPANY_TENANT_HEADERS_REQUEST });

  try {
    const { data } = await axios.post(`/companies/tenant/${slug}`);

    dispatch({ type: COMPANY_TENANT_HEADERS_SUCCESS, payload: data });
    dispatch(getCompanyTenant());
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;

    if (message) {
      dispatch(notification('error', message, dispatch));
    }

    dispatch({ type: COMPANY_TENANT_HEADERS_FAIL, payload: errors });
  }
};

export const getCompaniesList = () => async (dispatch) => {
  dispatch({ type: COMPANY_LIST_REQUEST });

  try {
    const { data } = await axios.get('/companies');

    dispatch({ type: COMPANY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = (errors && errors.message) || 'Server Error';

    dispatch({ type: COMPANY_DETAILS_FAIL });
    dispatch(notification('error', message, dispatch));
  }
};

export const getCompanyDetails = (id) => async (dispatch) => {
  dispatch({ type: COMPANY_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`/companies/${id}`);

    dispatch({ type: COMPANY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = (errors && errors.message) || 'Server Error';

    dispatch({ type: COMPANY_DETAILS_FAIL });
    dispatch(notification('error', message, dispatch));
  }
};

export const createCompanyName = (company) => async (dispatch) => {
  dispatch({ type: COMPANY_NAME_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/companies/name', company, config);

    dispatch({ type: COMPANY_NAME_CREATE_SUCCESS, payload: data });

    const message = 'Company name successfully created';
    dispatch(notification('success', message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;

    const message = errors && errors.message;

    if (message) {
      dispatch(notification('error', message || 'Server Error', dispatch));
    }

    dispatch({ type: COMPANY_NAME_CREATE_FAIL, payload: errors });
  }
};

export const updateCompanyName = (id, companyData) => async (dispatch) => {
  dispatch({ type: COMPANY_NAME_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(`/companies/name/${id}`, companyData, config);

    const message = 'Company name usccessfully updated';
    dispatch({ type: COMPANY_NAME_UPDATE_SUCCESS, payload: data });
    dispatch(notification('success', message, dispatch));
    dispatch(setCompanyTenant(data.company.slug));
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;

    if (message) {
      dispatch(notification('error', message || 'Server Error', dispatch));
    }
    dispatch({ type: COMPANY_NAME_UPDATE_FAIL, payload: errors });
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  dispatch({ type: COMPANY_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`/companies/name/${id}`);
    const { message } = data;

    dispatch({ type: COMPANY_DELETE_SUCCESS, payload: id });
    dispatch(notification('success', message || 'Successfull delete', dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;

    dispatch(notification('error', message || 'Server Error', dispatch));
    dispatch({ type: COMPANY_DELETE_FAIL });
  }
};

export const createCompanySettings = (companySettings) => async (dispatch) => {
  dispatch({ type: COMPANY_SETTINGS_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/companies/settings', companySettings, config);

    const message = 'Company Setting successfully created';

    dispatch(notification('success', message, dispatch));
    dispatch({ type: COMPANY_SETTINGS_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;

    const message = errors && errors.message;

    if (message) {
      dispatch(notification('error', message || 'Server Error', dispatch));
    } else {
      dispatch(notification('error', 'Validation Error', dispatch));
    }

    dispatch({ type: COMPANY_SETTINGS_CREATE_FAIL, payload: errors });
  }
};

export const updateCompanySettings = (id, companySettings) => async (dispatch) => {
  dispatch({ type: COMPANY_SETTINGS_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(
      `/companies/settings/${id}`,
      companySettings,
      config,
    );

    const message = 'Company Setting successfully updated';

    dispatch(notification('success', message, dispatch));
    dispatch({ type: COMPANY_SETTINGS_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;

    const message = errors && errors.message;

    if (message) {
      dispatch(notification('error', message || 'Server Error', dispatch));
    } else {
      dispatch(notification('error', 'Validation Error', dispatch));
    }

    dispatch({ type: COMPANY_SETTINGS_CREATE_FAIL, payload: errors });
  }
};
