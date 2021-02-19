import axios from '../../axios';

import {
  NON_TAXABLE_PAYS_LIST_FAIL,
  NON_TAXABLE_PAYS_LIST_SUCCESS,
  NON_TAXABLE_PAYS_LIST_REQUEST,
  NON_TAXABLE_PAYS_CREATE_REQUEST,
  NON_TAXABLE_PAYS_CREATE_SUCCESS,
  NON_TAXABLE_PAYS_CREATE_FAIL,
  NON_TAXABLE_PAYS_DELETE_REQUEST,
  NON_TAXABLE_PAYS_DELETE_SUCCESS,
  NON_TAXABLE_PAYS_UPDATE_REQUEST,
  NON_TAXABLE_PAYS_UPDATE_SUCCESS,
  NON_TAXABLE_PAYS_UPDATE_FAIL,
} from '../types';

import notification from '../../utils/notification';

export const getNonTaxablePays = () => async (dispatch) => {
  dispatch({ type: NON_TAXABLE_PAYS_LIST_REQUEST });

  try {
    const { data } = await axios.get('/nonTaxablePays');

    dispatch({ type: NON_TAXABLE_PAYS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;
    dispatch({ type: NON_TAXABLE_PAYS_LIST_FAIL });
    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};

export const createNonTaxablePay = (nonTaxablePay) => async (dispatch) => {
  dispatch({ type: NON_TAXABLE_PAYS_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/nonTaxablePays', nonTaxablePay, config);

    dispatch({ type: NON_TAXABLE_PAYS_CREATE_SUCCESS, payload: data });
    dispatch(notification('success', 'Non Taxable pay successfully created', dispatch));
  } catch (error) {
    const { errors } = error.response.data;

    dispatch({ type: NON_TAXABLE_PAYS_CREATE_FAIL, payload: errors });
    dispatch(notification('error', errors.name || 'Server Error', dispatch));
  }
};

export const deleteNonTaxablePay = (id) => async (dispatch) => {
  dispatch({ type: NON_TAXABLE_PAYS_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`/nonTaxablePays/${id}`);

    dispatch({ type: NON_TAXABLE_PAYS_DELETE_SUCCESS, payload: id });
    dispatch(notification('success', data.message || 'Successfully deleted', dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;

    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};

export const updateNonTaxablePay = (id, nonTaxablePay) => async (dispatch) => {
  dispatch({ type: NON_TAXABLE_PAYS_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(`/nonTaxablePays/${id}`, nonTaxablePay, config);
    dispatch({ type: NON_TAXABLE_PAYS_UPDATE_SUCCESS, payload: data });
    dispatch(notification('success', data.message || 'Successfully updated', dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch({ type: NON_TAXABLE_PAYS_UPDATE_FAIL, payload: errors });
  }
};
