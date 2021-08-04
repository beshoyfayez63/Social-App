import { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNotificationIds,
  // readNotifications,
  notReadNotifications,
} from '../../store/user/userSlice';
import { markNotificationsAsRead } from '../../store/user/userThunk';
import NotificationItem from './NotificationItem';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

import useStyles from './notification-styles';

function NotificationList() {
  const [open, setOpen] = useState(false);
  const [badge, setBadge] = useState(0);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  const notificationIds = useSelector((state) => selectNotificationIds(state));
  const notificationsNotRead = useSelector(notReadNotifications);

  const handleToggle = async () => {
    setOpen((prevOpen) => !prevOpen);
    if (!open) {
      await dispatch(markNotificationsAsRead(notificationIds));
    }
  };

  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (notificationsNotRead > 0) {
      setBadge(notificationsNotRead);
    } else {
      setBadge(0);
    }
  }, [notificationsNotRead]);

  let noificationMarkup;
  if (notificationIds.length > 0) {
    noificationMarkup = notificationIds.map((notId) => {
      return (
        <NotificationItem
          notificationId={notId}
          key={notId}
          handleClose={handleClose}
        />
      );
    });
  }

  const classes = useStyles();
  return (
    <Fragment>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <Badge
          badgeContent={badge}
          color='secondary'
          style={{ cursor: 'pointer' }}
        >
          <NotificationsIcon className={classes.notIcon} />
        </Badge>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}
                >
                  {noificationMarkup}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}

export default NotificationList;
