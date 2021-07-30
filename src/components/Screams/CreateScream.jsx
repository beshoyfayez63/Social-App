import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import useDialog from '../../hooks/useDialog';
import { useDispatch } from 'react-redux';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';
import Dialog from '@material-ui/core/Dialog';
import Modal from '../../shared/components/UI/Modal';
import AddIcon from '@material-ui/icons/Add';
import Input from '../../shared/components/UI/Input';
import Button from '@material-ui/core/Button';

import useStyles from './screams-style';

function CreateScream() {
  console.log('CreateScream');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const { open, openDialogHandler, closeDialogHandler } = useDialog();
  const dispatch = useDispatch();

  const createScreamHandler = (data) => {};

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
        onCloseDialog={() => closeDialogHandler(() => reset({ body: '' }))}
        maxWidth='sm'
        closeIcon={true}
        dialogInfo='Post a new scream'
        submitButtonName='Create Scream'
        onSubmit={handleSubmit(createScreamHandler)}
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
