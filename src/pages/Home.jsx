import ScreamList from '../components/Screams/ScreamList';
import Profile from '../components/Profile/Profile';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import './Home.css';
const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'center',
  },
}));
function Home() {
  console.log('Home');
  const classes = useStyles();

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item sm={8} xs={10}>
        <div>
          <ScreamList />
        </div>
      </Grid>
      <Grid item sm={4} xs={10}>
        <Profile />
      </Grid>
    </Grid>
  );
}

export default Home;
