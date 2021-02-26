import axios from '../../axios';
import notification from '../../utils/notification';
import {
  STATUS_CREATE_FAIL,
  STATUS_CREATE_REQUEST,
  STATUS_CREATE_SUCCESS,
  STATUS_DELETE_REQUEST,
  STATUS_DELETE_SUCCESS,
  STATUS_LIST_REQUEST,
  STATUS_LIST_SUCCESS,
  STATUS_UPDATE_FAIL,
  STATUS_UPDATE_REQUEST,
  STATUS_UPDATE_SUCCESS,
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

export const deleteStatus = (employeeId, id) => async (dispatch) => {
  dispatch({ type: STATUS_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`/employees/${employeeId}/status/${id}`);
    dispatch({ type: STATUS_DELETE_SUCCESS, payload: id });
    dispatch(notification('success', data.message || 'Successfully deleted', dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    const message = errors && errors.message;
    dispatch(notification('error', message || 'Server Error', dispatch));
  }
};

export const updateStatus = (employeeId, id, statusData) => async (dispatch) => {
  dispatch({ type: STATUS_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(
      `/employees/${employeeId}/status/${id}`,
      statusData,
      config,
    );
    const message = 'Status successfully updated';

    dispatch({ type: STATUS_UPDATE_SUCCESS, payload: data });
    dispatch(notification('success', message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch({ type: STATUS_UPDATE_FAIL, payload: errors });
    dispatch(notification('error', 'Status Validation Error', dispatch));
  }
};
