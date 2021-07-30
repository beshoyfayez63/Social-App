import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { token, logout } from './store/user/userSlice';
import { getUserData } from './store/user/userThunk';
import { retrieveStoredToken } from './utils/helper';
import Navbar from './shared/components/Navbar/Navbar';
import AuthWrapper from './shared/components/HOC/AuthWrapper';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Container from '@material-ui/core/Container';

import { Theme } from './Theme/Theme';
import './App.css';

function App(props) {
  const tokenSelector = useSelector(token);
  const dispatch = useDispatch();

  useEffect(() => {
    let logoutTimer;
    if (tokenSelector) {
      dispatch(getUserData());
      logoutTimer = setTimeout(() => {
        dispatch(logout());
      }, retrieveStoredToken().duration);
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, [tokenSelector, dispatch]);

  return (
    <Router>
      <Theme>
        <Navbar />
        <Container className='container'>
          <Switch>
            {/* {tokenSelector && <Redirect from='/signup' to='/' />} */}
            <Route path='/' exact>
              <Home />
            </Route>

            <AuthWrapper
              token={tokenSelector}
              component={Login}
              path='/login'
            />

            <AuthWrapper
              token={tokenSelector}
              component={Signup}
              path='/signup'
            />
          </Switch>
        </Container>
      </Theme>
    </Router>
  );
}

export default App;
