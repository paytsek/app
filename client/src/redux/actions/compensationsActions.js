import axios from '../../axios';
import {
  COMPENSATIONS_CREATE_FAIL,
  COMPENSATIONS_CREATE_REQUEST,
  COMPENSATIONS_CREATE_SUCCESS,
  COMPENSATIONS_LIST_FAIL,
  COMPENSATIONS_LIST_REQUEST,
  COMPENSATIONS_LIST_SUCCESS,
} from '../types';

import notification from '../../utils/notification';

export const getCompensations = (employeeId) => async (dispatch) => {
  dispatch({ type: COMPENSATIONS_LIST_REQUEST });

  try {
    const { data } = await axios.get(`/employees/${employeeId}/compensations`);

    dispatch({ type: COMPENSATIONS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;
    dispatch(notification('error', message || 'Server Error', dispatch));
    dispatch({ type: COMPENSATIONS_LIST_FAIL });
  }
};

export const createCompensation = (employeeId, compensationData) => async (dispatch) => {
  dispatch({ type: COMPENSATIONS_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post(
      `/employees/${employeeId}/compensations`,
      compensationData,
      config,
    );
    const message = 'Compensation successfully created';

    dispatch({ type: COMPENSATIONS_CREATE_SUCCESS, payload: data });
    dispatch(notification('success', message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch({ type: COMPENSATIONS_CREATE_FAIL, payload: errors });
    dispatch(notification('error', 'Validation Error', dispatch));
  }
};
