import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import useStyles from './styles';

const CompanyDetailsPage = ({ history }) => {
  const { active, paper, title, actions, details } = useStyles();

  return (
    <Container>
      <Breadcrumbs>
        <Link to="/">Dashboard</Link>
        <Link to="/companies" aria-current="page">
          Companies
        </Link>
        <Link className={active} to="/companies/1" aria-current="page">
          View Company
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          View Company
        </Typography>
        <div className={actions}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            size="small"
            onClick={() => history.push('1/edit')}
          >
            Edit
          </Button>
        </div>
        <div className={details}>
          <Typography variant="subtitle2">Name</Typography>
          <Typography variant="subtitle1">PayTsek</Typography>
        </div>
        <div className={details}>
          <Typography variant="subtitle2">Slug</Typography>
          <Typography variant="subtitle1">paytsek</Typography>
        </div>
        <div className={details}>
          <Typography variant="subtitle2">Created</Typography>
          <Typography variant="subtitle1">May 06, 20201</Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default CompanyDetailsPage;
