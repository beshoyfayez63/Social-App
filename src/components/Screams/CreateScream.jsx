import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
// import useDialog from '../../hooks/useDialog';
import { useDispatch } from 'react-redux';
import { createScream } from '../../store/screams/screamThunk';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '../../shared/components/UI/Modal';
import AddIcon from '@material-ui/icons/Add';
import Input from '../../shared/components/UI/Input';

import useStyles from './screams-style';

function CreateScream() {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid = false, isSubmitting },
  } = useForm({ mode: 'all' });

  const openDialogHandler = () => {
    setOpen(true);
  };
  const closeDialogHandler = (_, reason) => {
    if (reason && isSubmitting) {
      return;
    }
    setOpen(false);
  };

  // const { open, openDialogHandler, closeDialogHandler } = useDialog();
  const dispatch = useDispatch();

  const createScreamHandler = async (data) => {
    // setIsLoading(true);
    await dispatch(createScream(data));
    reset({ body: '' });
    closeDialogHandler();
  };

  const classes = useStyles();
  return (
    <Fragment>
      <TooltipIconButton
        title='Create a Scream'
        onClick={openDialogHandler}
        className={classes.createScream}
      >
        <AddIcon />
      </TooltipIconButton>
      <Modal
        open={open}
        onCloseDialog={closeDialogHandler}
        maxWidth='sm'
        closeIcon={true}
        dialogInfo='Post a new scream'
        submitButtonName={
          !isSubmitting ? 'Create Scream' : <CircularProgress size={20} />
        }
        onSubmit={handleSubmit(createScreamHandler)}
        disabled={!isValid || isSubmitting}
      >
        <form>
          <Input
            name='body'
            control={control}
            label='Body'
            multiline
            error={!!errors.body}
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            helperText={errors.body?.message}
            placeholder='Write your scream!!'
          />
        </form>
      </Modal>
    </Fragment>
  );
}

export default CreateScream;
