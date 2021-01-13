import { Link } from 'react-router-dom';
import {
	Paper,
	Container,
	Breadcrumbs,
	Typography,
	Button,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import useStyles from './styles';

const UserDetailsPage = () => {
	const { active, paper, title, actions, details } = useStyles();

	return (
		<Container>
			<Breadcrumbs>
				<Link to="/">Dashboard</Link>
				<Link to="/users" aria-current="page">
					Users
				</Link>
				<Link className={active} to="/users" aria-current="page">
					View User
				</Link>
			</Breadcrumbs>
			<Paper className={paper}>
				<Typography variant="h5" className={title} gutterBottom>
					View User
				</Typography>
				<div className={actions}>
					<Button variant="contained" color="primary" startIcon={<Edit />}>
						Edit
					</Button>
				</div>
				<div className={details}>
					<Typography variant="subtitle2">Email</Typography>
					<Typography variant="subtitle1">admin@example.com</Typography>
				</div>
				<div className={details}>
					<Typography variant="subtitle2">Username</Typography>
					<Typography variant="subtitle1">adminuser</Typography>
				</div>
				<div className={details}>
					<Typography variant="subtitle2">Role</Typography>
					<Typography variant="subtitle1">Admin</Typography>
				</div>
				<div className={details}>
					<Typography variant="subtitle2">First Name</Typography>
					<Typography variant="subtitle1">Rodrigo</Typography>
				</div>
				<div className={details}>
					<Typography variant="subtitle2">Last Name</Typography>
					<Typography variant="subtitle1">Carlos</Typography>
				</div>
			</Paper>
		</Container>
	);
};

export default UserDetailsPage;
