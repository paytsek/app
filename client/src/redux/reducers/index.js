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
import { departmentCreateReducers, departmentUpdateReducers } from './departmentsReducers';

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
});

export default reducers;
