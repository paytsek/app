import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo, Clear, Delete } from '@material-ui/icons';

import MuiSkeleton from '../../MuiSkeleton';

import { getCurrentUser, updateCurrentUser } from '../../../redux/actions/usersActions';
import { CURRENT_USER_RESET, CURRENT_USER_UPDATE_RESET } from '../../../redux/actions/types';
import useStyles from './styles';

const CurrentUserProfileForm = ({ history }) => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.currentUser);
  const { loading: currentUserUpdateLoading, errors } = useSelector(state => state.currentUserUpdate);

  const [state, setState] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
  });
  const { email, username, firstName, lastName } = state;

  const { formButton } = useStyles();

  const handleOnChange = e => setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleOnSubmit = e => {
    e.preventDefault();
    dispatch(updateCurrentUser(state));
  };

  const handleReset = () => {
    if (user) {
      setState(prevState => ({
        ...prevState,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }));
    }
    dispatch({ type: CURRENT_USER_UPDATE_RESET });
  };

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }

    return () => {
      dispatch({ type: CURRENT_USER_RESET });
      dispatch({ type: CURRENT_USER_UPDATE_RESET });
    };
  }, []);

  useEffect(() => {
    handleReset();
  }, [user]);

  return loading ? (
    <Grid item xs={12} md={7} lg={8}>
      <MuiSkeleton />
    </Grid>
  ) : (
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
        <Button size="small" onClick={handleReset} startIcon={<Undo />}>
          Reset
        </Button>
        <Button size="small" startIcon={<Clear />} onClick={() => history.push('/users')}>
          Cancel
        </Button>
        <Button size="small" variant="contained" color="secondary" startIcon={<Delete />}>
          Delete
        </Button>
      </div>
    </form>
  );
};

export default withRouter(CurrentUserProfileForm);
