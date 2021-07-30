import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { errorMessage } from '../../store/user/userSlice';
import { signupUser } from '../../store/user/userThunk';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '../../shared/components/UI/Input';
import Loading from '../../shared/components/UI/Loading';
import AppIcon from '../../images/icon.png';
import { useStyles } from './auth-styles';

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(signupSchema),
  });
  console.log(errors);

  const history = useHistory();
  const dispatch = useDispatch();
  const authError = useSelector(errorMessage);

  const loginHandler = async (data) => {
    const { email, handle, password, confirmation } = data;
    console.log(data);
    setIsLoading(true);
    try {
      const result = await dispatch(
        signupUser({ handle, email, password, confirmPassword: confirmation })
      );
      unwrapResult(result);
      history.push('/');
    } catch (err) {}
    setIsLoading(false);
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.loginForm}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='Logo' className={classes.image} />
        <Typography variant='h1' className={classes.pageTitle}>
          Signup
        </Typography>
        {authError && (
          <Typography variant='body2' className={classes.errorMessage}>
            {authError}
          </Typography>
        )}
        <form noValidate onSubmit={handleSubmit(loginHandler)}>
          <Input
            name='handle'
            type='text'
            label='Handle'
            control={control}
            helperText={errors.handle && errors.handle.message}
            error={!!errors.handle}
            className={classes.input}
          />
          <Input
            name='email'
            type='email'
            label='email'
            control={control}
            helperText={errors.email && errors.email.message}
            error={!!errors.email}
            className={classes.input}
          />

          <Input
            name='password'
            type='password'
            label='password'
            control={control}
            helperText={errors.password && errors.password.message}
            error={!!errors.password}
            className={classes.input}
          />
          <Input
            name='confirmation'
            type='password'
            label='confirmPassword'
            control={control}
            helperText={errors.confirmation && errors.confirmation.message}
            error={!!errors.confirmation}
            className={classes.input}
          />

          <Button
            type='submit'
            disabled={!isValid || isLoading}
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Signup
            {isLoading && (
              <Loading className={classes.progress} size={30} thickness={2.5} />
            )}
          </Button>
          <small>
            Already have an account? Login <Link to='/login'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default Signup;
