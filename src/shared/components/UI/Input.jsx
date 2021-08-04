import { memo } from 'react';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

function Input({ control, name, rules, defaultValue, ...props }) {
  // const {
  //   field: { ref, ...inputProps },
  //   fieldState: { invalid, error, isTouched },
  //   // formState: { touchedFields, dirtyFields },
  // } = useController({
  //   name,
  //   control,
  //   defaultValue: '',
  // });

  // return (
  //   <TextField
  //     {...inputProps}
  //     {...props}
  //     helperText={invalid && error.message}
  //     error={isTouched && invalid}
  //   />
  // );
  return (
    <Controller
      name={name}
      control={control}
      rules={{ ...rules }}
      defaultValue={defaultValue || ''}
      render={({ field }) => <TextField {...field} {...props} fullWidth />}
    />
  );
}

export default memo(Input);
