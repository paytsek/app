import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getCompaniesList, setSlug, getCompanySlug } from '../../redux/actions/companiesActions';
import { LOGOUT, COMPANY_SLUG_REMOVE } from '../../redux/types';
import useStyles from './styles';

const localStorageSlug = localStorage.getItem('slug');

const SelectCompanyPage = ({ history }) => {
  const dispatch = useDispatch();

  const { companies } = useSelector(state => state.companiesList);
  const { authSlug, slug } = useSelector(state => state.companySlug);

  const { title, root, paper, buttonContainer } = useStyles();

  useEffect(() => {
    dispatch(getCompaniesList());
    if (localStorageSlug) {
      dispatch(getCompanySlug());
    }
  }, []);

  useEffect(() => {
    if (authSlug && slug) {
      history.push(`/${slug}/dashboard`);
    }
  }, [authSlug]);

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
        <List component="nav">
          {companies.map(company => (
            <Paper className={paper} key={company._id}>
              <ListItem
                button
                onClick={() => {
                  dispatch(setSlug(company.slug));
                  history.push(`/${company.slug}/dashboard`);
                }}
              >
                <ListItemText primary={company.name} />
              </ListItem>
            </Paper>
          ))}
        </List>
      </div>
      <div className={buttonContainer}>
        <Button
          color="primary"
          style={{ margin: '16px 0' }}
          onClick={() => {
            dispatch({ type: LOGOUT });
            dispatch({ type: COMPANY_SLUG_REMOVE });
            history.push('/login');
          }}
        >
          Sign out
        </Button>
      </div>
    </Container>
  );
};

export default SelectCompanyPage;
