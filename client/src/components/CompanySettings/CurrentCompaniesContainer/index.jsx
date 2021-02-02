import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import CurrentCompaniesCard from '../CurrentCampaniesCard';
import MuiSkeleton from '../../MuiSkeleton';

import { getCompaniesList } from '../../../redux/actions/companiesActions';

const CurrentCompaniesContainer = () => {
  const dispatch = useDispatch();

  const { companies, loading } = useSelector((state) => state.companiesList);

  useEffect(() => {
    dispatch(getCompaniesList());
  }, []);

  return (
    <Grid container spacing={4} justify="space-between">
      {loading
        ? [...Array(3).keys()].map((a) => (
          <Grid item md={4} key={a}>
            <MuiSkeleton />
          </Grid>
        ))
        : (companies.length > 0 &&
            companies.map((company) => (
              <Grid item md={4} sm={6} xs={12} key={company._id}>
                <CurrentCompaniesCard company={company} />
              </Grid>
            ))) || (
            <Grid item md={4} sm={6} xs={12}>
              <Typography>No Companies to show</Typography>
            </Grid>
        )}
    </Grid>
  );
};

export default CurrentCompaniesContainer;
