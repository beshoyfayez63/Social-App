import { Redirect, Route } from 'react-router-dom';

function AuthWrapper({ token, component: Component, ...rest }) {
  return token ? (
    <Redirect to='/' />
  ) : (
    <Route {...rest}>
      <Component />
    </Route>
  );
}

export default AuthWrapper;
