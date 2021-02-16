import axios from '../../axios';

import {
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
} from '../types/employeeTypes';

import notification from '../../utils/notification';

export const getEmployeesList = () => async (dispatch) => {
  dispatch({ type: EMPLOYEE_LIST_REQUEST });

  try {
    const { data } = await axios.get('/employees');
    dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;
    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};

export const getEmployeeDetails = (id) => async (dispatch) => {
  dispatch({ type: EMPLOYEE_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`/employees/${id}`);
    dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;
    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};
