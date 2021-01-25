import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import moment from 'moment';

import MuiSkeleton from '../../components/MuiSkeleton';

import { getCompanyDetails } from '../../redux/actions/companiesActions';
import useStyles from './styles';

const CompanyDetailsPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const { id } = match.params;

  const { loading, company } = useSelector(state => state.companyDetails);

  const { active, paper, title, actions, details } = useStyles();

  useEffect(() => {
    dispatch(getCompanyDetails(id));
  }, []);

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
        {loading ? (
          <MuiSkeleton />
        ) : (
          <Fragment>
            <div className={actions}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                size="small"
                onClick={() => history.push(`${company._id}/edit`)}
              >
                Edit
              </Button>
            </div>
            <div className={details}>
              <Typography variant="subtitle2">Name</Typography>
              <Typography variant="subtitle1">{company.name}</Typography>
            </div>
            <div className={details}>
              <Typography variant="subtitle2">Slug</Typography>
              <Typography variant="subtitle1">{company.slug}</Typography>
            </div>
            <div className={details}>
              <Typography variant="subtitle2">Created</Typography>
              <Typography variant="subtitle1">
                {moment(company.createdAt).format('MMMM DD, YYYY')}
              </Typography>
            </div>
          </Fragment>
        )}
      </Paper>
    </Container>
  );
};

export default CompanyDetailsPage;
