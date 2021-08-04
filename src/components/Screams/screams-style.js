import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 150,
    minHeight: 150,
    objectFit: 'cover',
  },
  content: {
    padding: 25,
    width: '100%',
    position: 'relative',
  },
  settings: {
    position: 'absolute',
    top: 11,
    right: 0,
  },
  deleteIcon: {
    marginRight: 25,
  },
  createScream: {
    '& svg': {
      fill: 'white',
    },
  },
  expandButton: {
    float: 'right',
  },
  dialog: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  screamDialog: {
    position: 'relative',
  },

  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
}));

export default styles;
