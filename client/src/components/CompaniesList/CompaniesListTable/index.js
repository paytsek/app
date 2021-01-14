import { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';

import useStyles from './styles';

const rows = [
	{
		id: '1',
		name: 'PayTsek',
		slug: 'paytsek',
		createdAt: 'Jan 01, 2012',
	},
	{
		id: '2',
		name: 'Fullsuite',
		slug: 'fullsuite',
		createdAt: 'Jan 01, 2012',
	},
];

const CompaniesListTable = ({ history }) => {
	const { dataGrid } = useStyles();

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
			renderCell: (props) => (
				<Fragment>
					<Button
						color="primary"
						startIcon={
							<Search onClick={() => history.push(`companies/${props.row.id}`)} />
						}
					/>
					<Button
						color="primary"
						startIcon={<Edit />}
						onClick={() => history.push('companies/1/edit')}
					/>
					<Button color="primary" startIcon={<Delete />} />
				</Fragment>
			),
		},
	];

	return (
		<DataGrid
			className={dataGrid}
			rows={rows}
			columns={columns}
			pageSize={5}
			checkboxSelection
			disableSelectionOnClick
			autoHeight
		/>
	);
};

export default withRouter(CompaniesListTable);
