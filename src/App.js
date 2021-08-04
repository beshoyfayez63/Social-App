import { useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { token, logout } from './store/user/userSlice';
import { getUserData } from './store/user/userThunk';
import { retrieveStoredToken } from './utils/helper';
import Navbar from './shared/components/Navbar/Navbar';
import AuthWrapper from './shared/components/HOC/AuthWrapper';

import Container from '@material-ui/core/Container';

import { Theme } from './Theme/Theme';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const User = lazy(() => import('./pages/User'));

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
          <Suspense fallback={<p>Loading..</p>}>
            <Switch>
              <Route path='/' exact>
                <Redirect from='/' to='/screams' />
              </Route>
              {/* {tokenSelector && <Redirect from='/signup' to='/' />} */}
              <Route path='/screams'>
                <Home />
              </Route>
              <Route path='/user/:userHandle'>
                <User />
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
              <Route path='*'>
                <h1>Page not found</h1>
              </Route>
            </Switch>
          </Suspense>
        </Container>
      </Theme>
    </Router>
  );
}

export default App;
