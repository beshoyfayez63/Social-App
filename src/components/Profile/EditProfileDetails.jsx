import { Fragment, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../../store/user/userThunk';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserProfileSchema } from '../../utils/validations';
import Input from '../../shared/components/UI/Input';
import TooltipIconButton from '../../shared/components/UI/TooltipIconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Modal from '../../shared/components/UI/Modal';
import useStyles from './profile-styles';
import useDialog from '../../hooks/useDialog';

function EditProfileDetails(props) {
  const { open, openDialogHandler, closeDialogHandler } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'all', resolver: yupResolver(updateUserProfileSchema) });

  const updateUserProfileHandler = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(updateUserDetails(data));
    } catch (error) {}
  };

  const classes = useStyles();
  return (
    <Fragment>
      <TooltipIconButton
        title='Change your data'
        placement='top'
        onClick={openDialogHandler}
      >
        <SettingsIcon color='primary' />
      </TooltipIconButton>

      <Modal
        open={open}
        onCloseDialog={() =>
          closeDialogHandler(() =>
            reset({
              bio: props.bio || '',
              location: props.location || '',
              website: props.website || '',
            })
          )
        }
        cancelButtonName='Cancel'
        submitButtonName={isLoading ? '...' : 'Update'}
        dialogInfo='Update your profile data'
        onSubmit={handleSubmit(updateUserProfileHandler)}
        disabled={!isValid || isLoading}
      >
        <Input
          name='bio'
          type='text'
          label='Bio'
          defaultValue={props.bio || ''}
          control={control}
          helperText={errors.bio && errors.bio.message}
          error={!!errors.bio}
          className={classes.input}
        />
        <Input
          name='website'
          type='text'
          label='Website'
          defaultValue={props.website || ''}
          control={control}
          helperText={errors.website && errors.website.message}
          error={!!errors.website}
          className={classes.input}
        />
        <Input
          name='location'
          type='text'
          label='Location'
          defaultValue={props.location || ''}
          control={control}
          helperText={errors.location && errors.location.message}
          error={!!errors.location}
          className={classes.input}
        />
      </Modal>
    </Fragment>
  );
}

export default memo(EditProfileDetails);
