import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo, Clear, Delete } from '@material-ui/icons';

import MuiSkeleton from '../../MuiSkeleton';
import DialogPasswordConfirmation from '../../Dialog/DialogPasswordConfirmation';

import { getUserDetails, updateUserDetails, deleteUser } from '../../../redux/actions/usersActions';
import { USER_UPDATE_DETAILS_RESET, USER_LIST_DELETE_RESET, LOGOUT } from '../../../redux/types';
import useStyles from './styles';

const UserEditForm = ({ history, match }) => {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const { id } = match.params;

  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.userDetails);
  const { errors, loading: updateUserDetailsLoading } = useSelector(
    state => state.updateUserDetails,
  );
  const { loading: userListDeleteLoading, success } = useSelector(state => state.userListDelete);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateUserDetails(match.params.id, { email }));
  };

  const handlerReset = () => {
    setEmail(user.email);
  };

  const handleClose = () => setOpen(false);

  const handleOnContinue = async userData => {
    dispatch(deleteUser(id, userData));
    dispatch({ type: LOGOUT });
  };

  const { formButton } = useStyles();

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, []);

  useEffect(() => {
    if (success) history.push('/users');

    if (user.email) setEmail(user.email);

    return () => {
      dispatch({ type: USER_UPDATE_DETAILS_RESET });
      dispatch({ type: USER_LIST_DELETE_RESET });
    };
  }, [user.email, success]);

  return loading ? (
    <MuiSkeleton />
  ) : (
    <form onSubmit={onSubmit}>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <TextField
            placeholder="Email"
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
      </Grid>
      <div className={formButton}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="small"
          startIcon={<Save />}
          disabled={updateUserDetailsLoading}
        >
          Save
        </Button>
        <Button size="small" onClick={handlerReset} startIcon={<Undo />}>
          Reset
        </Button>
        <Button size="small" startIcon={<Clear />} onClick={() => history.push('/users')}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
          startIcon={<Delete />}
        >
          Delete
        </Button>
      </div>
      <DialogPasswordConfirmation
        open={open}
        handleClose={handleClose}
        title="Are you sure you want to delete this user?"
        onContinue={handleOnContinue}
        loading={userListDeleteLoading}
      />
    </form>
  );
};

export default withRouter(UserEditForm);
