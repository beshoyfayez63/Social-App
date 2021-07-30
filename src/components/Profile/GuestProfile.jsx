import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './profile-styles';

function GuestProfile() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant='body2' align='center'>
        No profile found, Please login again
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/login'
        >
          Login
        </Button>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/signup'
        >
          Signup
        </Button>
      </div>
    </Paper>
  );
}

export default GuestProfile;
