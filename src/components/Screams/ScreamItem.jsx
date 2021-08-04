import { memo, Fragment, useEffect, useState, lazy, Suspense } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { memomizeScreamById } from '../../store/screams/screamSlice';
import { memomizeCredentials } from '../../store/user/userSlice';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
// CSS
import useStyles from './screams-style';

const ScreamDialog = lazy(() => import('./ScreamDialog'));

function ScreamItem({ screamId }) {
  dayjs.extend(relativeTime);
  const tokenState = useSelector((state) => state.user.token);
  const handle = useSelector((state) => memomizeCredentials(state));
  const scream = useSelector((state) => memomizeScreamById(state, screamId));
  const { body, createdAt, userImage, userHandle, likeCount, commentCount } =
    scream;

  const [match, setMatch] = useState(window.location.pathname);

  const history = useHistory();

  useEffect(() => {
    if (window.location.pathname === '/screams') {
      setMatch('/screams');
    } else if (window.location.pathname === `/user/${userHandle}`) {
      setMatch(`/user/${userHandle}`);
    }
  }, [userHandle, screamId, history]);

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='Profile Image'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          color='primary'
          component={Link}
          to={`/user/${userHandle}`}
        >
          {userHandle}
        </Typography>
        {tokenState && handle === userHandle && (
          <div className={classes.settings}>
            <DeleteScream screamId={screamId} userHandler={userHandle} />
          </div>
        )}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
        {screamId ? <LikeButton screamId={screamId} /> : null}
        <span>{likeCount} likes</span>

        <TooltipIconButton title='Comments' placement='top'>
          <ChatIcon color='primary' />
        </TooltipIconButton>
        <span>{commentCount} comments</span>
        <Fragment>
          <Link to={`${match}/${screamId}`}>
            {/* <Link to={`/screams/${screamId}`}> */}
            <TooltipIconButton
              title='Expand Scream'
              className={classes.expandButton}
            >
              <UnfoldMoreIcon color='primary' />
            </TooltipIconButton>
          </Link>
          <Suspense>
            <Route
              path={[`/screams/${screamId}`, `/user/${userHandle}/${screamId}`]}
              render={() => {
                return (
                  <ScreamDialog
                    likeCount={likeCount}
                    screamId={screamId}
                    userHandle={userHandle}
                  />
                );
              }}
            />
          </Suspense>
        </Fragment>
      </CardContent>
    </Card>
  );
}

export default memo(ScreamItem, (prev, next) => {
  return prev.screamId === next.screamId;
});
