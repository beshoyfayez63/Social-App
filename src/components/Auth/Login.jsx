import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { errorMessage } from '../../store/user/userSlice';
import { loginUser } from '../../store/user/userThunk';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '../../shared/components/UI/Input';
import Loading from '../../shared/components/UI/Loading';

import AppIcon from '../../images/icon.png';
import { useStyles } from './auth-styles';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const authError = useSelector(errorMessage);

  const loginHandler = async (data) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      const result = await dispatch(loginUser({ email, password }));
      unwrapResult(result);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.loginForm}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='Logo' className={classes.image} />
        <Typography variant='h1' className={classes.pageTitle}>
          Login
        </Typography>
        {authError && (
          <Typography variant='body2' className={classes.errorMessage}>
            {authError}
          </Typography>
        )}
        <form noValidate onSubmit={handleSubmit(loginHandler)}>
          <Input
            name='email'
            type='email'
            label='email'
            defaultValue=''
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

          <Button
            type='submit'
            disabled={!isValid || isLoading}
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Login
            {isLoading && (
              <Loading className={classes.progress} size={30} thickness={2.5} />
            )}
          </Button>
          <small>
            Dont have an account? sign up <Link to='/signup'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default Login;
