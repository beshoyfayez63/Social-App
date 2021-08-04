import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  papper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  circleSkeleton: {
    display: 'flex',
    justifyContent: 'center',
  },
  textSkeleton: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '20px 0 0 0',
    overflow: 'hidden',
  },
}));

function ProfileSkeleton() {
  const classes = useStyles();
  return (
    <Paper className={classes.papper}>
      <div className={classes.circleSkeleton}>
        <Skeleton variant='circle' width={200} height={200} />
      </div>
      <div className={classes.textSkeleton}>
        <Skeleton variant='text' width={200} />
        <Skeleton variant='text' width={200} />
        <Skeleton variant='text' width={200} />
        <Skeleton variant='text' width={200} />
        <Skeleton variant='text' width={200} />
      </div>
    </Paper>
  );
}

export default ProfileSkeleton;
