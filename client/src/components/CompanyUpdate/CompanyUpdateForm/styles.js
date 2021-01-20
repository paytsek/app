import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
