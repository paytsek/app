import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography } from '@material-ui/core';

import CurrentCompaniesContainer from '../../components/CompanySettings/CurrentCompaniesContainer';
import useStyles from './styles';

const CompanySettingsPage = ({ match }) => {
  const { slug } = match.params;

  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link className={active} to={`/${slug}/company-settings`} aria-current="page">
          Company Settings
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Company Settings
        </Typography>
        <CurrentCompaniesContainer />
      </Paper>
    </Container>
  );
};

export default CompanySettingsPage;
