import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography, Button } from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';

import EmployeesListTable from '../../components/Employees/EmployeesListTable';

import useStyles from './styles';

const EmployeeListpage = ({ match, history }) => {
  const { slug } = match.params;

  const { active, title, paper, actions, tableContainer } = useStyles();

  return (
    <>
      <Container>
        <Breadcrumbs>
          <Link to={`/${slug}/dashboard`}>Dashboard</Link>
          <Link className={active} to="employees" aria-current="page">
            Employees
          </Link>
        </Breadcrumbs>
        <Paper className={paper}>
          <Typography variant="h5" className={title} gutterBottom>
            Current Employees
          </Typography>
          <div className={actions}>
            <Button
              variant="contained"
              color="secondary"
              disabled
              size="small"
              startIcon={<Delete />}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Add />}
              onClick={() => history.push('employees/create')}
            >
              Create
            </Button>
          </div>
        </Paper>
      </Container>
      <Container className={tableContainer}>
        <EmployeesListTable />
      </Container>
    </>
  );
};

export default EmployeeListpage;
