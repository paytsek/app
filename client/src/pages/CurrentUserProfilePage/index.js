import { Link } from 'react-router-dom';
import { Paper, Container, Breadcrumbs, Typography } from '@material-ui/core';

import CurrentUserProfileForm from '../../components/CurrentUserProfile/CurrentUserProfileForm';
import useStyles from './styles';

const CUrrentUserProfile = ({ history }) => {
	const { paper, active, title } = useStyles();

	return (
		<Container>
			<Breadcrumbs>
				<Link to="/">Dashboard</Link>
				<Link className={active} to="/users" aria-current="page">
					Profile
				</Link>
			</Breadcrumbs>
			<Paper className={paper}>
				<Typography variant="h5" className={title} gutterBottom>
					Profile
				</Typography>
				<CurrentUserProfileForm />
			</Paper>
		</Container>
	);
};

export default CUrrentUserProfile;
