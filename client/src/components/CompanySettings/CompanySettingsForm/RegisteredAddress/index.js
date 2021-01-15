import { Paper, TextField } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const RegisteredAddress = () => {
	const { paper, fieldsContainer } = useStyles();

	return (
		<Paper className={paper}>
			<TitleBox title="Register Address" />
			<div className={fieldsContainer}>
				<TextField
					fullWidth
					margin="normal"
					label="Street"
					placeholder="Street"
				/>
				<TextField fullWidth margin="normal" label="City" placeholder="City" />
				<TextField
					fullWidth
					margin="normal"
					label="Country"
					placeholder="Country"
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Zip code"
					placeholder="Zip code"
				/>
			</div>
		</Paper>
	);
};

export default RegisteredAddress;
