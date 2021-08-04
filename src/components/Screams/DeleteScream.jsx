import { Fragment, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteScream } from '../../store/screams/screamThunk';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';

import useStyles from './screams-style';

function DeleteScream(props) {
  // const { open, openDialogHandler, closeDialogHandler } = useDialog();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { screamId } = props;

  const openDialogHandler = () => {
    setOpen(true);
  };

  const closeDialogHandler = (_, reason) => {
    if (loading && reason) {
      return;
    }
    setOpen(false);
  };

  const deleteScreamHandler = async () => {
    setLoading(true);
    if (loading) {
      setOpen(true);
    }
    await dispatch(deleteScream(screamId));
  };

  const classes = useStyles();

  return (
    <Fragment>
      <TooltipIconButton
        title='Delete Scream'
        onClick={openDialogHandler}
        className={classes.deleteIcon}
      >
        <DeleteOutline color='secondary' />
      </TooltipIconButton>
      <Dialog fullWidth open={open} onClose={closeDialogHandler} maxWidth='sm'>
        <DialogTitle>Are you sure you to delete this scream</DialogTitle>
        <DialogActions>
          <Button
            onClick={closeDialogHandler}
            color='primary'
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteScreamHandler}
            color='primary'
            disabled={loading}
          >
            {loading ? '...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default memo(DeleteScream);
