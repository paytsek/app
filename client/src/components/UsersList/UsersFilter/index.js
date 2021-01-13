import {
	Accordion,
	Typography,
	AccordionSummary,
	AccordionDetails,
	TextField,
	Container,
	Button,
} from '@material-ui/core';
import { ExpandMore, Search, Undo } from '@material-ui/icons';

import useStyles from './styles';

const UsersFilter = () => {
	const { form, formButton, accordion } = useStyles();

	return (
		<Accordion className={accordion}>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Typography>Filter</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<form autoComplete="off" noValidate className={form}>
					<Container>
						<TextField
							variant="outlined"
							label="Email"
							fullWidth
							size="small"
						/>
						<TextField variant="outlined" label="Role" fullWidth size="small" />
						<TextField variant="outlined" label="Name" fullWidth size="small" />
						<TextField
							variant="outlined"
							label="Status"
							fullWidth
							size="small"
						/>
					</Container>
					<div className={formButton}>
						<Button variant="contained" color="primary" size="small" startIcon={<Search />}>
							Search
						</Button>
						<Button size="small" startIcon={<Undo />}>Reset</Button>
					</div>
				</form>
			</AccordionDetails>
		</Accordion>
	);
};

export default UsersFilter;
