import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormHelperText,
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import TitleBox from '../common/TitleBox';
import MuiSkeleton from '../MuiSkeleton';

import {
  getTaxablePays,
  createTaxablePay,
  deleteTaxablePay,
} from '../../redux/actions/taxablePaysActions';
import notification from '../../utils/notification';
import useStyles from './styles';

const Departments = () => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const { taxablePays, loading } = useSelector((state) => state.taxablePaysList);
  const { loading: taxablePaysCreateLoading } = useSelector((state) => state.taxablePaysCreate);
  const { loading: taxablePaysDeleteLoading } = useSelector((state) => state.taxablePaysDelete);

  const { paper, fieldsContainer } = useStyles();

  const handleOnAdd = (val) => {
    const existTaxablePay = taxablePays
      .map((taxablePay) => taxablePay.name.toLowerCase())
      .includes(val.toLowerCase());

    if (!val) {
      return dispatch(notification('warning', 'Please add a taxable pay name', dispatch));
    }

    if (existTaxablePay) {
      return dispatch(notification('warning', `${val} already exist`, dispatch));
    }
    dispatch(createTaxablePay({ name }));
    return setName('');
  };

  useEffect(() => {
    dispatch(getTaxablePays());
  }, []);

  if (loading) return <MuiSkeleton />;

  return (
    <>
      <Paper className={paper} elevation={6}>
        <TitleBox title="Taxable Pays" />
        <div className={fieldsContainer}>
          <FormControl fullWidth size="small" margin="normal">
            <InputLabel htmlFor="taxablePay">Enter a taxable pay</InputLabel>
            <Input
              id="taxablePay"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={() => handleOnAdd(name)}
                    disabled={taxablePaysCreateLoading}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )}
            />
            <FormHelperText error>Error</FormHelperText>
          </FormControl>
          {/* List of Taxable pays */}
          {taxablePays.length > 0 ? (
            <List>
              {taxablePays.map((taxablePay) => (
                <ListItem key={taxablePay._id}>
                  <ListItemText primary={taxablePay.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => dispatch(deleteTaxablePay(taxablePay._id))}
                      disabled={taxablePaysDeleteLoading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </Paper>
    </>
  );
};

export default Departments;
