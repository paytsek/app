import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography, Grid } from '@material-ui/core';

import Departments from '../../components/CompanySettings/CompanySettingsForm/Departments';

import useStyles from './styles';

const CompanySettingsPage = ({ match }) => {
  const { slug } = match.params;

  const { paper, active, title, gridContainer } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link className={active} to={`/${slug}/departments`} aria-current="page">
          Departments
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Departments
        </Typography>
        <Container>
          <Grid container spacing={3} className={gridContainer}>
            <Grid item xs={12} md={9}>
              <Departments />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
};

export default CompanySettingsPage;
