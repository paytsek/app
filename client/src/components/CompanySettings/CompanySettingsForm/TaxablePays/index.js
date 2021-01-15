import { Fragment } from 'react';
import {
	Typography,
	FormControl,
	InputAdornment,
	Input,
	InputLabel,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

const TaxablePays = () => {
	return (
		<Fragment>
			<Typography variant="h6">Taxable Pays</Typography>
			<FormControl fullWidth size="small" margin="normal">
				<InputLabel htmlFor="taxablePays">Taxable Pays</InputLabel>
				<Input
					id="taxablePays"
					endAdornment={
						<InputAdornment position="end">
							<IconButton color="primary">
								<AddIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			{/* List of taxable pays */}
			<List>
				<ListItem>
					<ListItemText primary="Playstation" />
					<ListItemSecondaryAction>
						<IconButton edge="end" aria-label="delete">
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText primary="Allowance" />
					<ListItemSecondaryAction>
						<IconButton edge="end" aria-label="delete">
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</Fragment>
	);
};

export default TaxablePays;
