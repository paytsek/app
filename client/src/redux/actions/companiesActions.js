import axios from '../../axios';

import { COMPANY_LIST_REQUEST, COMPANY_LIST_SUCCESS } from './types';
import notification from '../../utils/notification';

export const getCompaniesList = () => async dispatch => {
  dispatch({ type: COMPANY_LIST_REQUEST });

  try {
    const { data } = await axios.get('/companies');

    dispatch({ type: COMPANY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = (errors && errors.message) || 'Server Error';

    dispatch(notification('error', message, dispatch));
  }
};

export const defaultCompaniesActions = () => {};
