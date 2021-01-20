import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  box: {
    float: 'none',
    display: 'inline-block',
    padding: 15,
    marginTop: -20,
    marginRight: 0,
    borderRadius: 3,
    background: `linear-gradient(60deg, #4156cf, ${theme.palette.primary.main})`,
    boxShadow: `0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(63, 81, 181,.4)`,
    color: '#fff',
  },
}));

export default useStyles;
