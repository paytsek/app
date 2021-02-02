import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo, Clear } from '@material-ui/icons';

import { updateCurrentUserPassword } from '../../../redux/actions/usersActions';
import { CURRENT_USER_UPDATE_RESET } from '../../../redux/types';
import useStyles from './styles';

const ChangePasswordForm = ({ history }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, success } = useSelector((state) => state.currentUserUpdate);
  const { slug } = useSelector((state) => state.companySlug);

  const { formButton } = useStyles();

  const handleReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateCurrentUserPassword({ currentPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (success) {
      handleReset();
    }
    return () => {
      dispatch({ type: CURRENT_USER_UPDATE_RESET });
    };
  }, [success]);

  return (
    <form onSubmit={handleOnSubmit}>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <TextField
            type="password"
            placeholder="Current Password"
            label="Current Password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <TextField
            type="password"
            placeholder="New Password"
            label="New Password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <TextField
            type="password"
            placeholder="New Password Confirmation"
            label="New Password Confirmation"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
      </Grid>
      <div className={formButton}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="small"
          disabled={loading}
          startIcon={<Save />}
        >
          Save
        </Button>
        <Button size="small" onClick={handleReset} startIcon={<Undo />}>
          Reset
        </Button>
        <Button
          size="small"
          startIcon={<Clear />}
          onClick={() => history.push(`/${slug}/dashboard`)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default withRouter(ChangePasswordForm);
