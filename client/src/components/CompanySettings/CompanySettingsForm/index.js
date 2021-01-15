import { Grid, Paper } from '@material-ui/core';

import TitleBox from '../../common/TitleBox';
import CompanySettings from './CompanySettings';
import RegisteredAddress from './RegisteredAddress';
import Departments from './Departments';
import TaxablePays from './TaxablePays';
import NonTaxablePays from './NonTaxablePays';
import SSSCalculations from './SSSCalculations';
import PhicCalculations from './PhicCalculations';
import ThirtheenthMonthPayCalculations from './ThirtheenthMonthPayCalculations';
import AccountingJournalEntries from './AccountingJournalEntries';

import useStyles from './styles';

const CompanySettingsForm = () => {
	const {
		paper,
		gridContainer,
		fieldsContainer,
		calculationsContainer,
	} = useStyles();

	return (
		<Grid container spacing={3} className={gridContainer}>
			{/* COMPANY SETTINGS */}
			<Grid item xs={12}>
				<CompanySettings />
			</Grid>
			{/* REGISTER ADDRESS */}
			<Grid item xs={12} md={6}>
				<RegisteredAddress />
			</Grid>
			{/* DEPARTMENTS */}
			<Grid item xs={12} md={6}>
				<Departments />
			</Grid>
			{/* GOVERNMENT REMITTANCES & 13th MONTH PAY CALCULATION */}
			<Grid item xs={12}>
				<Paper className={paper}>
					<TitleBox title="Government Remittances and 13th month pay Calculations" />
					<div className={fieldsContainer}>
						<Grid container spacing={6}>
							{/* Taxable pays */}
							<Grid item xs={12} md={6}>
								<TaxablePays />
							</Grid>
							{/* Non-taxable pays */}
							<Grid item xs={12} md={6}>
								<NonTaxablePays />
							</Grid>
							{/* SSS calculation */}
							<Grid item xs={12} md={4} className={calculationsContainer}>
								<SSSCalculations />
							</Grid>
							{/* PHIC Calculations */}
							<Grid item xs={12} md={4} className={calculationsContainer}>
								<PhicCalculations />
							</Grid>
							{/* 13th month pay calculation */}
							<Grid item xs={12} md={4} className={calculationsContainer}>
								<ThirtheenthMonthPayCalculations />
							</Grid>
						</Grid>
					</div>
				</Paper>
			</Grid>
			{/* Accounting journal Entries */}
			<Grid item xs={12}>
				<AccountingJournalEntries />
			</Grid>
		</Grid>
	);
};

export default CompanySettingsForm;
