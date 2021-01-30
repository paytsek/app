import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography } from '@material-ui/core';

import CurrentUserProfileForm from '../../components/CurrentUserProfile/CurrentUserProfileForm';
import useStyles from './styles';

const CurrentUserProfile = () => {
  const { slug } = useSelector(state => state.companySlug);

  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link className={active} to="profile" aria-current="page">
          Profile
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Profile
        </Typography>
        <CurrentUserProfileForm />
      </Paper>
    </Container>
  );
};

export default CurrentUserProfile;
