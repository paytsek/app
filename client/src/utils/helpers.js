import { EMPLOYMENT_STATUS, CIVIL_STATUS, GENDER } from './globals';

export const getEmploymentStatusName = (employmentStatus) => {
  const status = EMPLOYMENT_STATUS.find(
    (empStatus) => empStatus.value === employmentStatus,
  );

  return (status && status.name) || '--';
};

export const getCivilStatusName = (civilStatus) => {
  const status = CIVIL_STATUS.find((civil) => civil.value === civilStatus);

  return (status && status.name) || '--';
};

export const getGenderName = (genderValue) => {
  const gender = GENDER.find((gen) => gen.value === genderValue);

  return (gender && gender.name) || '--';
};
