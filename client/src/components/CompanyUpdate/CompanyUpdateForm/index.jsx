import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Clear, Undo, Delete } from '@material-ui/icons';

import MuiSkeleton from '../../MuiSkeleton';

import { getCompanyDetails, updateCompanyName } from '../../../redux/actions/companiesActions';
import { COMPANY_NAME_UPDATE_RESET } from '../../../redux/actions/types';
import useStyles from './styles';

const CompanyUpdateForm = ({ history, match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const { company, loading } = useSelector(state => state.companyDetails);
  const { errors, loading: updateCompanyNameLoading } = useSelector(
    state => state.updateCompanyName,
  );

  const { formButton } = useStyles();

  const handleOnSubmit = e => {
    e.preventDefault();
    dispatch(updateCompanyName(id, { name }));
  };

  useEffect(() => {
    dispatch(getCompanyDetails(id));

    return () => {
      dispatch({ type: COMPANY_NAME_UPDATE_RESET });
    };
  }, []);

  useEffect(() => {
    if (company && company.name) {
      setName(company.name);
    }
  }, [company.name]);

  return (
    <form onSubmit={handleOnSubmit}>
      {loading ? (
        <MuiSkeleton />
      ) : (
        <Fragment>
          <Grid container>
            <Grid item xs={12} md={7} lg={8}>
              <TextField
                placeholder="Company Name"
                label="Name"
                fullWidth
                margin="normal"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
          </Grid>
          <div className={formButton}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="small"
              disabled={updateCompanyNameLoading}
              startIcon={<Save />}
            >
              Save
            </Button>
            <Button size="small" onClick={() => setName(company.name)} startIcon={<Undo />}>
              Reset
            </Button>
            <Button size="small" startIcon={<Clear />} onClick={() => history.push('/companies')}>
              Cancel
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              disabled={updateCompanyNameLoading}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </div>
        </Fragment>
      )}
    </form>
  );
};

export default withRouter(CompanyUpdateForm);
