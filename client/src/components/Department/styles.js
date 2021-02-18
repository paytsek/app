import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: `0px ${theme.spacing(3)}px`,
  },
  fieldsContainer: {
    padding: `${theme.spacing(4)}px 0px`,
    '& h6': {
      fontWeight: 'bold',
    },
  },
}));

export default useStyles;
