import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { token, memomizeEntities } from '../../store/user/userSlice';
import { likeScream, unLikeScream } from '../../store/screams/screamThunk';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function LikeButton({ screamId }) {
  console.log('LikeButton');
  const dispatch = useDispatch();
  const tokenSelector = useSelector(token);
  // const selectLikes = useSelector((state) => selectLikeEntities(state));
  // console.log(selectLikes);
  // const isLikedScream = selectLikes[screamId] ? true : false;

  const isLikedScream = useSelector((state) =>
    memomizeEntities(state, screamId)
  )
    ? true
    : false;
  const likeScreamHandler = useCallback(() => {
    dispatch(likeScream(screamId));
  }, [dispatch, screamId]);
  const unLikeScreamHandler = useCallback(() => {
    dispatch(unLikeScream(screamId));
  }, [dispatch, screamId]);

  let likedButton;
  if (!tokenSelector) {
    likedButton = (
      <TooltipIconButton title='Login to like'>
        <Link to='/login'>
          <FavoriteBorderIcon color='primary' />
        </Link>
      </TooltipIconButton>
    );
  }
  if (tokenSelector && isLikedScream) {
    likedButton = (
      <TooltipIconButton title='UnLike' onClick={unLikeScreamHandler}>
        <FavoriteIcon color='primary' />
      </TooltipIconButton>
    );
  }
  if (tokenSelector && !isLikedScream) {
    likedButton = (
      <TooltipIconButton title='Like' onClick={likeScreamHandler}>
        <FavoriteBorderIcon color='primary' />
      </TooltipIconButton>
    );
  }
  return likedButton;
}

export default memo(LikeButton, (prev, next) => {
  return prev.screamId === next.screamId;
});
