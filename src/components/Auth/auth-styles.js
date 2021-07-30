import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  loginForm: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    fontSize: '60px',
  },
  input: {
    marginBottom: '15px',
  },
  button: {
    marginTop: '10px',
    display: 'block',
    textAlign: 'center',
    margin: '10px auto 10px auto',
    position: 'relative',
  },
  progress: {
    top: '8%',
    left: '38%',
    position: 'absolute',
  },
  errorMessage: {
    marginTop: '15px',
    color: 'red',
    fontSize: '1rem',
  },
}));
