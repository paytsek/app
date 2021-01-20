import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 1201,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 240,
  },
  drawerHeader: {
    minHeight: 64,
  },
}));

export default useStyles;
