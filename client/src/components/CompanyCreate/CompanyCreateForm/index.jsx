import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Clear } from '@material-ui/icons';

import { createCompanyName } from '../../../redux/actions/companiesActions';
import { COMPANY_NAME_CREATE_RESET } from '../../../redux/types';
import useStyles from './styles';

const CompanyCreateForm = ({ history }) => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const { errors, company } = useSelector(state => state.createCompanyName);

  const handleOnSubmit = e => {
    e.preventDefault();
    dispatch(createCompanyName({ name }));
  };

  const { formButton } = useStyles();

  useEffect(() => {
    if (company) {
      history.push('/companies');
    }

    return () => {
      dispatch({ type: COMPANY_NAME_CREATE_RESET });
    };
  }, [company]);

  return (
    <form onSubmit={handleOnSubmit}>
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
        <Button type="submit" color="primary" variant="contained" size="small" startIcon={<Save />}>
          Save
        </Button>
        <Button size="small" startIcon={<Clear />} onClick={() => history.push('/companies')}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default withRouter(CompanyCreateForm);
