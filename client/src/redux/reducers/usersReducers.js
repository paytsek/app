import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_RESET,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  USERS_LIST_FAIL,
  USERS_LIST_SUCCESS,
  USERS_LIST_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_RESET,
  CURRENT_USER_FAIL,
  CURRENT_USER_REQUEST,
  CURRENT_USER_RESET,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAIL,
  CURRENT_USER_UPDATE_RESET,
  CURRENT_USER_DELETE_REQUEST,
  CURRENT_USER_DELETE_SUCCESS,
  CURRENT_USER_DELETE_FAIL,
} from '../actions/types';

export const authUserReducers = (state = { auth: false, loading: true, user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_REQUEST:
      return { ...state, loading: true };
    case AUTH_SUCCESS:
      return { ...state, loading: false, auth: true, user: payload.user };
    case AUTH_FAIL:
      return { ...state, loading: false, auth: false, user: {} };
    case LOGOUT:
      localStorage.removeItem('token');
      return { ...state, auth: false, user: {} };
    default:
      return state;
  }
};

export const registerUserReducer = (state = { errors: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, loading: false };
    case REGISTER_FAIL:
      return { loading: false, errors: payload };
    case REGISTER_RESET:
      return { ...state, errors: {} };
    default:
      return state;
  }
};

export const loginUserReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, loading: false };
    case LOGIN_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const usersListReducers = (state = { users: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USERS_LIST_REQUEST:
      return { ...state, loading: true };
    case USERS_LIST_SUCCESS:
      return { ...state, loading: false, users: payload.users };
    case USERS_LIST_FAIL:
      return { ...state, loading: false, users: [] };
    default:
      return state;
  }
};

export const userDetailsReducers = (state = { user: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: payload.user };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, user: {} };
    default:
      return state;
  }
};

export const updateUserDetailsReducers = (state = { errors: {}, loading: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedUser: payload.user,
        errors: {},
      };
    case USER_UPDATE_DETAILS_FAIL:
      return { ...state, loading: false, updatedUser: {}, errors: payload };
    case USER_UPDATE_DETAILS_RESET:
      return { ...state, errors: {}, loading: false, updatedUser: {} };
    default:
      return state;
  }
};

export const currentUserReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case CURRENT_USER_SUCCESS:
      return { ...state, user: payload.user, loading: false };
    case CURRENT_USER_FAIL:
      return { ...state, loading: false, errors: payload };
    case CURRENT_USER_RESET:
      return { loading: false, errors: {} };
    default:
      return state;
  }
};

export const currentUserUpdateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_USER_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case CURRENT_USER_UPDATE_SUCCESS:
      return { ...state, loading: false, errors: {}, success: true };
    case CURRENT_USER_UPDATE_FAIL:
      return { ...state, loading: false, errors: payload, success: false };
    case CURRENT_USER_UPDATE_RESET:
      return { errors: {}, loading: false };
    default:
      return state;
  }
};

export const currentUserDeleteReducers = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case CURRENT_USER_DELETE_REQUEST:
      return { loading: true };
    case CURRENT_USER_DELETE_SUCCESS:
      return { loading: false };
    case CURRENT_USER_DELETE_FAIL:
      return { loading: false };
    default:
      return state;
  }
};
