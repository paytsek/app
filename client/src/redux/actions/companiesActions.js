import axios from '../../axios';

import {
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
} from './types';
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
