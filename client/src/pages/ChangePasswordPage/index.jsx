import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Paper, Container, Breadcrumbs, Typography,
} from '@material-ui/core';

import ChangePasswordForm from '../../components/ChangePassword/ChangePasswordForm';

import useStyles from './styles';

const ChangePasswordPage = () => {
  const { slug } = useSelector((state) => state.companyTenant);

  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link to="change-password" aria-current="page" className={active}>
          Change Password
        </Link>
      </Breadcrumbs>
      <Paper className={paper} elevation={6}>
        <Typography variant="h5" className={title} gutterBottom>
          Change Password
        </Typography>
        <ChangePasswordForm />
      </Paper>
    </Container>
  );
};

export default ChangePasswordPage;
