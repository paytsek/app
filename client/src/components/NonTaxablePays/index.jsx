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
import NonTaxablePaysFormDialog from '../Dialog/NonTaxablePaysFormDialog';

import {
  getNonTaxablePays,
  createNonTaxablePay,
  deleteNonTaxablePay,
} from '../../redux/actions/nonTaxablePaysActions';
import { NON_TAXABLE_PAYS_UPDATE_RESET } from '../../redux/types';
import notification from '../../utils/notification';
import useStyles from './styles';

const NonTaxablePays = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedNonTaxablePay, setSelectedNonTaxablePay] = useState({});

  const dispatch = useDispatch();

  const { nonTaxablePays, loading } = useSelector((state) => state.nonTaxablePaysList);
  const { loading: nonTaxablePaysCreateLoading, errors: nonTaxablePaysCreateError } = useSelector(
    (state) => state.nonTaxablePaysCreate,
  );
  const { loading: nonTaxablePaysDeleteLoading } = useSelector(
    (state) => state.nonTaxablePaysDelete,
  );
  const { success, errors, loading: nonTaxablePaysUpdateLoading } = useSelector(
    (state) => state.nonTaxablePaysUpdate,
  );

  const { paper, fieldsContainer } = useStyles();

  const handleOnOpen = (nonTaxablePay) => {
    setSelectedNonTaxablePay(nonTaxablePay);
    setOpen(true);
  };

  const handleOnAdd = (val) => {
    const existNonTaxablePay = nonTaxablePays
      .map((nonTaxablePay) => nonTaxablePay.name.toLowerCase())
      .includes(val.toLowerCase());

    if (!val) {
      return dispatch(notification('warning', 'Please add a non taxable pay name', dispatch));
    }

    if (existNonTaxablePay) {
      return dispatch(notification('warning', `${val} already exist`, dispatch));
    }
    dispatch(createNonTaxablePay({ name }));
    return setName('');
  };

  const handleOnClose = () => {
    setSelectedNonTaxablePay({});
    setOpen(false);
    dispatch({ type: NON_TAXABLE_PAYS_UPDATE_RESET });
  };

  useEffect(() => {
    dispatch(getNonTaxablePays());
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
        <TitleBox title="Non Taxable Pays" />
        <div className={fieldsContainer}>
          <FormControl fullWidth size="small" margin="normal">
            <InputLabel htmlFor="nonTaxablePay">Enter a non taxable pay</InputLabel>
            <Input
              id="nonTaxablePay"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={() => handleOnAdd(name)}
                    disabled={nonTaxablePaysCreateLoading}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )}
            />
            {nonTaxablePaysCreateError && (
              <FormHelperText error={!!nonTaxablePaysCreateError.name}>
                {nonTaxablePaysCreateError.name}
              </FormHelperText>
            )}
          </FormControl>
          {/* List of Non Taxable pays */}
          {nonTaxablePays.length > 0 ? (
            <List>
              {nonTaxablePays.map((nonTaxablePay) => (
                <ListItem key={nonTaxablePay._id}>
                  <ListItemText primary={nonTaxablePay.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleOnOpen(nonTaxablePay)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => dispatch(deleteNonTaxablePay(nonTaxablePay._id))}
                      disabled={nonTaxablePaysDeleteLoading}
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
      <NonTaxablePaysFormDialog
        open={open}
        handleClose={handleOnClose}
        nonTaxablePay={selectedNonTaxablePay}
        title="Edit Taxable Pay"
        errors={errors}
        loading={nonTaxablePaysUpdateLoading}
      />
    </>
  );
};

export default NonTaxablePays;
