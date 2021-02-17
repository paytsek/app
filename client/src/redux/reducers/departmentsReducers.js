import {
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_UPDATE_FAIL,
  DEPARTMENT_UPDATE_RESET,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_DELETE_FAIL,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
} from '../types';

export const departmentsListReducers = (state = { errors: {}, departments: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case DEPARTMENT_LIST_REQUEST:
      return { ...state, loading: true };
    case DEPARTMENT_LIST_SUCCESS:
      return { ...state, loading: false, departments: payload.departments };
    case DEPARTMENT_LIST_FAIL:
      return { ...state, loading: false, errors: payload };
    case DEPARTMENT_CREATE_SUCCESS:
      return { ...state, departments: [...state.departments, payload.department] };
    case DEPARTMENT_DELETE_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter((department) => department._id !== payload),
      };
    case DEPARTMENT_UPDATE_SUCCESS:
      return {
        ...state,
        departments: state.departments.map((department) =>
          (department._id === payload.department._id ? payload.department : department)),
      };
    default:
      return state;
  }
};

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

export const departmentUpdateReducers = (state = { errors: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case DEPARTMENT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case DEPARTMENT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case DEPARTMENT_UPDATE_FAIL:
      return { ...state, loading: false, errors: payload };
    case DEPARTMENT_UPDATE_RESET:
      return { errors: {} };
    default:
      return state;
  }
};

export const departmentDeleteReducers = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case DEPARTMENT_DELETE_REQUEST:
      return { ...state, loading: true };
    case DEPARTMENT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case DEPARTMENT_DELETE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
