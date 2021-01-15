import { Grid } from '@material-ui/core';

import CurrentCompaniesCard from '../CurrentCampaniesCard';

const CurrentCompaniesContainer = () => {
	return (
		<Grid container spacing={4} justify="space-between">
			<Grid item>
				<CurrentCompaniesCard />
			</Grid>
			<Grid item>
				<CurrentCompaniesCard />
			</Grid>
			<Grid item>
				<CurrentCompaniesCard />
			</Grid>
		</Grid>
	);
};

export default CurrentCompaniesContainer;
