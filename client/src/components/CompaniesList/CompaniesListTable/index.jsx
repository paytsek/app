import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';
import moment from 'moment';

import DialogAlert from '../../Dialog/DialogAlert';
import SwitchCompanyButton from '../../common/SwitchCompanyButton';

import { getCompaniesList, deleteCompany } from '../../../redux/actions/companiesActions';
import { COMPANY_DELETE_RESET, COMPANY_SLUG_REMOVE } from '../../../redux/types';
import useStyles from './styles';

const CompaniesListTable = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});

  const dispatch = useDispatch();

  const { slug } = useSelector((state) => state.companySlug);
  const { companies, loading } = useSelector((state) => state.companiesList);
  const { loading: companyDeleteLoading, success } = useSelector((state) => state.companyDelete);

  const handleClose = () => {
    setOpen(false);
    setSelectedCompany({});
  };

  const handleOpen = (company) => {
    setOpen(true);
    setSelectedCompany(company);
  };

  const handleOnConfirm = async () => {
    await dispatch(deleteCompany(selectedCompany._id));
    setOpen(false);
    if (slug === selectedCompany.slug) {
      dispatch({ type: COMPANY_SLUG_REMOVE });
      history.push('/select-company');
    }
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
      width: 290,
      renderCell: ({ row }) => (
        <>
          <SwitchCompanyButton slug={row.slug} />
          <Button
            color="primary"
            startIcon={<Search onClick={() => history.push(`companies/${row.id}`)} />}
          />
          <Button
            color="primary"
            startIcon={<Edit />}
            onClick={() => history.push(`companies/${row.id}/edit`)}
          />
          <Button color="primary" onClick={() => handleOpen(row)} startIcon={<Delete />} />
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className={dataGrid}
        rows={companies.map((company) => ({
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
        loading={companyDeleteLoading}
      />
    </div>
  );
};

export default withRouter(CompaniesListTable);
