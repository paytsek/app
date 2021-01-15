import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
	Paper,
	Container,
	Breadcrumbs,
	Typography,
	Button,
} from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';

import CompaniesListFilter from '../../components/CompaniesList/CompanyiesFilter';
import CompaniesListTable from '../../components/CompaniesList/CompaniesListTable';
import useStyles from './styles';

const CompanyListPage = ({ history }) => {
	const { active, title, paper, actions, tableContainer } = useStyles();

	return (
		<Fragment>
			<Container>
				<Breadcrumbs>
					<Link to="/">Dashboard</Link>
					<Link className={active} to="/companies" aria-current="page">
						Companies
					</Link>
				</Breadcrumbs>
				<Paper className={paper}>
					<Typography variant="h5" className={title} gutterBottom>
						Current Companies
					</Typography>
					<div className={actions}>
						<Button
							variant="contained"
							color="secondary"
							disabled
							size="small"
							startIcon={<Delete />}
						>
							Delete
						</Button>
						<Button
							variant="contained"
							color="primary"
							size="small"
							startIcon={<Add />}
							onClick={() => history.push('companies/create')}
						>
							Create
						</Button>
					</div>
					<CompaniesListFilter />
				</Paper>
			</Container>
			<Container className={tableContainer}>
				<CompaniesListTable />
			</Container>
		</Fragment>
	);
};

export default CompanyListPage;
