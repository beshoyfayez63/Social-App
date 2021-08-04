import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectScreamByIds } from '../store/screams/screamSlice';
import { fetchScreams } from '../store/screams/screamThunk';

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
  const screamsStatus = useSelector((state) => state.screams.status);

  const screamIds = useSelector(selectScreamByIds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchScreams());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item sm={8} xs={10}>
        <div>
          <ScreamList screamIds={screamIds} screamsStatus={screamsStatus} />
        </div>
      </Grid>
      <Grid item sm={4} xs={10}>
        <Profile />
      </Grid>
    </Grid>
  );
}

export default Home;
