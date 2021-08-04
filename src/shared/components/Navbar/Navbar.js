import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { token } from '../../../store/user/userSlice';
import CreateScream from '../../../components/Screams/CreateScream';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '../../../components/Notifications/NotificationList';
import useTheme from './Navbar-styles';

// CSS
import './Navbar.css';

function Navbar() {
  const tokenSelector = useSelector(token);
  const classes = useTheme();

  return (
    <AppBar position='sticky'>
      <Toolbar className={classes.navbarToolbar}>
        <div className={classes.navbarLinks}>
          <Button
            color='inherit'
            component={NavLink}
            to='/screams'
            activeClassName={classes.active}
            exact
          >
            <HomeIcon className={classes.svg} />
          </Button>

          {tokenSelector && (
            <Fragment>
              <CreateScream />
              <Notifications />
            </Fragment>
          )}
          {!tokenSelector && (
            <Button
              color='inherit'
              component={NavLink}
              to='/login'
              activeClassName={classes.active}
              exact
            >
              Login
            </Button>
          )}
          {!tokenSelector && (
            <Button
              color='inherit'
              component={NavLink}
              to='/signup'
              activeClassName={classes.active}
              exact
            >
              Signup
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
