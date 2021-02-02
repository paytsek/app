import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Button } from '@material-ui/core';

import { enqueueSnackbar, closeSnackbar } from '../redux/actions/snackbar';

const notification = (variant, message, dispatch) => enqueueSnackbar({
  message,
  options: {
    key: uuidV4(),
    variant,
    action: (key) => <Button onClick={() => dispatch(closeSnackbar(key))}>dismiss me</Button>,
  },
});

export default notification;
