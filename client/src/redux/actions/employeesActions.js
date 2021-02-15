import axios from '../../axios';

import { EMPLOYEE_LIST_REQUEST, EMPLOYEE_LIST_SUCCESS } from '../types/employeeTypes';

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

export const x = () => {};
