import axios from '../../axios';
import notification from '../../utils/notification';

import {
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_UPDATE_FAIL,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
} from '../types';

export const getDepartments = () => async (dispatch) => {
  dispatch({ type: DEPARTMENT_LIST_REQUEST });

  try {
    const { data } = await axios.get('/departments');

    dispatch({ type: DEPARTMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;
    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};

export const createDepartment = (department) => async (dispatch) => {
  dispatch({ type: DEPARTMENT_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/departments', department, config);

    dispatch({ type: DEPARTMENT_CREATE_SUCCESS, payload: data });
    dispatch(notification('success', 'Department successfully created', dispatch));
  } catch (error) {
    const { errors } = error.response.data;

    dispatch({ type: DEPARTMENT_CREATE_FAIL, payload: errors });
    dispatch(notification('error', errors.name || 'Server Error', dispatch));
  }
};

export const updateDepartment = (id, department) => async (dispatch) => {
  dispatch({ type: DEPARTMENT_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(`/departments/${id}`, department, config);
    dispatch({ type: DEPARTMENT_UPDATE_SUCCESS, payload: data });
    dispatch(notification('success', data.message || 'Successfully updated', dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch({ type: DEPARTMENT_UPDATE_FAIL, payload: errors });
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  dispatch({ type: DEPARTMENT_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`/departments/${id}`);

    dispatch({ type: DEPARTMENT_DELETE_SUCCESS, payload: id });
    dispatch(notification('success', data.message || 'Successfully deleted', dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;

    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};
