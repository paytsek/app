import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography } from '@material-ui/core';

import UserEditForm from '../../components/UserEdit/UserEditForm';

import useStyles from './styles';

const UserEditPage = ({ match }) => {
	const { paper, active, title } = useStyles();

	return (
		<Container>
			<Breadcrumbs>
				<Link to="/">Dashboard</Link>
				<Link to="/users" aria-current="page">
					Users
				</Link>
				<Link
					className={active}
					to={`/users/${match.params.id}/edit`}
					aria-current="page"
				>
					Edit User
				</Link>
			</Breadcrumbs>
			<Paper className={paper}>
				<Typography variant="h5" className={title} gutterBottom>
					Edit User
				</Typography>
				<UserEditForm />
			</Paper>
		</Container>
	);
};

export default UserEditPage;
