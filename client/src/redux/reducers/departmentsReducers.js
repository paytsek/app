import {
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_CREATE_REQUEST,
} from '../types';

export const departmentCreateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case DEPARTMENT_CREATE_REQUEST:
      return { ...state, loading: true };
    case DEPARTMENT_CREATE_SUCCESS:
      return { ...state, loading: false };
    case DEPARTMENT_CREATE_FAIL:
      return { ...state, loading: false, errors: payload };
    default:
      return state;
  }
};

export const x = () => {};
