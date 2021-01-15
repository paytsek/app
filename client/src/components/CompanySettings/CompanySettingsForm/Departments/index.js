import {
	Paper,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const Departments = () => {
	const { paper, fieldsContainer } = useStyles();

	return (
		<Paper className={paper}>
			<TitleBox title="Departments" />
			<div className={fieldsContainer}>
				<FormControl fullWidth size="small" margin="normal">
					<InputLabel htmlFor="department">Department</InputLabel>
					<Input
						id="department"
						endAdornment={
							<InputAdornment position="end">
								<IconButton color="primary">
									<AddIcon />
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				{/* List of departments */}
				<List>
					<ListItem>
						<ListItemText primary="Intermediate" />
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemText primary="Senior" />
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemText primary="Lead" />
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</div>
		</Paper>
	);
};

export default Departments;
