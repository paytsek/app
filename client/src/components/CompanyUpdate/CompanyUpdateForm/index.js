import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Clear, Undo, Delete } from '@material-ui/icons';

import useStyles from './styles';

const CompanyUpdateForm = ({ history }) => {
	const { formButton } = useStyles();

	return (
		<form>
			<Grid container>
				<Grid item xs={12} md={7} lg={8}>
					<TextField
						placeholder="Company Name"
						label="Name"
						fullWidth
						margin="normal"
					/>
				</Grid>
			</Grid>
			<div className={formButton}>
				<Button
					color="primary"
					variant="contained"
					size="small"
					startIcon={<Save />}
				>
					Save
				</Button>
				<Button size="small" startIcon={<Undo />}>
					Reset
				</Button>
				<Button
					size="small"
					startIcon={<Clear />}
					onClick={() => history.push('/companies')}
				>
					Cancel
				</Button>
				<Button
					color="secondary"
					variant="contained"
					size="small"
					startIcon={<Delete />}
				>
					Delete
				</Button>
			</div>
		</form>
	);
};

export default withRouter(CompanyUpdateForm);
