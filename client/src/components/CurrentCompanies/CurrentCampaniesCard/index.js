import React from 'react';
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

const CurrentCompaniesCard = () => {
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
				>
					Add Settings
				</Button>
			</CardActions>
		</Card>
	);
};

export default CurrentCompaniesCard;
