import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../store/comments/commentSlice';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '../../shared/components/UI/Input';

import useStyles from './comment-style';

function CreaateComment({ screamId }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'onSubmit' });

  const createCommentHandler = async (data) => {
    await dispatch(createComment({ id: screamId, data }));
    reset({ body: '' });
  };

  const classes = useStyles();
  return (
    <Grid item sm={12} style={{ marginBottom: '20px' }}>
      <form onSubmit={handleSubmit(createCommentHandler)}>
        <Input
          control={control}
          name='body'
          rules={{ required: { value: true, message: 'Comment is require' } }}
          helperText={errors.body?.message}
          error={!!errors.body}
          label='comment'
          className={classes.commentInput}
        />
        <Button
          type='submit'
          disabled={!isValid || isSubmitting}
          variant='contained'
          color='inherit'
        >
          Comment
        </Button>
      </form>
    </Grid>
  );
}

export default memo(CreaateComment);
