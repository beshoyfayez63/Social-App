import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { token, memomizeEntities } from '../../store/user/userSlice';
import { likeScream, unLikeScream } from '../../store/screams/screamThunk';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function LikeButton({ screamId }) {
  const dispatch = useDispatch();
  const tokenSelector = useSelector(token);
  const [loading, setLoading] = useState(false);

  const isLikedScream = useSelector((state) =>
    memomizeEntities(state, screamId)
  )
    ? true
    : false;

  const likeScreamHandler = useCallback(async () => {
    setLoading(true);
    await dispatch(likeScream(screamId));
    setLoading(false);
  }, [dispatch, screamId]);

  const unLikeScreamHandler = useCallback(async () => {
    setLoading(true);
    await dispatch(unLikeScream(screamId));
    setLoading(false);
  }, [dispatch, screamId]);

  let likedButton;
  if (!tokenSelector) {
    likedButton = (
      <Link to='/login'>
        <TooltipIconButton title='Login to like'>
          <FavoriteBorderIcon color='primary' />
        </TooltipIconButton>
      </Link>
    );
  }
  if (tokenSelector && isLikedScream) {
    likedButton = (
      <TooltipIconButton
        title='UnLike'
        onClick={unLikeScreamHandler}
        disabled={loading}
      >
        <FavoriteIcon color='primary' />
      </TooltipIconButton>
    );
  }
  if (tokenSelector && !isLikedScream) {
    likedButton = (
      <TooltipIconButton
        title='Like'
        onClick={likeScreamHandler}
        disabled={loading}
      >
        <FavoriteBorderIcon color='primary' />
      </TooltipIconButton>
    );
  }
  return likedButton;
}

export default memo(LikeButton, (prev, next) => {
  return prev.screamId === next.screamId;
});
