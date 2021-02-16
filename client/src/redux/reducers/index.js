import { combineReducers } from 'redux';

import {
  registerUserReducer,
  authUserReducers,
  loginUserReducer,
  usersListReducers,
  userDetailsReducers,
  updateUserDetailsReducers,
  currentUserReducers,
  currentUserUpdateReducers,
  currentUserDeleteReducers,
  userListDeleteReducers,
} from './usersReducers';
import {
  companiesListReducers,
  companyDetailsReducers,
  createCompanyNameReducers,
  updateCompanyNameReducers,
  companyDeleteReducers,
  companySettingsCreateReducers,
  companyTenantReducers,
  companySetCompanyTenantReducers,
} from './companiesReducers';
import {
  departmentCreateReducers,
  departmentUpdateReducers,
  departmentDeleteReducers,
} from './departmentsReducers';
import { employeesListReducers, employeeDetailsReducers } from './employeesReducers';

import snackbarReducer from './snackbarReducers';

const reducers = combineReducers({
  // USERS
  registerUser: registerUserReducer,
  authUser: authUserReducers,
  loginUser: loginUserReducer,
  snackbar: snackbarReducer,
  usersList: usersListReducers,
  userDetails: userDetailsReducers,
  updateUserDetails: updateUserDetailsReducers,
  currentUser: currentUserReducers,
  currentUserUpdate: currentUserUpdateReducers,
  currentUserDelete: currentUserDeleteReducers,
  userListDelete: userListDeleteReducers,
  // COMPANIES
  companiesList: companiesListReducers,
  companyDetails: companyDetailsReducers,
  createCompanyName: createCompanyNameReducers,
  updateCompanyName: updateCompanyNameReducers,
  companyDelete: companyDeleteReducers,
  companySettingsCreate: companySettingsCreateReducers,
  companyTenant: companyTenantReducers,
  companySetCompanyTenant: companySetCompanyTenantReducers,
  // DEPARTMENTS
  departmentCreate: departmentCreateReducers,
  departmentUpdate: departmentUpdateReducers,
  departmentDelete: departmentDeleteReducers,
  // EMPLOYEES
  employeesList: employeesListReducers,
  employeeDetails: employeeDetailsReducers,
});

export default reducers;
