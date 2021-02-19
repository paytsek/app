import React from 'react';
import { Grid, Button } from '@material-ui/core';

import BasicInformation from './BasicInformation';
import PersonalInformation from './PersonalInformation';
import AddressInformation from './AddressInformation';
import BasicAdjustment from './BasicAdjustment';
import BankingInformation from './BankingInformation';
import GovernmentIds from './GovernmentIds';
import EmployeeFuntion from './EmployeeFunction';
import TaxableCompensation from './TaxableCompensation';
import NonTaxableCompensation from './NonTaxableCompensation';

import useStyles from './styles';

const EmployeeForm = () => {
  const { gridContainer, formButton } = useStyles();

  return (
    <Grid container spacing={3} className={gridContainer}>
      <Grid item xs={12}>
        <BasicInformation />
      </Grid>
      <Grid item xs={12}>
        <PersonalInformation />
      </Grid>
      <Grid item md={6} xs={12}>
        <AddressInformation title="Registered Address" />
      </Grid>
      <Grid item md={6} xs={12}>
        <AddressInformation title="Permanent Address" />
      </Grid>
      <Grid item xs={12}>
        <BasicAdjustment />
      </Grid>
      <Grid item xs={12}>
        <BankingInformation />
      </Grid>
      <Grid item xs={12}>
        <GovernmentIds />
      </Grid>
      <Grid item xs={12}>
        <EmployeeFuntion />
      </Grid>
      <Grid item md={6} xs={12}>
        <TaxableCompensation />
      </Grid>
      <Grid item md={6} xs={12}>
        <NonTaxableCompensation />
      </Grid>
      <Grid item>
        <div className={formButton}>
          <Button color="primary" variant="contained">
            Save Employee
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
