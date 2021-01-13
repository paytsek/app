import { Link } from 'react-router-dom';
import {
	Paper,
	Container,
	Breadcrumbs,
	Typography,
	Button,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import UsersFilter from '../../components/UsersList/UsersFilter';
import UsersListTable from '../../components/UsersList/UsersListTable';
import useStyles from './styles';

const UsersListPage = () => {
	const { active, title, paper, actions } = useStyles();

	return (
		<Container>
			<Breadcrumbs>
				<Link to="/">Dashboard</Link>
				<Link className={active} to="/users" aria-current="page">
					Users
				</Link>
			</Breadcrumbs>
			<Paper className={paper}>
				<Typography variant="h5" className={title} gutterBottom>
					Users
				</Typography>
				<div className={actions}>
					<Button
						variant="contained"
						color="secondary"
						disabled
						startIcon={<Delete />}
					>
						Delete
					</Button>
				</div>
				<UsersFilter />
			</Paper>
			<UsersListTable />
		</Container>
	);
};

export default UsersListPage;
