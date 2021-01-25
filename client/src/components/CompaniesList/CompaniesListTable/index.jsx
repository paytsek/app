import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';
import moment from 'moment';

import { getCompaniesList } from '../../../redux/actions/companiesActions';
import useStyles from './styles';

const CompaniesListTable = ({ history }) => {
  const dispatch = useDispatch();

  const { companies, loading } = useSelector(state => state.companiesList);

  const { dataGrid } = useStyles();

  useEffect(() => {
    dispatch(getCompaniesList());
  }, []);

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
          <Button color="primary" startIcon={<Delete />} />
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
        loading={loading}
        autoHeight
      />
    </div>
  );
};

export default withRouter(CompaniesListTable);
