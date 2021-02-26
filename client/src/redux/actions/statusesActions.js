import axios from '../../axios';
import notification from '../../utils/notification';
import {
  STATUS_CREATE_FAIL,
  STATUS_CREATE_REQUEST,
  STATUS_CREATE_SUCCESS,
  STATUS_LIST_REQUEST,
  STATUS_LIST_SUCCESS,
} from '../types';

export const getStatuses = (employeeId) => async (dispatch) => {
  dispatch({ type: STATUS_LIST_REQUEST });

  try {
    const { data } = await axios.get(`/employees/${employeeId}/status`);
    dispatch({ type: STATUS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;

    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};

export const createStatus = (employeeId, statusData) => async (dispatch) => {
  dispatch({ type: STATUS_CREATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post(
      `/employees/${employeeId}/status`,
      statusData,
      config,
    );

    const message = 'Status successfully created';

    dispatch({ type: STATUS_CREATE_SUCCESS, payload: data });
    dispatch(notification('success', message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch({ type: STATUS_CREATE_FAIL, payload: errors });
    dispatch(notification('error', 'Status Validation Error', dispatch));
  }
};
