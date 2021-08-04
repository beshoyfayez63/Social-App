import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './comment-style';

function CommentItem({ comment }) {
  const classes = useStyles();
  return (
    <Grid item sm={12} style={{ marginBottom: '10px' }}>
      <Grid container>
        <Grid item sm={2} container justifyContent='center' alignItems='center'>
          <img
            src={comment.userImage}
            className={classes.commentImg}
            alt='user'
          />
        </Grid>
        <Grid item sm={9}>
          <div className={classes.commentData}>
            <Typography
              variant='h5'
              component={Link}
              to={`/users/${comment.userHandle}`}
              color='primary'
            >
              {comment.userHandle}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>
            <hr className='invisibleSeperator' />
            <Typography variant='body1'>{comment.body}</Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommentItem;
