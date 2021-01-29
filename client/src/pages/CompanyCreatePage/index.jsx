import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper, Container, Breadcrumbs, Typography,
} from '@material-ui/core';

import CompanyCreateForm from '../../components/CompanyCreate/CompanyCreateForm';
import useStyles from './styles';

const CompanyCreatePage = ({ match }) => {
  const { slug } = match.params;

  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link to={`/${slug}/companies`} aria-current="page">
          Companies
        </Link>
        <Link className={active} to="create" aria-current="page">
          Create Company
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Create Company
        </Typography>
        <CompanyCreateForm />
      </Paper>
    </Container>
  );
};

export default CompanyCreatePage;
