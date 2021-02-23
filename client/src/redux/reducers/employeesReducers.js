import {
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_RESET,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
} from '../types/employeeTypes';

export const employeesListReducers = (state = { employees: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case EMPLOYEE_LIST_REQUEST:
      return { ...state, loading: true };
    case EMPLOYEE_LIST_SUCCESS:
      return { ...state, loading: false, employees: payload.employees };
    case EMPLOYEE_LIST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const employeeDetailsReducers = (
  state = {
    employee: {
      status: {},
      compensation: {},
      department: {},
      statuses: [],
      compensations: [],
    },
  },
  action,
) => {
  const { type, payload } = action;

  switch (type) {
    case EMPLOYEE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case EMPLOYEE_DETAILS_SUCCESS:
      return { ...state, loading: false, employee: payload.employee };
    case EMPLOYEE_DETAILS_FAIL:
      return { ...state, loading: false };
    case EMPLOYEE_DETAILS_RESET:
      return {
        employee: {
          status: {},
          compensation: {},
          department: {},
          statuses: [],
          compensations: [],
        },
      };
    default:
      return state;
  }
};

export const employeeCreateReducers = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case EMPLOYEE_CREATE_REQUEST:
      return { loading: true };
    case EMPLOYEE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case EMPLOYEE_CREATE_FAIL:
      return { loading: false, success: false };
    default:
      return state;
  }
};
