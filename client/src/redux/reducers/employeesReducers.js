import { EMPLOYEE_LIST_FAIL, EMPLOYEE_LIST_REQUEST, EMPLOYEE_LIST_SUCCESS } from '../types/employeeTypes';

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

export const x = () => {};
