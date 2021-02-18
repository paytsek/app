import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography, Grid } from '@material-ui/core';

import TaxablePays from '../../components/TaxablePays';

import useStyles from './styles';

const TaxablePaysPage = ({ match }) => {
  const { slug } = match.params;
  const { paper, active, title, gridContainer } = useStyles();
  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link className={active} to={`/${slug}/taxablePays`} aria-current="page">
          Taxable Pays
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          Taxable Pays
        </Typography>
        <Container>
          <Grid container spacing={3} className={gridContainer}>
            <Grid item xs={12} md={9}>
              <TaxablePays />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
};

export default TaxablePaysPage;
