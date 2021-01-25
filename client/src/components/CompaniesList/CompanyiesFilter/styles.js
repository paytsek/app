import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(4),
    },
  },
  formButton: {
    textAlign: 'right',
    paddingTop: theme.spacing(2),
    '& > *': {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
