import { memo } from 'react';
import { useSelector } from 'react-redux';
import ProfileSkeleton from '../../shared/components/UI/ProfileSkeleton';
import { token } from '../../store/user/userSlice';
import AuthProfile from './AuthProfile';
import GuestProfile from './GuestProfile';

// import useStyles from './profile-styles';

function Profile() {
  const tokenState = useSelector(token);
  const loading = useSelector((state) => state.user.status);

  let profileMarkup;

  if (loading === 'pending') {
    profileMarkup = <ProfileSkeleton />;
  }

  if (loading === 'success' && tokenState) {
    profileMarkup = <AuthProfile />;
  }
  if (
    (!tokenState && loading === 'success') ||
    loading === 'idle' ||
    loading === 'rejected'
  ) {
    profileMarkup = <GuestProfile />;
  }

  return profileMarkup;
}

export default Profile;
