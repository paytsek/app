import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper, Container, Breadcrumbs, Typography,
} from '@material-ui/core';

import ChangePasswordForm from '../../components/ChangePassword/ChangePasswordForm';

import useStyles from './styles';

const ChangePasswordPage = () => {
  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to="/">Dashboard</Link>
        <Link to="/users" aria-current="page" className={active}>
          Change Password
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Change Password
        </Typography>
        <ChangePasswordForm />
      </Paper>
    </Container>
  );
};

export default ChangePasswordPage;
