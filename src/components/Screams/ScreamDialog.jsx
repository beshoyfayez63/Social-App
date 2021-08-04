import { Fragment, useState, memo, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getScream, memomizeScream } from '../../store/screams/screamSlice';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';
import Comments from '../Comments/CommentList';
import CreaateComment from '../Comments/CreaateComment';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

import useStyles from './screams-style';

function ScreamDialog({
  likeCount,
  screamId: screamIdProps,
  userHandle: userHandleProps,
}) {
  const history = useHistory();
  // const { screamId: screamIdProps, userHandle: userHandleProps } = params;

  const [loading, setLoading] = useState(true);
  const closeDialogHandler = () => {
    if (history.location.pathname === `/screams/${screamIdProps}`) {
      history.push('/screams');
    } else {
      history.push(`/user/${userHandleProps}`);
    }
  };
  const dispatch = useDispatch();
  const scream = useSelector((state) => memomizeScream(state));
  const tokenState = useSelector((state) => state.user.token);

  const fetchScream = useCallback(async () => {
    if (!scream || scream.screamId !== screamIdProps) {
      await dispatch(getScream(screamIdProps));
    }
    setLoading(false);
  }, [dispatch, screamIdProps, scream]);

  useEffect(() => {
    fetchScream();
  }, [fetchScream]);

  const classes = useStyles();
  let dialogMarkup;
  if (loading) {
    dialogMarkup = (
      <Grid container justifyContent='center' style={{ overflow: 'hidden' }}>
        <CircularProgress size={200} thickness={1} />
      </Grid>
    );
  }
  if (!loading && scream) {
    dialogMarkup = (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img
            src={scream.userImage}
            alt='Profile'
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7} container justifyContent='center' direction='column'>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/user/${userHandleProps}`}
          >
            @{userHandleProps}
          </Typography>
          <hr />
          <Typography variant='body2' color='textSecondary'>
            {dayjs(scream.createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr />
          <Typography variant='body1'>{scream.body}</Typography>
          <hr />
          <Grid container justifyContent='flex-start' spacing={1}>
            <Grid item>
              <LikeButton screamId={scream.screamId} />
              <span>{likeCount} likes</span>
            </Grid>
            <Grid item>
              <TooltipIconButton title='comments'>
                <ChatIcon color='primary' />
              </TooltipIconButton>
              <span>{scream.commentCount} Comments</span>
            </Grid>
          </Grid>
        </Grid>
        <hr className='visibleSeperator' />
        <Grid item sm={12}>
          {tokenState && <CreaateComment screamId={screamIdProps} />}
          <Comments comments={scream.comments} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Fragment>
      <Dialog
        open={true}
        onClose={closeDialogHandler}
        scroll='body'
        fullWidth
        maxWidth='sm'
        className={classes.screamDialog}
      >
        <TooltipIconButton
          title='Close'
          onClick={closeDialogHandler}
          className={classes.closeButton}
        >
          <CloseIcon />
        </TooltipIconButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default memo(ScreamDialog);
