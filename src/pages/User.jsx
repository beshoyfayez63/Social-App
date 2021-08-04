import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectScreamByIds } from '../store/screams/screamSlice';
import { getUserByHandle } from '../store/user/userThunk';
import Grid from '@material-ui/core/Grid';
import ScreamList from '../components/Screams/ScreamList';

import useStyles from './user-styles';
import StaticProfile from '../components/Profile/StaticProfile';

function User() {
  const [isLoading, setIsLoading] = useState('loading');
  const { userHandle } = useParams();
  const screamIds = useSelector((state) => selectScreamByIds(state));
  const dispatch = useDispatch();

  const fetchUserScreams = useCallback(async () => {
    setIsLoading('loading');
    await dispatch(getUserByHandle(userHandle));
    setIsLoading('succeeded');
  }, [dispatch, userHandle]);

  useEffect(() => {
    fetchUserScreams();
  }, [fetchUserScreams]);

  const classes = useStyles();
  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item sm={8} xs={10}>
        <div>
          <ScreamList screamIds={screamIds} screamsStatus={isLoading} />
        </div>
      </Grid>
      <Grid item sm={4} xs={10}>
        <StaticProfile loading={isLoading} />
      </Grid>
    </Grid>
  );
}

export default User;
