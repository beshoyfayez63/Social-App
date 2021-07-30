import * as yup from 'yup';
export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is Not valid'),
  password: yup.string().min(6),
});

export const signupSchema = yup.object().shape({
  handle: yup
    .string()
    .required('Handle is Required')
    .min(3, 'handle should be at least  characters'),
  email: yup.string().required('Email is required').email('Email is Not valid'),
  password: yup.string().required().min(6),
  confirmation: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords does not match'),
});

export const updateUserProfileSchema = yup.object().shape({
  bio: yup.string().required('Bio is required'),
  website: yup
    .string()
    .url('Enter a correct url')
    .required('Please enter website'),
  location: yup.string().required('Locaiton is required'),
});
