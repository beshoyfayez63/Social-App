import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { selectNotificationId } from '../../store/user/userSlice';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

function NotificationItem({ notificationId, handleClose }) {
  const notificationItem = useSelector((state) =>
    selectNotificationId(state, notificationId)
  );
  const { type, createdAt, read, recipient, screamId, sender } =
    notificationItem;
  const verb = type === 'like' ? 'liked' : 'commented on';
  const time = dayjs(createdAt).fromNow();
  const iconColor = read ? 'primary' : 'secondary';
  const icon =
    type === 'like' ? (
      <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
    ) : (
      <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
    );
  const closeMenuHandler = () => {
    handleClose();
  };

  return (
    <MenuItem onClick={closeMenuHandler}>
      {icon}
      <Typography
        component={Link}
        color='initial'
        variant='body1'
        to={`/user/${recipient}/${screamId}`}
      >
        {sender} {verb} your scream {time}
      </Typography>
    </MenuItem>
  );
}

export default NotificationItem;
