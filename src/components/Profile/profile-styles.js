import makeStyles from '@material-ui/core/styles/makeStyles';

const theme = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
      '& .imageError': {
        color: 'red',
        fontSize: '15px',
      },
    },
    '& .profile-image': {
      width: '200px',
      height: '200px',
      // objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
      border: '1px solid #ccc',
      padding: '1px',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
        marginRight: 10,
      },
      '& a': {
        color: '#00bcd4',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
  settings: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));
export default theme;
