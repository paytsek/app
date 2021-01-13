import {
	Accordion,
	Typography,
	AccordionSummary,
	AccordionDetails,
	TextField,
	Container,
	Button,
	Grid,
} from '@material-ui/core';
import { ExpandMore, Search, Undo } from '@material-ui/icons';

import useStyles from './styles';

const CompaniesListFilter = () => {
	const { form, formButton, accordion } = useStyles();

	return (
		<Accordion className={accordion}>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Typography>Filter</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<form autoComplete="off" noValidate className={form}>
					<Container>
						<Grid container spacing={3}>
							<Grid item xs={12} md={12}>
								<TextField
									variant="outlined"
									label="Name"
									fullWidth
									size="small"
								/>
							</Grid>
						</Grid>
					</Container>
					<div className={formButton}>
						<Button
							variant="contained"
							color="primary"
							size="small"
							startIcon={<Search />}
						>
							Search
						</Button>
						<Button size="small" startIcon={<Undo />}>
							Reset
						</Button>
					</div>
				</form>
			</AccordionDetails>
		</Accordion>
	);
};

export default CompaniesListFilter;
