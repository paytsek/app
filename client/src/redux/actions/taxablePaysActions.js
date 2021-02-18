import axios from '../../axios';

import {
  TAXABLE_PAYS_LIST_FAIL,
  TAXABLE_PAYS_LIST_SUCCESS,
  TAXABLE_PAYS_LIST_REQUEST,
  TAXABLE_PAYS_CREATE_REQUEST,
  TAXABLE_PAYS_CREATE_SUCCESS,
  TAXABLE_PAYS_CREATE_FAIL,
} from '../types';

import notification from '../../utils/notification';

export const getTaxablePays = () => async (dispatch) => {
  dispatch({ type: TAXABLE_PAYS_LIST_REQUEST });

  try {
    const { data } = await axios.get('/taxablePays');

    dispatch({ type: TAXABLE_PAYS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;
    dispatch({ type: TAXABLE_PAYS_LIST_FAIL });
    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};

export const createTaxablePay = (taxablePay) => async (dispatch) => {
  dispatch({ type: TAXABLE_PAYS_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/taxablePays', taxablePay, config);

    dispatch({ type: TAXABLE_PAYS_CREATE_SUCCESS, payload: data });
    dispatch(notification('success', 'Taxable pay successfully created', dispatch));
  } catch (error) {
    const { errors } = error.response.data;

    dispatch({ type: TAXABLE_PAYS_CREATE_FAIL, payload: errors });
    dispatch(notification('error', errors.name || 'Server Error', dispatch));
  }
};
