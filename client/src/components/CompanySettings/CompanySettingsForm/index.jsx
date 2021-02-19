import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Paper, Button } from '@material-ui/core';
import { Undo } from '@material-ui/icons';

import TitleBox from '../../common/TitleBox';
import BasicSettings from './BasicSettings';
import RegisteredAddress from './RegisteredAddress';
import SSSCalculations from './SSSCalculations';
import PhicCalculations from './PhicCalculations';
import ThirteenthMonthPayCalculations from './ThirteenthMonthPayCalculations';
import AccountingJournalEntries from './AccountingJournalEntries';
import MuiSkeleton from '../../MuiSkeleton';

import {
  createCompanySettings,
  getCompanyDetails,
  updateCompanySettings,
} from '../../../redux/actions/companiesActions';
import {
  COMPANY_DETAILS_RESET,
  COMPANY_SETTINGS_CREATE_RESET,
} from '../../../redux/types';
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
    sssCalculation: {
      deminimis: false,
      taxablePays: [],
      nonTaxablePays: [],
    },
    phicCalculation: {
      deminimis: false,
      taxablePays: [],
      nonTaxablePays: [],
    },
    thirteenthMonthPayCalculation: {
      deminimis: false,
      absences: false,
      taxablePays: [],
      nonTaxablePays: [],
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

  const { errors, companySettings, loading } = useSelector(
    (state) => state.companySettingsCreate,
  );
  const { company, loading: companyDetailsLoading } = useSelector(
    (state) => state.companyDetails,
  );
  const { taxablePays, nonTaxablePays } = company;
  const { id } = useSelector((state) => state.companyTenant);

  const {
    basicSettings,
    registeredAddress,
    sssCalculation,
    phicCalculation,
    thirteenthMonthPayCalculation,
    accountingJournal,
  } = settings;

  const handleOnChangeBasicSettings = (e) => {
    setSettings((prevState) => ({
      ...prevState,
      basicSettings: {
        ...prevState.basicSettings,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      },
    }));
  };

  const handleOnChangeRegisteredAddress = (e) =>
    setSettings((prevState) => ({
      ...prevState,
      registeredAddress: {
        ...prevState.registeredAddress,
        [e.target.name]: e.target.value,
      },
    }));

  const handleOnChangeCalculation = (calculation, e) =>
    setSettings((prevState) => ({
      ...prevState,
      [calculation]: {
        ...prevState[calculation],
        [e.target.name]: e.target.checked,
      },
    }));

  const handleOnChangeTaxablePay = (calculation, e) => {
    if (e.target.checked) {
      setSettings((prevState) => ({
        ...prevState,
        [calculation]: {
          ...prevState[calculation],
          taxablePays: [...prevState[calculation].taxablePays, e.target.value],
        },
      }));
    } else {
      setSettings((prevState) => ({
        ...prevState,
        [calculation]: {
          ...prevState[calculation],
          taxablePays: prevState[calculation].taxablePays.filter(
            (taxablePay) => taxablePay !== e.target.value,
          ),
        },
      }));
    }
  };

  const handleOnChangeNonTaxablePay = (calculation, e) => {
    if (e.target.checked) {
      setSettings((prevState) => ({
        ...prevState,
        [calculation]: {
          ...prevState[calculation],
          nonTaxablePays: [...prevState[calculation].nonTaxablePays, e.target.value],
        },
      }));
    } else {
      setSettings((prevState) => ({
        ...prevState,
        [calculation]: {
          ...prevState[calculation],
          nonTaxablePays: prevState[calculation].nonTaxablePays.filter(
            (nonTaxablePay) => nonTaxablePay !== e.target.value,
          ),
        },
      }));
    }
  };

  const handleOnChangeAccountingJournal = (e) =>
    setSettings((prevState) => ({
      ...prevState,
      accountingJournal: {
        ...prevState.accountingJournal,
        [e.target.name]: e.target.value,
      },
    }));

  const handleOnSubmit = () => {
    const data = {
      ...basicSettings,
      registeredAddress,
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

  const setCompanySettings = () => {
    setSettings((prevState) => ({
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
        taxReliefInternationTaxTreaty:
          company.companySettings.taxReliefInternationTaxTreaty,
        deminimis: company.companySettings.deminimis,
        emailNotification: company.companySettings.emailNotification,
      },
      registeredAddress: {
        ...prevState.registeredAddress,
        ...company.companySettings.registeredAddress,
      },
      taxablePays: company.companySettings.taxablePays,
      nonTaxablePays: company.companySettings.nonTaxablePays,
      sssCalculation: company.companySettings.sssCalculation,
      phicCalculation: company.companySettings.phicCalculation,
      thirteenthMonthPayCalculation:
        company.companySettings.thirteenthMonthPayCalculation,
      accountingJournal: company.companySettings.accountingJournal,
    }));
  };

  const {
    paper,
    gridContainer,
    fieldsContainer,
    calculationsContainer,
    formButton,
  } = useStyles();

  useEffect(() => {
    if (company && company.companySettings) {
      setCompanySettings();
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

  if (companyDetailsLoading) return <MuiSkeleton />;

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
      <Grid item xs={12}>
        <RegisteredAddress
          settings={registeredAddress}
          onChange={handleOnChangeRegisteredAddress}
          errors={errors}
        />
      </Grid>
      {/* GOVERNMENT REMITTANCES & 13th MONTH PAY CALCULATION */}
      <Grid item xs={12}>
        <Paper className={paper} elevation={6}>
          <TitleBox title="Government Remittances and 13th month pay Calculations" />
          <div className={fieldsContainer}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={4} className={calculationsContainer}>
                <Paper elevation={2}>
                  <SSSCalculations
                    settings={sssCalculation}
                    onChangeCalculation={handleOnChangeCalculation}
                    onChangeTaxablePay={handleOnChangeTaxablePay}
                    onChangeNonTaxablePay={handleOnChangeNonTaxablePay}
                    taxablePaysOptions={taxablePays}
                    nonTaxablePaysOptions={nonTaxablePays}
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
                    taxablePaysOptions={taxablePays}
                    nonTaxablePaysOptions={nonTaxablePays}
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
        <div className={formButton}>
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={handleOnSubmit}
          >
            Save Company Settings
          </Button>
          {company.companySettings && (
            <Button
              size="small"
              onClick={() => (company.companySettings && setCompanySettings()) || null}
              startIcon={<Undo />}
            >
              Reset
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(CompanySettingsForm);
