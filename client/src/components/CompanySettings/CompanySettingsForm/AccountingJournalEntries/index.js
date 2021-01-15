import {
	Paper,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import { ACCOUNTING_JOURNAL_ENTRIES } from '../../../../utils/globals';
import useStyles from '../styles';

const AccountingJournalEntries = () => {
	const { paper, fieldsContainer } = useStyles();

	const options = () =>
		ACCOUNTING_JOURNAL_ENTRIES.map(({ name, value }) => (
			<MenuItem key={name} value={value}>
				{name}
			</MenuItem>
		));

	return (
		<Paper className={paper}>
			<TitleBox title="Accounting Journal Entries" />
			<div className={fieldsContainer}>
				<Grid container spacing={3}>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>Taxable Compensation (except 13th month)</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>13th Month Pay</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>
								NonTaxable Compensation (except 13th month)
							</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>Pre-tax Deductions</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>Employee Benefits (SSS/PHIC/HDMF)</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>SSS Payable</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>HDMF Payable</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>PHIC Payable</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>Tax Due</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>Reimbursements</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>Post-tax Deductions</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>Net Pay</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<InputLabel>De minimis benefit</InputLabel>
							<Select defaultValue="wagesAndSalaries">{options()}</Select>
						</FormControl>
					</Grid>
				</Grid>
			</div>
		</Paper>
	);
};

export default AccountingJournalEntries;
