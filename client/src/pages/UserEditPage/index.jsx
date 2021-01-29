import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography } from '@material-ui/core';

import UserEditForm from '../../components/UserEdit/UserEditForm';

import useStyles from './styles';

const UserEditPage = ({ match }) => {
  const { slug, id } = match.params;
  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link to={`/${slug}/users`} aria-current="page">
          Users
        </Link>
        <Link to={`/${slug}/users/${id}`} aria-current="page">
          View User
        </Link>
        <Link className={active} to="edit" aria-current="page">
          Edit User
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Edit User
        </Typography>
        <UserEditForm />
      </Paper>
    </Container>
  );
};

export default UserEditPage;
