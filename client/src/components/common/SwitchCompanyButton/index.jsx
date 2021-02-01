import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Input as InputIcon } from '@material-ui/icons';

import { getCompanySlug } from '../../../redux/actions/companiesActions';

const SwitchCompanyButton = ({ slug, history }) => {
  const dispatch = useDispatch();

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={() => {
        localStorage.setItem('slug', slug);
        dispatch(getCompanySlug(slug));
        history.push(`/${slug}/dashboard`);
      }}
      startIcon={<InputIcon />}
    />
  );
};

export default withRouter(SwitchCompanyButton);
