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
  createScream: {
    '& svg': {
      fill: 'white',
    },
  },
}));

export default styles;
