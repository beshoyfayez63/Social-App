import { useSelector } from 'react-redux';
import { token } from '../../store/user/userSlice';
import AuthProfile from './AuthProfile';
import GuestProfile from './GuestProfile';

// import useStyles from './profile-styles';

function Profile() {
  console.log('Profile');
  const tokenState = useSelector(token);
  const loading = useSelector((state) => state.user.status);
  // console.log(loading);
  let profileMarkup;

  if (loading === 'pending') {
    profileMarkup = <p>Loading...</p>;
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
