import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1201,
    fontSize: 14,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',

    '& img': {
      maxHeight: '100%',
      width: '100%',
      maxWidth: '40px',
    },
  },
  drawer: {
    width: 240,
  },
  drawerHeader: {
    minHeight: 64,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default useStyles;
