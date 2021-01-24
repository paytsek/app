import axios from '../../axios';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  AUTH_FAIL,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USERS_LIST_SUCCESS,
  USERS_LIST_REQUEST,
  USERS_LIST_FAIL,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_SUCCESS,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_REQUEST,
  CURRENT_USER_FAIL,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAIL,
  CURRENT_USER_DELETE_REQUEST,
  CURRENT_USER_DELETE_FAIL,
  CURRENT_USER_DELETE_SUCCESS,
  LOGOUT,
  USER_LIST_DELETE_REQUEST,
  USER_LIST_DELETE_FAIL,
  USER_LIST_DELETE_SUCCESS,
} from './types';
import notification from '../../utils/notification';

export const authUser = () => async dispatch => {
  const token = localStorage.getItem('token');

  setAuthToken(token);

  dispatch({ type: AUTH_REQUEST });

  try {
    const { data } = await axios.get('/auth');

    dispatch({ type: AUTH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AUTH_FAIL });
  }
};

export const registerUser = userData => async dispatch => {
  dispatch({ type: REGISTER_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/auth/register', userData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    dispatch(authUser(data.token));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch({ type: REGISTER_FAIL, payload: errors });
  }
};

export const loginUser = userData => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/auth/login', userData, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data });
    dispatch(authUser(data.token));
  } catch (error) {
    const message = (error.response.data.errors && error.response.data.errors.message) || 'Server Error';

    dispatch({ type: LOGIN_FAIL });
    dispatch(notification('error', message, dispatch));
  }
};

export const getUsersList = () => async dispatch => {
  dispatch({ type: USERS_LIST_REQUEST });

  try {
    const { data } = await axios.get('/users');
    dispatch({ type: USERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = (error.response.data.errors && error.response.data.errors.message) || 'Server Error';
    dispatch({ type: USERS_LIST_FAIL });
    dispatch(notification('error', message, dispatch));
  }
};

export const getUserDetails = id => async dispatch => {
  dispatch({ type: USER_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`/users/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = (error.response.data.errors && error.response.data.errors.message) || 'Server Error';
    dispatch({ type: USER_DETAILS_FAIL });
    dispatch(notification('error', message, dispatch));
  }
};

export const updateUserDetails = (id, userData) => async dispatch => {
  dispatch({ type: USER_UPDATE_DETAILS_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(`/users/${id}`, userData, config);
    dispatch({ type: USER_UPDATE_DETAILS_SUCCESS, payload: data });

    dispatch(notification('success', data.message, dispatch));
  } catch (error) {
    const message = (error.response.data.errors && error.response.data.errors.message) || 'Server Error';

    if (error.response.data.errors.email) {
      dispatch({
        type: USER_UPDATE_DETAILS_FAIL,
        payload: error.response.data.errors,
      });
      return;
    }
    dispatch({
      type: USER_UPDATE_DETAILS_FAIL,
      payload: error.response.data.errors,
    });
    dispatch(notification('error', message, dispatch));
  }
};

export const getCurrentUser = () => async dispatch => {
  dispatch({ type: CURRENT_USER_REQUEST });

  try {
    const { data } = await axios.get('/users/current-user');

    dispatch({ type: CURRENT_USER_SUCCESS, payload: data });
  } catch (error) {
    const message = (error.response.data.errors && error.response.data.errors.message) || 'Server Error';

    dispatch({ type: CURRENT_USER_FAIL, payload: message });
    dispatch(notification('error', message, dispatch));
  }
};

export const updateCurrentUser = userData => async dispatch => {
  dispatch({ type: CURRENT_USER_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put('/users/current-user', userData, config);

    dispatch({ type: CURRENT_USER_UPDATE_SUCCESS });
    dispatch({ type: CURRENT_USER_SUCCESS, payload: data });

    const message = 'Successfully updated';
    dispatch(notification('success', message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch({ type: CURRENT_USER_UPDATE_FAIL, payload: errors });
  }
};

export const updateCurrentUserPassword = userData => async dispatch => {
  dispatch({ type: CURRENT_USER_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put('/users/current-user/password', userData, config);

    dispatch({ type: CURRENT_USER_UPDATE_SUCCESS });
    dispatch({ type: CURRENT_USER_SUCCESS, payload: data });

    const message = 'Your password successfully updated';
    dispatch(notification('success', message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    const message = (errors && errors.message) || 'Server error';
    dispatch({ type: CURRENT_USER_UPDATE_FAIL, payload: errors });
    dispatch(notification('error', message, dispatch));
  }
};

export const deleteCurrentUser = userData => async dispatch => {
  dispatch({ type: CURRENT_USER_DELETE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    data: userData,
  };

  try {
    const { data } = await axios.delete('/users/current-user', config);

    dispatch(notification('success', data.message, dispatch));
    dispatch({ type: CURRENT_USER_DELETE_SUCCESS });
    dispatch({ type: LOGOUT });
  } catch (error) {
    const message = (error.response.data.errors && error.response.data.errors.message) || 'Server Error';

    dispatch({ type: CURRENT_USER_DELETE_FAIL });
    dispatch(notification('error', message, dispatch));
  }
};

export const deleteUser = (id, userData) => async dispatch => {
  dispatch({ type: USER_LIST_DELETE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    data: userData,
  };

  try {
    const { data } = await axios.delete(`users/${id}`, config);

    dispatch({ type: USER_LIST_DELETE_SUCCESS, payload: id });

    dispatch(notification('success', data.message, dispatch));
  } catch (error) {
    const { errors } = error.response.data;
    const message = (errors && errors.message) || 'Server error';

    dispatch(notification('error', message, dispatch));
    dispatch({ type: USER_LIST_DELETE_FAIL });
  }
};
