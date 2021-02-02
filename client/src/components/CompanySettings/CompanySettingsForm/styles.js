import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
    '& .MuiGrid-item': {
      marginBottom: theme.spacing(2),
    },
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
    '& .MuiPaper-root': {
      padding: `${theme.spacing(2)}px`,
    },
  },
  formButton: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    '& > *': {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
}));

export default useStyles;
