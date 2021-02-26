import axios from '../../axios';

import {
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_UPDATE_REQUEST,
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

export const createEmployee = (employeeData) => async (dispatch) => {
  dispatch({ type: EMPLOYEE_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/employees', employeeData, config);

    const message = 'Employee successfully created';

    dispatch({ type: EMPLOYEE_CREATE_SUCCESS, payload: data });
    dispatch(notification('success', message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch({ type: EMPLOYEE_CREATE_FAIL, payload: errors });
    dispatch(notification('error', 'Validation Error', dispatch));
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  dispatch({ type: EMPLOYEE_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`/employees/${id}`);

    dispatch({ type: EMPLOYEE_DELETE_SUCCESS, payload: id });
    dispatch(notification('success', data.message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch(notification('error', errors.message, dispatch));
    dispatch({ type: EMPLOYEE_CREATE_FAIL, payload: errors });
  }
};

export const updateEmployee = (id, employeeData) => async (dispatch) => {
  dispatch({ type: EMPLOYEE_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(`/employees/${id}`, employeeData, config);
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};
