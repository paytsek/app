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
import TaxablePayFormDialog from '../Dialog/TaxablePayFormDialog';

import {
  getTaxablePays,
  createTaxablePay,
  deleteTaxablePay,
} from '../../redux/actions/taxablePaysActions';
import { TAXABLE_PAYS_UPDATE_RESET } from '../../redux/types';
import notification from '../../utils/notification';
import useStyles from './styles';

const Departments = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedTaxablePay, setSelectedTaxablePay] = useState({});

  const dispatch = useDispatch();

  const { taxablePays, loading } = useSelector((state) => state.taxablePaysList);
  const { loading: taxablePaysCreateLoading, errors: taxablePaysCreateError } = useSelector(
    (state) => state.taxablePaysCreate,
  );
  const { loading: taxablePaysDeleteLoading } = useSelector((state) => state.taxablePaysDelete);
  const { success, errors, loading: taxablePaysUpdateLoading } = useSelector(
    (state) => state.taxablePaysUpdate,
  );

  const { paper, fieldsContainer } = useStyles();

  const handleOnOpen = (taxablePay) => {
    setSelectedTaxablePay(taxablePay);
    setOpen(true);
  };

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

  const handleOnClose = () => {
    setSelectedTaxablePay({});
    setOpen(false);
    dispatch({ type: TAXABLE_PAYS_UPDATE_RESET });
  };

  useEffect(() => {
    dispatch(getTaxablePays());
  }, []);

  useEffect(() => {
    if (success) {
      handleOnClose();
    }
  }, [success]);

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
            {taxablePaysCreateError && (
              <FormHelperText error={!!taxablePaysCreateError.name}>
                {taxablePaysCreateError.name}
              </FormHelperText>
            )}
          </FormControl>
          {/* List of Taxable pays */}
          {taxablePays.length > 0 ? (
            <List>
              {taxablePays.map((taxablePay) => (
                <ListItem key={taxablePay._id}>
                  <ListItemText primary={taxablePay.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleOnOpen(taxablePay)}
                    >
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
      <TaxablePayFormDialog
        open={open}
        handleClose={handleOnClose}
        taxablePay={selectedTaxablePay}
        title="Edit Taxable Pay"
        errors={errors}
        loading={taxablePaysUpdateLoading}
      />
    </>
  );
};

export default Departments;
