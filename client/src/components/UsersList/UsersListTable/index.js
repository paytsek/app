import { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';

import useStyles from './styles';

const columns = [
	{ field: 'email', headerName: 'Email', width: 160 },
	{ field: 'username', headerName: 'User name', width: 160 },
	{
		field: 'fullName',
		headerName: 'Full name',
		sortable: false,
		width: 160,
	},
	{
		field: 'role',
		headerName: 'Role',
		with: 160,
	},
	{
		field: '',
		headerName: '',
		width: 190,
		renderCell: () => (
			<Fragment>
				<Button color="primary" startIcon={<Search />} />
				<Button color="primary" startIcon={<Edit />} />
				<Button color="primary" startIcon={<Delete />} />
			</Fragment>
		),
	},
];

const rows = [
	{
		id: '1',
		email: '@admin@example.com',
		username: 'adminexample',
		fullName: 'Admin Example',
		role: 'Admin',
		renderCell: () => (
			<Fragment>
				<Button startIcon={<Search />} />
				<Button startIcon={<Edit />} />
				<Button startIcon={<Delete />} />
			</Fragment>
		),
	},
	{
		id: '2',
		email: '@jane@example.com',
		username: 'janeexample',
		fullName: 'Jane Example',
		role: 'Member',
		renderCell: () => (
			<Fragment>
				<Button startIcon={<Search />} />
				<Button startIcon={<Edit />} />
				<Button startIcon={<Delete />} />
			</Fragment>
		),
	},
	{
		id: '3',
		email: '@jane@example.com',
		username: 'janeexample',
		fullName: 'Jane Example',
		role: 'Member',
		renderCell: () => (
			<Fragment>
				<Button startIcon={<Search />} />
				<Button startIcon={<Edit />} />
				<Button startIcon={<Delete />} />
			</Fragment>
		),
	},
	{
		id: '4',
		email: '@john@example.com',
		username: 'johnexample',
		fullName: 'John Example',
		role: 'Member',
		renderCell: () => (
			<Fragment>
				<Button startIcon={<Search />} />
				<Button startIcon={<Edit />} />
				<Button startIcon={<Delete />} />
			</Fragment>
		),
	},
	{
		id: '5',
		email: '@rodrigo@example.com',
		username: 'rodrigoexample',
		fullName: 'Rodrigo Example',
		role: 'Member',
		renderCell: () => (
			<Fragment>
				<Button startIcon={<Search />} />
				<Button startIcon={<Edit />} />
				<Button startIcon={<Delete />} />
			</Fragment>
		),
	},
	{
		id: '6',
		email: '@carlo@example.com',
		username: 'carloexample',
		fullName: 'Carlo Example',
		role: 'Member',
		renderCell: () => (
			<Fragment>
				<Button startIcon={<Search />} />
				<Button startIcon={<Edit />} />
				<Button startIcon={<Delete />} />
			</Fragment>
		),
	},
];

const UsersListTable = () => {
	const { dataGrid } = useStyles();

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

export default UsersListTable;
