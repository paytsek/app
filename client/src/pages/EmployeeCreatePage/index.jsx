import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography } from '@material-ui/core';

import EmployeeForm from '../../components/Employees/EmployeeForm';

import useStyles from './styles';

const EmployeeCreatePage = ({ match }) => {
  const { slug } = match.params;

  const { active, title, paper } = useStyles();

  return (
    <>
      <Container>
        <Breadcrumbs>
          <Link to={`/${slug}/dashboard`}>Dashboard</Link>
          <Link to={`/${slug}/employees`} aria-current="page">
            Employees
          </Link>
          <Link className={active} to="create" aria-current="page">
            Create Employee
          </Link>
        </Breadcrumbs>
        <Paper className={paper}>
          <Typography variant="h5" className={title} gutterBottom>
            Create Employee
          </Typography>
          <Container>
            <EmployeeForm />
          </Container>
        </Paper>
      </Container>
    </>
  );
};

export default EmployeeCreatePage;
