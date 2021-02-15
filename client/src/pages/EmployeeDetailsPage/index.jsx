import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Breadcrumbs, Paper, Typography, Button, Grid } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import useStyles from './styles';

const EmployeeDetailsPage = ({ match }) => {
  const { id, slug } = match.params;

  const { active, paper, title, actions, details } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link to={`/${slug}/employees`} aria-current="page">
          Employees
        </Link>
        <Link className={active} to={`${id}`} aria-current="page">
          View Employee
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          View Employee Information
        </Typography>
        <div className={actions}>
          <Button variant="contained" color="primary" startIcon={<Edit />} size="small">
            Edit
          </Button>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <div className={details}>
              <Typography variant="subtitle2">Employee No.</Typography>
              <Typography variant="subtitle1">123</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EmployeeDetailsPage;
