import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button, ListSubheader, Paper, Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import CompanyCreateFormDialog from '../../components/Dialog/CompanyCreateFormDialog';
import MuiSkeleton from '../../components/MuiSkeleton';

import { getCompaniesList, setCompanyTenant, getCompanyTenant } from '../../redux/actions/companiesActions';
import { LOGOUT, COMPANY_TENANT_REMOVE } from '../../redux/types';
import useStyles from './styles';

const localStorageSlug = localStorage.getItem('tenant');

const SelectCompanyPage = ({ history }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { companies, loading } = useSelector((state) => state.companiesList);
  const { authSlug, slug } = useSelector((state) => state.companyTenant);
  const { user } = useSelector((state) => state.authUser);
  const { company } = useSelector((state) => state.createCompanyName);

  const { title, root, buttonContainer, listItem, paper } = useStyles();

  const handleOnClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getCompaniesList());
    if (localStorageSlug) {
      dispatch(getCompanyTenant());
    }
  }, []);

  useEffect(() => {
    if (authSlug && slug) {
      history.push(`/${slug}/dashboard`);
    }
    if (company) {
      handleOnClose();
    }
  }, [authSlug, company]);

  return (
    <Container>
      <Typography variant="h5" className={title} gutterBottom align="center">
        <img src="/images/logo.png" alt="logo" />
        PayTsek
      </Typography>
      <Typography variant="h4" gutterBottom align="center">
        Welcome! You look nice today.
      </Typography>
      <div className={root}>
        <List
          component="nav"
          subheader={(
            <ListSubheader component="div" disableSticky>
              Companies for
              {' '}
              <span style={{ fontWeight: 'bold' }}>{user.fullName}</span>
            </ListSubheader>
          )}
        >
          <Paper elevation={4} className={paper}>
            {loading ? (
              <MuiSkeleton />
            ) : (
              (companies.length <= 0 && <Typography>There are no companies to show</Typography>) ||
              companies.map((comp) => (
                <div key={comp._id}>
                  <ListItem
                    className={listItem}
                    button
                    onClick={() => {
                      dispatch(setCompanyTenant(comp.slug));
                      history.push(`/${comp.slug}/dashboard`);
                    }}
                  >
                    <ListItemText primary={comp.name} />
                    <ListItemText secondary="42 members" />
                    <ArrowForwardIcon />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              ))
            )}
          </Paper>
        </List>
      </div>
      <div className={root}>
        <List style={{ textAlign: 'right' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', flex: 1 }}>
            Want to create another Company?
          </Typography>
          <div>
            <Button color="primary" onClick={() => setOpen(true)}>
              Create another Company
            </Button>
          </div>
        </List>
      </div>
      <div className={buttonContainer}>
        <Button
          color="primary"
          style={{ margin: '16px 0' }}
          onClick={() => {
            dispatch({ type: LOGOUT });
            dispatch({ type: COMPANY_TENANT_REMOVE });
            history.push('/login');
          }}
        >
          Sign out
        </Button>
      </div>
      <CompanyCreateFormDialog open={open} handleClose={handleOnClose} title="Add a company name" />
    </Container>
  );
};

export default SelectCompanyPage;
