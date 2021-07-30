import makeStyles from '@material-ui/core/styles/makeStyles';

const theme = makeStyles((theme) => ({
  dialogTitle: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '7px',
    right: '7px',
  },
}));

export default theme;
