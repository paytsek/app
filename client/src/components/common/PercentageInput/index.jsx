import React, { createRef, useEffect } from 'react';
import { Input, InputAdornment } from '@material-ui/core';

const PercentageInput = ({ onChange, value, ...props }) => {
  const reference = createRef();
  const wheelHandler = e => {
    if (e.target.type === 'number') {
      e.target.blur();
    }
  };

  useEffect(() => {
    const reff = reference.current.getElementsByTagName('input')[0];
    reff.addEventListener('wheel', wheelHandler);
    return () => reff.removeEventListener('wheel', wheelHandler);
  }, [reference]);

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
      onWheel={e => e.currentTarget.blur()}
      onChange={handleOnChange}
      ref={reference}
    />
  );
};

export default PercentageInput;
