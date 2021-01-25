import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper, Container, Breadcrumbs, Typography,
} from '@material-ui/core';
import CompanySettingsForm from '../../components/CompanySettings/CompanySettingsForm';

import useStyles from './styles';

const CompanySettingsEditPage = () => {
  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to="/">Dashboard</Link>
        <Link to="/company-settings" aria-current="page">
          Company Settings
        </Link>
        <Link className={active} to="/company-settings/1/edit" aria-current="page">
          Edit Company Settings
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Edit Company Settings
        </Typography>
      </Paper>
      <CompanySettingsForm />
    </Container>
  );
};

export default CompanySettingsEditPage;
