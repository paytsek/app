import React from 'react';
import { Input, InputAdornment } from '@material-ui/core';

const PercentageInput = ({ onChange, value, ...props }) => {
  const val = value * 100;

  const handleOnChange = e => {
    const event = { ...e };
    const newValue = e.target.value / 100;
    event.target.value = Number(newValue.toFixed(4));
    onChange(event);
  };

  return (
    <Input
      {...props}
      type="number"
      value={Number(val.toFixed(2)) || ''}
      endAdornment={<InputAdornment position="end">%</InputAdornment>}
      onChange={handleOnChange}
    />
  );
};

export default PercentageInput;
