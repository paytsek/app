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

const TaxablePays = ({ taxablePays, onAdd, onDelete }) => {
  const [taxablePayName, setTaxabalePayName] = useState('');

  const dispatch = useDispatch();

  const handleOnAdd = val => {
    const existTaxablePay = taxablePays.includes(val);

    if (!val) {
      return dispatch(notification('warning', 'Please add a taxable pay', dispatch));
    }

    if (existTaxablePay) {
      return dispatch(notification('warning', `${val} already exist`, dispatch));
    }
    onAdd('taxablePays', val);
    return setTaxabalePayName('');
  };

  return (
    <Fragment>
      <Typography variant="h6">Taxable Pays</Typography>
      <FormControl fullWidth size="small" margin="normal">
        <InputLabel htmlFor="taxablePays">Taxable Pays</InputLabel>
        <Input
          id="taxablePays"
          name="taxablePayName"
          value={taxablePayName}
          onChange={e => setTaxabalePayName(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color="primary"
                onClick={() => handleOnAdd(taxablePayName)}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {/* List of taxable pays */}
      {taxablePays.length > 0 ? (
        <List>
          {taxablePays.map(taxablePay => (
            <ListItem key={taxablePay}>
              <ListItemText primary={taxablePay} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete('taxablePays', taxablePay)}
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

export default TaxablePays;
