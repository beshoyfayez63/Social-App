import { makeStyles } from '@material-ui/core';

const useTheme = makeStyles((theme) => ({
  navbarToolbar: {
    justifyContent: 'center',
  },
  navbarLinks: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginRight: 'auto',
  },
  svg: {
    color: '#fff',
  },
  active: {
    color: '#194D54',
    '& svg': {
      color: '#194D54',
    },
  },
}));

export default useTheme;
