import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
