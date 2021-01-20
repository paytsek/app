import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './styles';

const TitleBox = ({ title }) => {
  const { box } = useStyles();

  return (
    <div className={box}>
      <Typography>{title}</Typography>
    </div>
  );
};

export default TitleBox;
