import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography } from '@material-ui/core';

import CompanyUpdateForm from '../../components/CompanyUpdate/CompanyUpdateForm';
import useStyles from './styles';

const CompanyUpdatePage = ({ match }) => {
  const { slug, id } = match.params;

  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link to={`/${slug}/companies`} aria-current="page">
          Companies
        </Link>
        <Link to={`/${slug}/companies/${id}`} aria-current="page">
          View Company
        </Link>
        <Link className={active} to="edit" aria-current="page">
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
