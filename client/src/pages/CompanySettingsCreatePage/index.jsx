import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper, Container, Breadcrumbs, Typography,
} from '@material-ui/core';
import CompanySettingsForm from '../../components/CompanySettings/CompanySettingsForm';

import useStyles from './styles';

const CompanySettingsCreatePage = ({ match }) => {
  const { slug } = match.params;

  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link to={`/${slug}/company-settings`} aria-current="page">
          Company Settings
        </Link>
        <Link className={active} to="create" aria-current="page">
          Create Company Settings
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Create Company Settings
        </Typography>
      </Paper>
      <CompanySettingsForm />
    </Container>
  );
};

export default CompanySettingsCreatePage;
