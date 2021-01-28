import axios from '../../axios';

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
} from '../types';
import notification from '../../utils/notification';

export const getCompaniesList = () => async dispatch => {
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

export const getCompanyDetails = id => async dispatch => {
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

export const createCompanyName = company => async dispatch => {
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

export const updateCompanyName = (id, companyData) => async dispatch => {
  dispatch({ type: COMPANY_NAME_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put(`/companies/name/${id}`, companyData, config);

    const message = 'Company name usccessfully updated';
    dispatch({ type: COMPANY_NAME_UPDATE_SUCCESS });
    dispatch(notification('success', message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;

    if (message) {
      dispatch(notification('error', message || 'Server Error', dispatch));
    }
    dispatch({ type: COMPANY_NAME_UPDATE_FAIL, payload: errors });
  }
};

export const deleteCompany = id => async dispatch => {
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

export const createCompanySettings = (companyId, companySettings) => async dispatch => {
  dispatch({ type: COMPANY_SETTINGS_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post(`/companies/${companyId}/settings`, companySettings, config);

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
