import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    margin: `${theme.spacing(2)}px 0`,
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
    padding: theme.spacing(2),
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
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',

    '&:hover': {
      '& .MuiSvgIcon-root': {
        fontSize: 32,
      },
    },
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      right: '2%',
      top: '50%',
      transform: 'translateY(-50%)',
      transistion: 'all 0.2s ease',
    },
  },
}));

export default useStyles;
