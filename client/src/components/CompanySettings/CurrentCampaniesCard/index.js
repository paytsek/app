import React from 'react';
import { withRouter } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Button,
	Typography,
} from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';

import useStyles from './styles';

const CurrentCompaniesCard = ({ history }) => {
	const { root, buttonText } = useStyles();

	return (
		<Card className={root}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						PayTsek
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						24n St Marcoville, Baguio City, Phillipines
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					size="small"
					color="primary"
					startIcon={<SettingsIcon />}
					className={buttonText}
					onClick={() => history.push('company-settings/1')}
				>
					Add Settings
				</Button>
			</CardActions>
		</Card>
	);
};

export default withRouter(CurrentCompaniesCard);
