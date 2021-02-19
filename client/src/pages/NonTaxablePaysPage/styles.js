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
  gridContainer: {
    marginTop: theme.spacing(5),
    '& .MuiGrid-item': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default useStyles;
