import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo, Clear, Delete } from '@material-ui/icons';

import DialogPasswordConfirmation from '../../Dialog/DialogPasswordConfirmation';
import MuiSkeleton from '../../MuiSkeleton';

import {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} from '../../../redux/actions/usersActions';
import {
  COMPANY_TENANT_REMOVE,
  CURRENT_USER_DELETE_RESET,
  CURRENT_USER_RESET,
  CURRENT_USER_UPDATE_RESET,
  LOGOUT,
} from '../../../redux/types';
import useStyles from './styles';

const CurrentUserProfileForm = ({ history }) => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.currentUser);
  const { loading: currentUserUpdateLoading, errors } = useSelector(
    (state) => state.currentUserUpdate,
  );
  const { loading: currentUserDeleteLoading, success } = useSelector(
    (state) => state.currentUserDelete,
  );
  const { slug } = useSelector((state) => state.companyTenant);

  const [state, setState] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
  });
  const [open, setOpen] = useState(false);
  const { email, username, firstName, lastName } = state;

  const { formButton } = useStyles();

  const handleOnChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCurrentUser(state));
  };

  const handleClose = () => setOpen(false);

  const handleReset = () => {
    if (user) {
      setState((prevState) => ({
        ...prevState,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }));
    }
    dispatch({ type: CURRENT_USER_UPDATE_RESET });
  };

  const handleDeleteCurrentUser = async (userData) => {
    await dispatch(deleteCurrentUser(userData));
  };

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }

    return () => {
      dispatch({ type: CURRENT_USER_RESET });
      dispatch({ type: CURRENT_USER_UPDATE_RESET });
      dispatch({ type: CURRENT_USER_DELETE_RESET });
    };
  }, []);

  useEffect(() => {
    if (user) {
      handleReset();
    }

    if (success) {
      dispatch({ type: LOGOUT });
      dispatch({ type: COMPANY_TENANT_REMOVE });
      history.push('/login');
    }
  }, [user, success]);

  return loading ? (
    <Grid item xs={12} md={7} lg={8}>
      <MuiSkeleton />
    </Grid>
  ) : (
    <>
      <form onSubmit={handleOnSubmit}>
        <Grid container>
          <Grid item xs={12} md={7} lg={8}>
            <TextField
              placeholder="Email"
              label="Email"
              fullWidth
              margin="normal"
              name="email"
              value={email}
              onChange={handleOnChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <TextField
              placeholder="Username"
              label="Username"
              fullWidth
              margin="normal"
              autoComplete="off"
              name="username"
              value={username}
              onChange={handleOnChange}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <TextField
              placeholder="First Name"
              label="First Name"
              fullWidth
              margin="normal"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <TextField
              placeholder="Last Name"
              label="Last Name"
              fullWidth
              margin="normal"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
        </Grid>
        <div className={formButton}>
          <Button
            color="primary"
            variant="contained"
            size="small"
            type="submit"
            disabled={currentUserUpdateLoading}
            startIcon={<Save />}
          >
            Save
          </Button>
          <Button
            size="small"
            onClick={handleReset}
            disabled={currentUserUpdateLoading}
            startIcon={<Undo />}
          >
            Reset
          </Button>
          <Button
            size="small"
            disabled={currentUserUpdateLoading}
            startIcon={<Clear />}
            onClick={() => history.push(`/${slug}/dashboard`)}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            disabled={currentUserUpdateLoading}
            onClick={() => setOpen(true)}
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </div>
      </form>
      <DialogPasswordConfirmation
        open={open}
        handleClose={handleClose}
        onContinue={handleDeleteCurrentUser}
        loading={currentUserDeleteLoading}
        title="Are you sure you want to delete your profile?"
      />
    </>
  );
};

export default withRouter(CurrentUserProfileForm);
