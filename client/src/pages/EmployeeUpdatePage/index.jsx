import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography } from '@material-ui/core';

import useStyles from './styles';

const EmployeeUpdatePage = ({ match }) => {
  const { slug, id } = match.params;

  const { paper, active, title } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link to={`/${slug}/employees`} aria-current="page">
          Employees
        </Link>
        <Link to={`/${slug}/employees/${id}`} aria-current="page">
          View Employee
        </Link>
        <Link className={active} to="edit" aria-current="page">
          Edit Employee
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Edit Employee
        </Typography>
      </Paper>
    </Container>
  );
};

export default EmployeeUpdatePage;
