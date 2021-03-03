import { EMPLOYMENT_STATUS } from './globals';

export const getEmploymentStatusName = (employmentStatus) => {
  const status = EMPLOYMENT_STATUS.find(
    (empStatus) => empStatus.value === employmentStatus,
  );

  return (status && status.name) || '';
};

export const x = () => {};
