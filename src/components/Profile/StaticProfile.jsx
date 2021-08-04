import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ProfileSkeleton from '../../shared/components/UI/ProfileSkeleton';

import useStyles from './profile-styles';

function StaticProfile({ loading, handle }) {
  const userHandleProfile = useSelector(
    (state) => state.user.userHandleProfile
  );
  const classes = useStyles();
  if (loading === 'loading') {
    return <ProfileSkeleton />;
  }
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img
            src={userHandleProfile.imageUrl}
            alt={userHandleProfile.handle}
            className='profile-image'
          />
        </div>
        <hr />
        <div className='profile-details'>
          <MuiLink
            component={Link}
            to={`/user/${userHandleProfile.handle}`}
            color='primary'
            variant='h5'
          >
            @{userHandleProfile.handle}
          </MuiLink>

          <hr />
          {userHandleProfile.bio && (
            <Typography variant='body2'>{userHandleProfile.bio}</Typography>
          )}
          <hr />
          {userHandleProfile.location && (
            <Fragment>
              <LocationOn color='primary' />
              <span>{userHandleProfile.location}</span>
            </Fragment>
          )}
          <hr />
          {userHandleProfile.website && (
            <Fragment>
              <LinkIcon color='primary' />
              <a
                href={userHandleProfile.website}
                target='_blank'
                rel='noreferrer'
              >
                Website
              </a>
            </Fragment>
          )}
          <hr />
          <CalendarToday color='primary' />
          <span>
            Joined {dayjs(userHandleProfile.createdAt).format('MM YYYY')}
          </span>
        </div>
        <div className={classes.settings}></div>
      </div>
    </Paper>
  );
}

export default memo(StaticProfile);
