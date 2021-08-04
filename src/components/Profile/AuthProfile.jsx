import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/user/userSlice';
import { uploadImage } from '../../store/user/userThunk';
import ImageUpload from '../../shared/components/UI/ImageUpload';
import EditProfileDetails from './EditProfileDetails';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import useStyles from './profile-styles';

function AuthProfile(props) {
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.user.credentials);

  const uploadFileHandler = (image) => {
    dispatch(uploadImage(image));
  };

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          {credentials.imageUrl && (
            <ImageUpload
              imageUrl={credentials.imageUrl}
              handle={credentials.handle}
              onUploadFile={uploadFileHandler}
            />
          )}
        </div>
        <hr />
        <div className='profile-details'>
          {credentials.handle && (
            <MuiLink
              component={Link}
              to={`/user/${credentials.handle}`}
              color='primary'
              variant='h5'
            >
              @{credentials.handle}
            </MuiLink>
          )}
          <hr />
          {credentials.bio && (
            <Typography variant='body2'>{credentials.bio}</Typography>
          )}
          <hr />
          {credentials.location && (
            <Fragment>
              <LocationOn color='primary' />
              <span>{credentials.location}</span>
            </Fragment>
          )}
          <hr />
          {credentials.website && (
            <Fragment>
              <LinkIcon color='primary' />
              <a href={credentials.website} target='_blank' rel='noreferrer'>
                Website
              </a>
            </Fragment>
          )}
          <hr />
          <CalendarToday color='primary' />
          <span>Joined {dayjs(credentials.createdAt).format('MM YYYY')}</span>
        </div>
        <div className={classes.settings}>
          <EditProfileDetails
            bio={credentials.bio}
            location={credentials.location}
            website={credentials.website}
          />
          <TooltipIconButton
            title='Logout'
            placement='bottom'
            onClick={(e) => dispatch(logout())}
          >
            <KeyboardReturn color='primary' />
          </TooltipIconButton>
        </div>
      </div>
    </Paper>
  );
}

export default memo(AuthProfile);
