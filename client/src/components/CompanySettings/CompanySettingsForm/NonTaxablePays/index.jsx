import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography,
  FormControl,
  InputAdornment,
  Input,
  InputLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import notification from '../../../../utils/notification';

const NonTaxablePays = ({ nonTaxablePays, onAdd, onDelete }) => {
  const [nonTaxablePayName, setNonTaxabalePayName] = useState('');

  const dispatch = useDispatch();

  const handleOnAdd = val => {
    const existNonTaxablePay = nonTaxablePays.includes(val);

    if (!val) {
      return dispatch(notification('warning', 'Please add a non taxable pay', dispatch));
    }

    if (existNonTaxablePay) {
      return dispatch(notification('warning', `${val} already exist`, dispatch));
    }
    onAdd('nonTaxablePays', val);
    return setNonTaxabalePayName('');
  };

  return (
    <Fragment>
      <Typography variant="h6">Non-Taxable Pays</Typography>
      <FormControl fullWidth size="small" margin="normal">
        <InputLabel htmlFor="nonTaxablePays">Non-Taxable Pays</InputLabel>
        <Input
          id="nonTaxablePays"
          name="nonTaxablePayName"
          value={nonTaxablePayName}
          onChange={e => setNonTaxabalePayName(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton color="primary" onClick={() => handleOnAdd(nonTaxablePayName)}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {/* List of non-taxable pays */}
      {nonTaxablePays.length > 0 ? (
        <List>
          {nonTaxablePays.map(nonTaxablePay => (
            <ListItem key={nonTaxablePay}>
              <ListItemText primary={nonTaxablePay} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete('nonTaxablePays', nonTaxablePay)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : null}
    </Fragment>
  );
};

export default NonTaxablePays;
