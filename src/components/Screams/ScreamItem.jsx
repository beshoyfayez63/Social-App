import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectScreamById } from '../../store/screams/screamSlice';
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
// CSS
import useStyles from './screams-style';

function ScreamItem({ screamId }) {
  console.log('Scream Item');
  dayjs.extend(relativeTime);

  const tokenState = useSelector((state) => state.user.token);
  const credentials = useSelector((state) => state.user.credentials);
  const scream = useSelector((state) => selectScreamById(state, screamId));
  const { body, createdAt, userImage, userHandle, likeCount } = scream;

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
        <div className={classes.settings}>
          {tokenState && credentials.handle === userHandle && (
            <DeleteScream screamId={screamId} userHandler={userHandle} />
          )}
        </div>
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>

        <TooltipIconButton title='Comments' placement='top'>
          <ChatIcon />
        </TooltipIconButton>
        {/* <span>{commentCount} comments</span> */}
      </CardContent>
    </Card>
  );
}

export default memo(ScreamItem);
