import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';
import moment from 'moment';

import DialogAlert from '../../Dialog/DialogAlert';

import { getCompaniesList, deleteCompany } from '../../../redux/actions/companiesActions';
import { COMPANY_DELETE_RESET } from '../../../redux/types';
import useStyles from './styles';

const CompaniesListTable = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});

  const dispatch = useDispatch();

  const { companies, loading } = useSelector(state => state.companiesList);
  const { loading: companyDeleteLoading, success } = useSelector(state => state.companyDelete);

  const handleClose = () => {
    setOpen(false);
    setSelectedCompany({});
  };

  const handleOpen = company => {
    setOpen(true);
    setSelectedCompany(company);
  };

  const handleOnConfirm = () => {
    dispatch(deleteCompany(selectedCompany._id));
    setOpen(false);
  };

  const { dataGrid } = useStyles();

  useEffect(() => {
    dispatch(getCompaniesList());
  }, []);

  useEffect(() => {
    if (success) {
      dispatch({ type: COMPANY_DELETE_RESET });
    }
  });

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'slug', headerName: 'Slug', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Date Started',
      width: 200,
    },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 200,
      renderCell: props => (
        <Fragment>
          <Button
            color="primary"
            startIcon={<Search onClick={() => history.push(`companies/${props.row.id}`)} />}
          />
          <Button
            color="primary"
            startIcon={<Edit />}
            onClick={() => history.push(`companies/${props.row.id}/edit`)}
          />
          <Button color="primary" onClick={() => handleOpen(props.row)} startIcon={<Delete />} />
        </Fragment>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className={dataGrid}
        rows={companies.map(company => ({
          ...company,
          id: company._id,
          createdAt: moment(company.createdAt).format('MMM DD, YYYY'),
        }))}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        loading={loading || companyDeleteLoading}
        autoHeight
      />
      <DialogAlert
        title={`Are you sure you want to remove ${selectedCompany.name || ''}?`}
        open={open}
        handleClose={handleClose}
        onConfirm={handleOnConfirm}
      />
    </div>
  );
};

export default withRouter(CompaniesListTable);
