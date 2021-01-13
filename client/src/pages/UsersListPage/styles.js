import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: '100%',
		border: '1px solid #dee2e6 !important',
		padding: 24,
		marginTop: 16,
		borderRadius: 5,
		backgroundColor: '#fff',
	},
	active: {
		color: theme.palette.primary.dark,
	},
	title: {
		fontWeight: 'bold',
	},
	actions: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginBottom: 16,
	},
}));

export default useStyles;
