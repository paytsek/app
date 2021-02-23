import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { createEmployee } from '../../../redux/actions/employeesActions';
import useStyles from './styles';

const EmployeeForm = () => {
  const dispatch = useDispatch();

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
      gender: 'female',
      nationality: '',
      civilStatus: 'single',
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
      basicPay: '',
      others: [],
    },
    nonTaxableCompensation: {
      deminimis: '',
      others: [],
    },
  });

  const {
    basicInformation,
    personalInformation,
    registeredAddress,
    permanentAddress,
    basicAdjustment,
    bankingInformation,
    governmentIds,
    employeeFunction,
    taxableCompensation,
    nonTaxableCompensation,
  } = information;

  const { errors } = useSelector((state) => state.employeeCreate);
  const registeredAddressErrors = {
    street: errors['registeredAddress.street'],
    city: errors['registeredAddress.city'],
    country: errors['registeredAddress.country'],
    zipCode: errors['registeredAddress.zipCode'],
  };

  const permanentAddressErrors = {
    street: errors['permanentAddress.street'],
    city: errors['permanentAddress.city'],
    country: errors['permanentAddress.country'],
    zipCode: errors['permanentAddress.zipCode'],
  };

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

  const handleOnChangeAddress = (e, addressType) =>
    setInformation((prevState) => ({
      ...prevState,
      [addressType]: { ...prevState[addressType], [e.target.name]: e.target.value },
    }));

  const handleOnChangeBasicAdjustment = (e) =>
    setInformation((prevState) => ({
      ...prevState,
      basicAdjustment: { ...prevState.basicAdjustment, [e.target.name]: e.target.value },
    }));

  const handleOnChangeBankingInformation = (e) =>
    setInformation((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleOnChangeGovernmentIds = (e) =>
    setInformation((prevState) => ({
      ...prevState,
      governmentIds: { ...prevState.governmentIds, [e.target.name]: e.target.value },
    }));

  const handleOnChangeEmployeeFunction = (e) =>
    setInformation((prevState) => ({
      ...prevState,
      employeeFunction: {
        ...prevState.employeeFunction,
        [e.target.name]:
          e.target.name === 'primaryEmployer' ? e.target.checked : e.target.value,
      },
    }));

  const handleOnChangeTaxableCompensation = (e, other) => {
    if (other) {
      setInformation((prevState) => ({
        ...prevState,
        taxableCompensation: {
          ...prevState.taxableCompensation,
          others: prevState.taxableCompensation.others.map((otherTaxablePay) =>
            (otherTaxablePay.taxablePay === other
              ? { value: e.target.value, taxablePay: other }
              : otherTaxablePay)),
        },
      }));
    } else {
      setInformation((prevState) => ({
        ...prevState,
        taxableCompensation: {
          ...prevState.taxableCompensation,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  const handleOnChangeNonTaxableCompensation = (e, other) => {
    if (other) {
      setInformation((prevState) => ({
        ...prevState,
        nonTaxableCompensation: {
          ...prevState.nonTaxableCompensation,
          others: prevState.nonTaxableCompensation.others.map((otherNonTaxable) =>
            (otherNonTaxable.nonTaxablePay === other
              ? { value: e.target.value, nonTaxablePay: other }
              : otherNonTaxable)),
        },
      }));
    } else {
      setInformation((prevState) => ({
        ...prevState,
        nonTaxableCompensation: {
          ...prevState.nonTaxableCompensation,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  const setOtherTaxableDefault = (others) =>
    setInformation((prevState) => ({
      ...prevState,
      taxableCompensation: {
        ...prevState.taxableCompensation,
        others: others.map((other) => ({ taxablePay: other._id, value: '' })),
      },
    }));

  const setOtherNonTaxableDefault = (others) =>
    setInformation((prevState) => ({
      ...prevState,
      nonTaxableCompensation: {
        ...prevState.nonTaxableCompensation,
        others: others.map((other) => ({ nonTaxablePay: other._id, value: '' })),
      },
    }));

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const employeeData = {
      ...basicInformation,
      ...personalInformation,
      ...basicAdjustment,
      ...governmentIds,
      ...employeeFunction,
      department: (employeeFunction.department && employeeFunction.department) || null,
      status: {
        active: true,
        effectivitydate: basicInformation.hireDate,
      },
      bankingInformation,
      registeredAddress,
      permanentAddress,
      compensation: {
        basicPay: taxableCompensation.basicPay,
        deminims: nonTaxableCompensation.deminimis,
        otherTaxablePays: taxableCompensation.others,
        otherNonTaxablePays: nonTaxableCompensation.others,
      },
    };

    dispatch(createEmployee(employeeData));
  };

  const { gridContainer, formButton } = useStyles();

  return (
    <Grid container spacing={3} className={gridContainer}>
      <Grid item xs={12}>
        <BasicInformation
          basicInformation={basicInformation}
          onChange={handleOnChangeBasicInformation}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <PersonalInformation
          personalInformation={personalInformation}
          onChange={handleOnChangePersonalInformation}
          errors={errors}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <AddressInformation
          title="Registered Address"
          address={registeredAddress}
          onChange={handleOnChangeAddress}
          addressType="registeredAddress"
          errors={registeredAddressErrors}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <AddressInformation
          title="Permanent Address"
          address={permanentAddress}
          onChange={handleOnChangeAddress}
          addressType="permanentAddress"
          errors={permanentAddressErrors}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicAdjustment
          basicAdjustment={basicAdjustment}
          onChange={handleOnChangeBasicAdjustment}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <BankingInformation
          bankingInformation={bankingInformation}
          onChange={handleOnChangeBankingInformation}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <GovernmentIds
          governmentIds={governmentIds}
          onChange={handleOnChangeGovernmentIds}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <EmployeeFuntion
          employeeFunction={employeeFunction}
          onChange={handleOnChangeEmployeeFunction}
          errors={errors}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TaxableCompensation
          taxableCompensation={taxableCompensation}
          onChange={handleOnChangeTaxableCompensation}
          setDefault={setOtherTaxableDefault}
          errors={errors}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <NonTaxableCompensation
          nonTaxableCompensation={nonTaxableCompensation}
          onChange={handleOnChangeNonTaxableCompensation}
          setDefault={setOtherNonTaxableDefault}
        />
      </Grid>
      <Grid item>
        <div className={formButton}>
          <Button color="primary" variant="contained" onClick={handleOnSubmit}>
            Save Employee
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
