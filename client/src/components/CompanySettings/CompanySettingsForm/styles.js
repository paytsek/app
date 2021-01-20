import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: `0px ${theme.spacing(3)}px`,
  },
  fieldsContainer: {
    padding: `${theme.spacing(4)}px 0px`,
    '& h6': {
      fontWeight: 'bold',
    },
  },
  calculationsContainer: {
    '& .MuiFormControl-fullWidth': {
      display: 'block',
    },
  },
}));

export default useStyles;
