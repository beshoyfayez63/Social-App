import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  text: {
    marginBottom: 15,
  },
}));

function ScreamSkeleton() {
  const classes = useStyles();
  return [1, 2, 3, 4, 5].map((_, i) => (
    <Card className={classes.card} key={i}>
      <Skeleton variant='rect' width={200} height={200} />
      <CardContent>
        <Skeleton variant='text' width={200} className={classes.text} />
        <Skeleton variant='text' width={200} className={classes.text} />
        <Skeleton variant='text' width={200} className={classes.text} />
        <Skeleton variant='text' width={200} className={classes.text} />
      </CardContent>
    </Card>
  ));
}

export default ScreamSkeleton;
