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
} from './companiesReducers';

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
});

export default reducers;
