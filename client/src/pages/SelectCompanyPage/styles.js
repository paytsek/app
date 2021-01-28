import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    '& .MuiList-root': {
      width: '100%',
      maxWidth: 600,
    },
  },
  paper: {
    width: '100%',
    border: '1px solid #dee2e6 !important',
    marginBottom: theme.spacing(1),
    borderRadius: 5,
    backgroundColor: '#fff',
    '& .MuiButtonBase-root': {
      padding: theme.spacing(2),
    },
  },
  active: {
    color: theme.palette.primary.dark,
  },
  title: {
    fontWeight: 'bold',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: 40,
      maxWidth: '100%',
      height: 'auto',
    },
  },
  buttonContainer: {
    textAlign: 'center',
  },
}));

export default useStyles;
