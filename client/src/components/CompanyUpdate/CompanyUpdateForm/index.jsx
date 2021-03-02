import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Clear, Undo, Delete } from '@material-ui/icons';

import MuiSkeleton from '../../MuiSkeleton';

import {
  getCompanyDetails,
  updateCompanyName,
  deleteCompany,
} from '../../../redux/actions/companiesActions';
import { COMPANY_NAME_UPDATE_RESET, COMPANY_TENANT_REMOVE } from '../../../redux/types';
import useStyles from './styles';

const CompanyUpdateForm = ({ history, match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const { slug } = useSelector((state) => state.companyTenant);
  const { company, loading } = useSelector((state) => state.companyDetails);
  const {
    errors,
    loading: updateCompanyNameLoading,
    success: updateCompanyNameSuccess,
  } = useSelector((state) => state.updateCompanyName);
  const { loading: companyDeleteLoading, success } = useSelector(
    (state) => state.companyDelete,
  );

  const { formButton } = useStyles();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompanyName(id, { name }));
  };

  const handleDeleteCompany = async () => {
    await dispatch(deleteCompany(id));

    if (slug === company.slug) {
      dispatch({ type: COMPANY_TENANT_REMOVE });
      history.push('/select-company');
    }
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

    if (success) {
      history.push(`/${slug}/companies`);
    }

    if (updateCompanyNameSuccess) {
      history.push(`/${name}/companies`);
    }
  }, [company.name, success, updateCompanyNameSuccess]);

  return (
    <form onSubmit={handleOnSubmit}>
      {loading ? (
        <MuiSkeleton />
      ) : (
        <>
          <Grid container>
            <Grid item xs={12} md={7} lg={8}>
              <TextField
                placeholder="Company Name"
                label="Name"
                fullWidth
                margin="normal"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <Button
              size="small"
              onClick={() => setName(company.name)}
              startIcon={<Undo />}
            >
              Reset
            </Button>
            <Button
              size="small"
              startIcon={<Clear />}
              onClick={() => history.push(`/${slug}/companies/${id}`)}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              disabled={updateCompanyNameLoading || companyDeleteLoading}
              onClick={handleDeleteCompany}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default withRouter(CompanyUpdateForm);
