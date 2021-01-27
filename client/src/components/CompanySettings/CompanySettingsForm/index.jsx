import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';

import TitleBox from '../../common/TitleBox';
import BasicSettings from './BasicSettings';
import RegisteredAddress from './RegisteredAddress';
import Departments from './Departments';
import TaxablePays from './TaxablePays';
import NonTaxablePays from './NonTaxablePays';
import SSSCalculations from './SSSCalculations';
import PhicCalculations from './PhicCalculations';
import ThirtheenthMonthPayCalculations from './ThirtheenthMonthPayCalculations';
import AccountingJournalEntries from './AccountingJournalEntries';

import useStyles from './styles';

const CompanySettingsForm = () => {
  const [settings, setSettings] = useState({
    basicSettings: {
      tin: '',
      rdoCode: '',
      category: 'private',
      reportingBase: 'payrollCutOffs',
      frequency: 'monthly',
      firstCutOff: '',
      secondCutOff: '',
      firstPayout: '',
      secondPayout: '',
      nightDifferential: 'disabled',
      nightDifferentialPercentage: '',
      overtime: 'disabled',
      overtimePay: '',
      overtimeRestDayPay: '',
      holiday: false,
      regularHolidayPay: '',
      specialHolidayPay: '',
      workingDays: 22,
      taxReliefInternationTaxTreaty: false,
      deminimis: false,
      emailNotification: false,
    },
    registeredAddress: {
      street: '',
      city: '',
      country: '',
      zipCode: '',
    },
    departments: [],
    taxablePays: [],
    nonTaxablePays: [],
    sssCalculation: {
      deminimis: false,
      taxablePays: {},
      nonTaxablePays: {},
    },
    phicCalculation: {
      deminimis: false,
      taxablePays: {},
      nonTaxablePays: {},
    },
    thirtheenthMonthPayCalculation: {
      deminimis: false,
      absences: false,
      taxablePays: {},
      nonTaxablePays: {},
    },
  });

  const {
    basicSettings,
    registeredAddress,
    departments,
    taxablePays,
    nonTaxablePays,
    sssCalculation,
    phicCalculation,
    thirtheenthMonthPayCalculation,
  } = settings;
  const { nightDifferential, overtime, holiday } = basicSettings;

  const handleOnChangeBasicSettings = e => setSettings(prevState => ({
    ...prevState,
    basicSettings: {
      ...prevState.basicSettings,
      [e.target.name]: e.target.value || e.target.checked,
    },
  }));

  const handleOnChangeRegisteredAddress = e => setSettings(prevState => ({
    ...prevState,
    registeredAddress: { ...prevState.registeredAddress, [e.target.name]: e.target.value },
  }));

  const handleOnChangeCalculation = (calculation, e) => setSettings(prevState => ({
    ...prevState,
    [calculation]: {
      ...prevState[calculation],
      [e.target.name]: e.target.checked,
    },
  }));

  const handleOnChangeTaxablePay = (calculation, e) => setSettings(prevState => ({
    ...prevState,
    [calculation]: {
      ...prevState[calculation],
      taxablePays: {
        ...prevState[calculation].taxablePays,
        [e.target.name]: e.target.checked,
      },
    },
  }));

  const handleOnChangeNonTaxablePay = (calculation, e) => setSettings(prevState => ({
    ...prevState,
    [calculation]: {
      ...prevState[calculation],
      nonTaxablePays: {
        ...prevState[calculation].nonTaxablePays,
        [e.target.name]: e.target.checked,
      },
    },
  }));

  const handleOnAdd = (key, val) => setSettings(prevState => ({
    ...prevState,
    [key]: [...prevState[key], val],
    sssCalculation: {
      ...prevState.sssCalculation,
      [key]: { ...prevState.sssCalculation[key], [val]: false },
    },
    phicCalculation: {
      ...prevState.phicCalculation,
      [key]: { ...prevState.phicCalculation[key], [val]: false },
    },
    thirtheenthMonthPayCalculation: {
      ...prevState.thirtheenthMonthPayCalculation,
      [key]: { ...prevState.thirtheenthMonthPayCalculation[key], [val]: false },
    },
  }));

  const handleOnDelete = (key, val) => setSettings(prevState => {
    const newSssCalculation = prevState.sssCalculation;
    const newPhicCalculation = prevState.phicCalculation;
    const newThirtheenthMonthPayCalculation = prevState.thirtheenthMonthPayCalculation;
    delete newSssCalculation[key][val];
    delete newPhicCalculation[key][val];
    delete newThirtheenthMonthPayCalculation[key][val];

    return {
      ...prevState,
      [key]: prevState[key].filter(prevVal => prevVal !== val),
      sssCalculation: {
        ...prevState.sssCalculation,
        ...newSssCalculation,
      },
      phicCalculation: {
        ...prevState.phicCalculation,
        ...newPhicCalculation,
      },
      thirtheenthMonthPayCalculation: {
        ...prevState.newThirtheenthMonthPayCalculation,
        ...newThirtheenthMonthPayCalculation,
      },
    };
  });

  console.log(settings);

  const { paper, gridContainer, fieldsContainer, calculationsContainer } = useStyles();

  useEffect(() => {
    if (nightDifferential !== 'percentage') {
      setSettings(prevState => ({
        ...prevState,
        basicSettings: { ...prevState.basicSettings, nightDifferentialPercentage: '' },
      }));
    }
    if (overtime !== 'hourly') {
      setSettings(prevState => ({
        ...prevState,
        basicSettings: { ...prevState.basicSettings, overtimePay: '', overtimeRestDayPay: '' },
      }));
    }

    if (!holiday) {
      setSettings(prevState => ({
        ...prevState,
        basicSettings: { ...prevState.basicSettings, regularHolidayPay: '', specialHolidayPay: '' },
      }));
    }
  }, [nightDifferential, overtime, holiday]);

  return (
    <Grid container spacing={3} className={gridContainer}>
      {/* BASIC SETTINGS */}
      <Grid item xs={12}>
        <BasicSettings settings={basicSettings} onChange={handleOnChangeBasicSettings} />
      </Grid>
      {/* REGISTER ADDRESS */}
      <Grid item xs={12} md={6}>
        <RegisteredAddress
          settings={registeredAddress}
          onChange={handleOnChangeRegisteredAddress}
        />
      </Grid>
      {/* DEPARTMENTS */}
      <Grid item xs={12} md={6}>
        <Departments departments={departments} onAdd={handleOnAdd} onDelete={handleOnDelete} />
      </Grid>
      {/* GOVERNMENT REMITTANCES & 13th MONTH PAY CALCULATION */}
      <Grid item xs={12}>
        <Paper className={paper}>
          <TitleBox title="Government Remittances and 13th month pay Calculations" />
          <div className={fieldsContainer}>
            <Grid container spacing={6}>
              {/* Taxable pays */}
              <Grid item xs={12} md={6}>
                <TaxablePays
                  taxablePays={taxablePays}
                  onAdd={handleOnAdd}
                  onDelete={handleOnDelete}
                />
              </Grid>
              {/* Non-taxable pays */}
              <Grid item xs={12} md={6}>
                <NonTaxablePays
                  nonTaxablePays={nonTaxablePays}
                  onAdd={handleOnAdd}
                  onDelete={handleOnDelete}
                />
              </Grid>
              {/* SSS calculation */}
              <Grid item xs={12} md={4} className={calculationsContainer}>
                <Paper elevation={2}>
                  <SSSCalculations
                    settings={sssCalculation}
                    onChangeCalculation={handleOnChangeCalculation}
                    onChangeTaxablePay={handleOnChangeTaxablePay}
                    onChangeNonTaxablePay={handleOnChangeNonTaxablePay}
                  />
                </Paper>
              </Grid>
              {/* PHIC Calculations */}
              <Grid item xs={12} md={4} className={calculationsContainer}>
                <Paper elevation={2}>
                  <PhicCalculations
                    settings={phicCalculation}
                    onChangeCalculation={handleOnChangeCalculation}
                    onChangeTaxablePay={handleOnChangeTaxablePay}
                    onChangeNonTaxablePay={handleOnChangeNonTaxablePay}
                  />
                </Paper>
              </Grid>
              {/* 13th month pay calculation */}
              <Grid item xs={12} md={4} className={calculationsContainer}>
                <Paper>
                  <ThirtheenthMonthPayCalculations
                    settings={thirtheenthMonthPayCalculation}
                    onChangeCalculation={handleOnChangeCalculation}
                    onChangeTaxablePay={handleOnChangeTaxablePay}
                    onChangeNonTaxablePay={handleOnChangeNonTaxablePay}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
      {/* Accounting journal Entries */}
      <Grid item xs={12}>
        <AccountingJournalEntries />
      </Grid>
    </Grid>
  );
};

export default CompanySettingsForm;
