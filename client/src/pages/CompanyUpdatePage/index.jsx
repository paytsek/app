import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper, Container, Breadcrumbs, Typography,
} from '@material-ui/core';

import CompanyUpdateForm from '../../components/CompanyUpdate/CompanyUpdateForm';
import useStyles from './styles';

const CompanyUpdatePage = () => {
  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to="/">Dashboard</Link>
        <Link to="/companies" aria-current="page">
          Companies
        </Link>
        <Link className={active} to="create" aria-current="page">
          Edit Company
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Edit Company
        </Typography>
        <CompanyUpdateForm />
      </Paper>
    </Container>
  );
};

export default CompanyUpdatePage;
