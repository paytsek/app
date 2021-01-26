import axios from '../../axios';

import {
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
