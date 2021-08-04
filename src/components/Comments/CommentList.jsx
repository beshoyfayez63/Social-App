import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CommentItem from './CommentItem';

function CommentList({ comments }) {
  let commentList;
  if (comments.length === 0 || !comments) {
    commentList = (
      <Typography variant='body1' color='textSecondary'>
        No Comments Yet
      </Typography>
    );
  }
  if (comments.length > 0) {
    commentList = comments.map((comment) => {
      return (
        <Grid container key={comment.createdAt}>
          <CommentItem comment={comment} />
        </Grid>
      );
    });
  }
  return commentList;
}

export default memo(CommentList);
