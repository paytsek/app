import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Paper, Button } from '@material-ui/core';

import TitleBox from '../../common/TitleBox';
import BasicSettings from './BasicSettings';
import RegisteredAddress from './RegisteredAddress';
import Departments from './Departments';
import TaxablePays from './TaxablePays';
import NonTaxablePays from './NonTaxablePays';
import SSSCalculations from './SSSCalculations';
import PhicCalculations from './PhicCalculations';
import ThirteenthMonthPayCalculations from './ThirteenthMonthPayCalculations';
import AccountingJournalEntries from './AccountingJournalEntries';

import {
  createCompanySettings,
  getCompanyDetails,
  updateCompanySettings,
} from '../../../redux/actions/companiesActions';
import { COMPANY_DETAILS_RESET, COMPANY_SETTINGS_CREATE_RESET } from '../../../redux/types';
import useStyles from './styles';

const CompanySettingsForm = () => {
  const [settings, setSettings] = useState({
    basicSettings: {
      tin: '',
      rdoCode: '',
      atc: '',
      sssRegistrationNumber: '',
      phicNumber: '',
      hdmfNumber: '',
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
    thirteenthMonthPayCalculation: {
      deminimis: false,
      absences: false,
      taxablePays: {},
      nonTaxablePays: {},
    },
    accountingJournal: {
      taxableCompensation: 'wagesAndSalaries',
      thirteenthMonthPay: 'wagesAndSalaries',
      nonTaxableCompensation: 'wagesAndSalaries',
      preTaxDeduction: 'wagesAndSalaries',
      employeeBenefits: 'wagesAndSalaries',
      sssPayable: 'wagesAndSalaries',
      hdmfPayable: 'wagesAndSalaries',
      phicPayable: 'wagesAndSalaries',
      taxDue: 'wagesAndSalaries',
      reimbursement: 'wagesAndSalaries',
      postTaxDeduction: 'wagesAndSalaries',
      netPay: 'wagesAndSalaries',
      deminimisBenefits: 'wagesAndSalaries',
    },
  });

  const dispatch = useDispatch();

  const { errors, companySettings } = useSelector(state => state.companySettingsCreate);
  const { company } = useSelector(state => state.companyDetails);
  const { id } = useSelector(state => state.companySlug);

  const {
    basicSettings,
    registeredAddress,
    departments,
    taxablePays,
    nonTaxablePays,
    sssCalculation,
    phicCalculation,
    thirteenthMonthPayCalculation,
    accountingJournal,
  } = settings;

  const handleOnChangeBasicSettings = e => {
    setSettings(prevState => ({
      ...prevState,
      basicSettings: {
        ...prevState.basicSettings,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      },
    }));
  };

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
    thirteenthMonthPayCalculation: {
      ...prevState.thirteenthMonthPayCalculation,
      [key]: { ...prevState.thirteenthMonthPayCalculation[key], [val]: false },
    },
  }));

  const handleOnDelete = (key, val) => setSettings(prevState => {
    const newSssCalculation = prevState.sssCalculation;
    const newPhicCalculation = prevState.phicCalculation;
    const newThirteenthMonthPayCalculation = prevState.thirteenthMonthPayCalculation;

    delete newSssCalculation[key][val];
    delete newPhicCalculation[key][val];
    delete newThirteenthMonthPayCalculation[key][val];

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
      thirteenthMonthPayCalculation: {
        ...prevState.newThirteenthMonthPayCalculation,
        ...newThirteenthMonthPayCalculation,
      },
    };
  });

  const handleOnDeleteDepartment = (key, val) => setSettings(prevState => ({
    ...prevState,
    [key]: prevState[key].filter(department => department !== val),
  }));

  const handleOnChangeAccountingJournal = e => setSettings(prevState => ({
    ...prevState,
    accountingJournal: {
      ...prevState.accountingJournal,
      [e.target.name]: e.target.value,
    },
  }));

  const handleOnSubmit = () => {
    const data = {
      ...basicSettings,
      departments,
      registeredAddress,
      taxablePays,
      nonTaxablePays,
      sssCalculation,
      phicCalculation,
      thirteenthMonthPayCalculation,
      accountingJournal,
    };
    if ((company && company.companySettings) || companySettings) {
      dispatch(
        updateCompanySettings(
          (company.companySettings && company.companySettings._id) || companySettings._id,
          data,
        ),
      );
    } else {
      dispatch(createCompanySettings(data));
    }
  };

  const { paper, gridContainer, fieldsContainer, calculationsContainer } = useStyles();

  useEffect(() => {
    if (company && company.companySettings) {
      setSettings(prevState => ({
        ...prevState,
        basicSettings: {
          ...prevState.basicSettings,
          tin: company.companySettings.tin,
          rdoCode: company.companySettings.rdoCode,
          atc: company.companySettings.atc,
          sssRegistrationNumber: company.companySettings.sssRegistrationNumber,
          phicNumber: company.companySettings.phicNumber,
          hdmfNumber: company.companySettings.hdmfNumber,
          category: company.companySettings.category,
          reportingBase: company.companySettings.reportingBase,
          frequency: company.companySettings.frequency,
          firstCutOff: company.companySettings.firstCutOff,
          secondCutOff: company.companySettings.secondCutOff,
          firstPayout: company.companySettings.firstPayout,
          secondPayout: company.companySettings.secondCutOff,
          nightDifferential: company.companySettings.nightDifferential,
          nightDifferentialPercentage: company.companySettings.nightDifferentialPercentage,
          overtime: company.companySettings.overtime,
          overtimePay: company.companySettings.overtimePay,
          overtimeRestDayPay: company.companySettings.overtimeRestDayPay,
          holiday: company.companySettings.holiday,
          regularHolidayPay: company.companySettings.regularHolidayPay,
          specialHolidayPay: company.companySettings.specialHolidayPay,
          workingDays: company.companySettings.workingDays,
          taxReliefInternationTaxTreaty: company.companySettings.taxReliefInternationTaxTreaty,
          deminimis: company.companySettings.deminimis,
          emailNotification: company.companySettings.emailNotification,
        },
        registeredAddress: {
          ...prevState.registeredAddress,
          ...company.companySettings.registeredAddress,
        },
        departments: company.companySettings.departments,
        taxablePays: company.companySettings.taxablePays,
        nonTaxablePays: company.companySettings.nonTaxablePays,
        sssCalculation: company.companySettings.sssCalculation,
        phicCalculation: company.companySettings.phicCalculation,
        thirteenthMonthPayCalculation: company.companySettings.thirteenthMonthPayCalculation,
        accountingJournal: company.companySettings.accountingJournal,
      }));
    }
  }, [company]);

  useEffect(() => {
    if (id) {
      dispatch(getCompanyDetails(id));
    }

    return () => {
      dispatch({ type: COMPANY_DETAILS_RESET });
      dispatch({ type: COMPANY_SETTINGS_CREATE_RESET });
    };
  }, []);

  return (
    <Grid container spacing={3} className={gridContainer}>
      {/* BASIC SETTINGS */}
      <Grid item xs={12}>
        <BasicSettings
          settings={basicSettings}
          onChange={handleOnChangeBasicSettings}
          errors={errors}
        />
      </Grid>
      {/* REGISTER ADDRESS */}
      <Grid item xs={12} md={6}>
        <RegisteredAddress
          settings={registeredAddress}
          onChange={handleOnChangeRegisteredAddress}
          errors={errors}
        />
      </Grid>
      {/* DEPARTMENTS */}
      <Grid item xs={12} md={6}>
        <Departments
          departments={departments}
          onAdd={handleOnAdd}
          onDelete={handleOnDeleteDepartment}
          errors={errors}
        />
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
                  <ThirteenthMonthPayCalculations
                    settings={thirteenthMonthPayCalculation}
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
        <AccountingJournalEntries
          settings={accountingJournal}
          onChange={handleOnChangeAccountingJournal}
          errors={errors}
        />
      </Grid>
      <Grid item>
        <Button color="primary" variant="contained" onClick={handleOnSubmit}>
          Save Company Settings
        </Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(CompanySettingsForm);
