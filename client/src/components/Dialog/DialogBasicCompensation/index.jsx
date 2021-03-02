import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Close as CloseIcon, Save } from '@material-ui/icons';
import moment from 'moment';
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  FormControl,
  Typography,
  Divider,
  FormHelperText,
} from '@material-ui/core';

import CompensationList from '../../CompensationsList';

import { getTaxablePays } from '../../../redux/actions/taxablePaysActions';
import { getNonTaxablePays } from '../../../redux/actions/nonTaxablePaysActions';
import useStyles from './styles';

const DialogBasicCompensation = ({
  open,
  handleClose,
  onSubmit,
  errors,
  loading,
  compensation,
}) => {
  const dispatch = useDispatch();

  const [basicCompensation, setBasicCompensation] = useState({
    basicPay: '',
    deminimis: '',
    effectivityDate: '',
    otherTaxablePays: [],
    otherNonTaxablePays: [],
  });
  const { basicPay, deminimis, effectivityDate } = basicCompensation;

  const {
    taxablePays,
    loading: taxablePaysListLoading,
    success: taxablePaysListSuccess,
  } = useSelector((state) => state.taxablePaysList);
  const {
    nonTaxablePays,
    loading: nonTaxablePaysListLoading,
    success: nonTaxablePaysListSuccess,
  } = useSelector((state) => state.nonTaxablePaysList);

  const { closeButton, formButton } = useStyles();

  const handleOnChangeOtherTaxablePays = (e, other) => {
    if (other._id) {
      setBasicCompensation((prevState) => ({
        ...prevState,
        otherTaxablePays: prevState.otherTaxablePays.map((otherTaxablePay) =>
          (otherTaxablePay.taxablePay === other._id
            ? { value: e.target.value, taxablePay: other._id }
            : otherTaxablePay)),
      }));
    } else {
      setBasicCompensation((prevState) => ({
        ...prevState,
        otherTaxablePays: prevState.otherTaxablePays.map((otherTaxablePay) =>
          (otherTaxablePay.taxablePay === other
            ? { value: e.target.value, taxablePay: other }
            : otherTaxablePay)),
      }));
    }
  };

  const handleOnChangeOtherNonTaxablePays = (e, other) => {
    if (other._id) {
      setBasicCompensation((prevState) => ({
        ...prevState,
        otherNonTaxablePays: prevState.otherNonTaxablePays.map((otherNonTaxablePay) =>
          (otherNonTaxablePay.nonTaxablePay === other._id
            ? { value: e.target.value, nonTaxablePay: other._id }
            : otherNonTaxablePay)),
      }));
    } else {
      setBasicCompensation((prevState) => ({
        ...prevState,
        otherNonTaxablePays: prevState.otherNonTaxablePays.map((otherNonTaxablePay) =>
          (otherNonTaxablePay.nonTaxablePay === other
            ? { value: e.target.value, nonTaxablePay: other }
            : otherNonTaxablePay)),
      }));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(basicCompensation);
  };

  const generateCompensation = (others) => {
    if (others) {
      return others.map((other) => ({
        ...other,
        other: other.taxablePay || other.nonTaxablePay,
      }));
    }
    return undefined;
  };

  useEffect(() => {
    if (open) {
      dispatch(getTaxablePays());
      dispatch(getNonTaxablePays());
    }

    if (open && Object.keys(compensation).length) {
      setBasicCompensation((prevState) => ({
        ...prevState,
        basicPay: compensation.basicPay,
        deminimis: compensation.deminimis,
        effectivityDate: moment(compensation.effectivityDate).format('YYYY-MM-DD'),
      }));
    }

    if (!open) {
      setBasicCompensation({
        basicPay: '',
        deminimis: '',
        effectivityDate: '',
        otherTaxablePays: [],
        otherNonTaxablePays: [],
      });
    }

    if (taxablePaysListSuccess && !compensation.otherTaxablePays) {
      setBasicCompensation((prevState) => ({
        ...prevState,
        otherTaxablePays: taxablePays.map((taxablePay) => ({
          taxablePay: taxablePay._id,
          value: '',
        })),
      }));
    } else {
      setBasicCompensation((prevState) => ({
        ...prevState,
        otherTaxablePays:
          compensation.otherTaxablePays &&
          compensation.otherTaxablePays.map((taxablePay) => ({
            taxablePay: taxablePay._id,
            value: taxablePay.value,
          })),
      }));
    }

    if (nonTaxablePaysListSuccess && !compensation.otherNonTaxablePays) {
      setBasicCompensation((prevState) => ({
        ...prevState,
        otherNonTaxablePays: nonTaxablePays.map((nonTaxablePay) => ({
          nonTaxablePay: nonTaxablePay._id,
          value: '',
        })),
      }));
    } else {
      setBasicCompensation((prevState) => ({
        ...prevState,
        otherNonTaxablePays:
          compensation.otherNonTaxablePays &&
          compensation.otherNonTaxablePays.map((nonTaxablePay) => ({
            nonTaxablePay: nonTaxablePay._id,
            value: nonTaxablePay.value,
          })),
      }));
    }
  }, [open, taxablePaysListSuccess, nonTaxablePaysListSuccess, compensation]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <>
        <DialogTitle>Compensation</DialogTitle>
        <IconButton aria-label="close" className={closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form onSubmit={handleOnSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>Taxable</Typography>
                <FormControl fullWidth size="small">
                  <TextField
                    label="Basic Pay"
                    name="BasicPay"
                    value={basicPay}
                    type="number"
                    onChange={(e) =>
                      setBasicCompensation((prevState) => ({
                        ...prevState,
                        basicPay: e.target.value,
                      }))}
                    error={!!errors.basicPay}
                  />
                  {errors.basicPay && (
                    <FormHelperText error>{errors.basicPay}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <CompensationList
                compensations={taxablePays}
                loading={taxablePaysListLoading}
                onChange={handleOnChangeOtherTaxablePays}
                values={
                  compensation.otherTaxablePays &&
                  generateCompensation(compensation.otherTaxablePays)
                }
              />
              <Grid item xs={12}>
                <Typography>Non Taxable</Typography>
                <FormControl fullWidth size="small">
                  <TextField
                    label="De minimis"
                    name="deminimis"
                    value={deminimis}
                    type="number"
                    onChange={(e) =>
                      setBasicCompensation((prevState) => ({
                        ...prevState,
                        deminimis: e.target.value,
                      }))}
                    error={!!errors.deminimis}
                  />
                  {errors.deminimis && (
                    <FormHelperText error>{errors.deminimis}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <CompensationList
                compensations={nonTaxablePays}
                loading={nonTaxablePaysListLoading}
                onChange={handleOnChangeOtherNonTaxablePays}
                values={
                  compensation.otherNonTaxablePays &&
                  generateCompensation(compensation.otherNonTaxablePays)
                }
              />
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <TextField
                    label="Effectivity Date"
                    type="date"
                    name="effectivityDate"
                    value={effectivityDate}
                    onChange={(e) =>
                      setBasicCompensation((prevState) => ({
                        ...prevState,
                        effectivityDate: e.target.value,
                      }))}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.effectivityDate}
                  />
                  {errors.effectivityDate && (
                    <FormHelperText error>{errors.effectivityDate}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <div className={formButton}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="small"
                disabled={loading}
                startIcon={<Save />}
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </>
    </Dialog>
  );
};

export default DialogBasicCompensation;
