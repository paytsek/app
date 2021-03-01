import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  Paper,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

import TitleBox from '../../../common/TitleBox';
import DialogBasicCompensation from '../../../Dialog/DialogBasicCompensation';

import {
  getCompensations,
  createCompensation,
  deleteCompensation,
} from '../../../../redux/actions/compensationsActions';
import useStyles from '../styles';
import { COMPENSATIONS_CREATE_RESET } from '../../../../redux/types';

const EmployeeCompensationsTable = ({ match }) => {
  const dispatch = useDispatch();

  const { id } = match.params;

  const [open, setOpen] = useState(false);

  const { compensations } = useSelector((state) => state.compensationsList);
  const { errors, loading, success } = useSelector((state) => state.compensationCreate);
  const { loading: compensationDeleteLoading } = useSelector(
    (state) => state.compensationDelete,
  );

  const { paper, fieldsContainer } = useStyles();

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: COMPENSATIONS_CREATE_RESET });
  };

  const handleOnSubmit = (compensationData) => {
    dispatch(createCompensation(id, compensationData));
  };

  useEffect(() => {
    dispatch(getCompensations(id));
  }, []);

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);

  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Status" />
      <div className={fieldsContainer}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setOpen(true)}
          startIcon={<Add />}
        >
          Add
        </Button>
      </div>
      <Container>
        <List>
          {compensations.map((compensation) => (
            <ListItem key={compensation._id}>
              <ListItemText
                primary="Gross Compensation"
                secondary={(
                  <>
                    <span>{compensation.basicPay}</span>
                    <span>
                      {' '}
                      -
                      {` ${moment(compensation.effectivityDate).format('MMM, DD, YYYY')}`}
                    </span>
                  </>
                )}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit">
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  disabled={compensationDeleteLoading}
                  onClick={() => dispatch(deleteCompensation(id, compensation._id))}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
      <DialogBasicCompensation
        open={open}
        handleClose={handleClose}
        onSubmit={handleOnSubmit}
        errors={errors}
        loading={loading}
      />
    </Paper>
  );
};

export default withRouter(EmployeeCompensationsTable);
