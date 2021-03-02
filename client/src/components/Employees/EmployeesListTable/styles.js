import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dataGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#fff',

    '& .MuiDataGrid-colCell:last-child': {
      display: 'none',
    },
  },
}));

export default useStyles;
