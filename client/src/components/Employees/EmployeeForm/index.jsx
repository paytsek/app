import React, { useState } from 'react';
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
  const [information, setInformation] = useState({
    basicInformation: {
      email: '',
      employeeNumber: '',
      firstName: '',
      lastName: '',
      hireDate: '',
      resignationDate: '',
      rdoCode: '',
      payRemittances: true,
    },
    personalInformation: {
      gender: '',
      nationality: '',
      civilStatus: '',
      numberOfQualifiedDependents: 0,
      validId: '',
      validIdNumber: '',
      placeOfIssue: '',
      birthDate: '',
    },
    registeredAddress: {
      street: '',
      city: '',
      country: '',
      zipCode: '',
    },
    permanentAddress: {
      street: '',
      city: '',
      country: '',
      zipCode: '',
    },
    basicAdjustment: {
      sssLoanBalance: 0,
      hdmfLoanBalance: 0,
      allowances: 0,
    },
    bankingInformation: '',
    governmentIds: {
      sssNumber: '',
      phicNumber: '',
      hdmfNumber: '',
      tin: '',
    },
    employeeFunction: {
      department: '',
      position: '',
      workingDays: 22,
      workingHours: 8,
      primaryEmployer: true,
    },
    taxableCompensation: {
      basicPay: 0,
      others: {},
    },
    nonTaxableCompensation: {
      deminimis: 0,
      others: {},
    },
  });

  const { basicInformation, personalInformation } = information;
  console.log(information);

  const handleOnChangeBasicInformation = (e) =>
    setInformation((prevState) => ({
      ...prevState,
      basicInformation: {
        ...prevState.basicInformation,
        [e.target.name]:
          e.target.name === 'payRemittances' ? e.target.checked : e.target.value,
      },
    }));

  const handleOnChangePersonalInformation = (e) => {
    setInformation((prevState) => ({
      ...prevState,
      personalInformation: {
        ...prevState.personalInformation,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const { gridContainer, formButton } = useStyles();

  return (
    <Grid container spacing={3} className={gridContainer}>
      <Grid item xs={12}>
        <BasicInformation
          basicInformation={basicInformation}
          onChange={handleOnChangeBasicInformation}
        />
      </Grid>
      <Grid item xs={12}>
        <PersonalInformation
          personalInformation={personalInformation}
          onChange={handleOnChangePersonalInformation}
        />
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
