import axios from '../../axios';
import notification from '../../utils/notification';

import {
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_CREATE_SUCCESS,
} from '../types';

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

export const x = () => {};
