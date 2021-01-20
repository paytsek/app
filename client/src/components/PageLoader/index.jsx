import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

const PageLoader = () => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <CircularProgress disableShrink />
    </div>
  );
};

export default PageLoader;
