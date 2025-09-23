// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, inputProps, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          focused={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          inputProps={inputProps}
          // sx={{
          //   // Root class for the input field
          //   '& .MuiOutlinedInput-root': {
          //     color: '#000',
          //     fontFamily: 'Arial',
          //     fontWeight: 'bold',
          //     background: 'red',
          //     // Class for the border around the input field
          //     '& .MuiOutlinedInput-notchedOutline': {
          //       borderColor: '#2e2e2e',
          //       borderWidth: '2px',
          //     },
          //   },
          //   // Class for the label of the input field
          //   '& .MuiInputLabel-outlined': {
          //     color: '#2e2e2e',
          //     fontWeight: 'bold',
          //   },
          // }}
          {...other}
        />
      )}
    />
  );
}
