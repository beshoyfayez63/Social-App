import makeStyles from '@material-ui/core/styles/makeStyles';

const theme = makeStyles((theme) => ({
  commentImg: {
    maxWidth: '100%',
    height: 80,
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 10,
    background: '#f7f7f7',
    borderRadius: 6,
    padding: '5px 0 5px 10px',
  },
  commentInput: {
    marginBottom: 10,
  },
}));
export default theme;
