import jwtDecoded from 'jwt-decode';

export const calculateRemainingTime = (token) => {
  let decodedToken = jwtDecoded(token);
  if (!decodedToken) {
    return null;
  }
  const currentTime = new Date().getTime();
  const adjTime = new Date(decodedToken.exp * 1000).getTime();
  const remaingTime = adjTime - currentTime;
  return remaingTime;
};

export const retrieveStoredToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { token: null, duration: null };
  }
  const remainingTime = calculateRemainingTime(token);
  if (remainingTime <= 60000 - 3600) {
    localStorage.removeItem('token');
    return { token: null, duration: null };
  }
  return { token, duration: remainingTime };
};
