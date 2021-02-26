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
  departmentsListReducers,
} from './departmentsReducers';
import {
  employeesListReducers,
  employeeDetailsReducers,
  employeeCreateReducers,
  employeeDeleteReducers,
  employeeUpdateReducers,
} from './employeesReducers';
import {
  taxablePaysListReducers,
  taxablePaysCreateReducers,
  taxablePaysDeleteReducers,
  taxablePaysUpdateReducers,
} from './taxablePaysReducers';
import {
  nonTaxablePaysListReducers,
  nonTaxablePaysCreateReducers,
  nonTaxablePaysDeleteReducers,
  nonTaxablePaysUpdateReducers,
} from './nonTaxablePaysReducers';
import {
  statusesListReducers,
  statusesCreateReducers,
  statusesDeleteReducers,
  statusesUpdateReducers,
} from './statusesReducers';

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
  departmentsList: departmentsListReducers,
  // EMPLOYEES
  employeesList: employeesListReducers,
  employeeDetails: employeeDetailsReducers,
  employeeCreate: employeeCreateReducers,
  employeeDelete: employeeDeleteReducers,
  employeeUpdate: employeeUpdateReducers,
  // TAXABLEPAYS
  taxablePaysList: taxablePaysListReducers,
  taxablePaysCreate: taxablePaysCreateReducers,
  taxablePaysDelete: taxablePaysDeleteReducers,
  taxablePaysUpdate: taxablePaysUpdateReducers,
  // NON TAXABLE PAYS
  nonTaxablePaysList: nonTaxablePaysListReducers,
  nonTaxablePaysCreate: nonTaxablePaysCreateReducers,
  nonTaxablePaysDelete: nonTaxablePaysDeleteReducers,
  nonTaxablePaysUpdate: nonTaxablePaysUpdateReducers,
  // STATUSES
  statusesList: statusesListReducers,
  statusesCreate: statusesCreateReducers,
  statusesDelete: statusesDeleteReducers,
  statusesUpdate: statusesUpdateReducers,
});

export default reducers;
