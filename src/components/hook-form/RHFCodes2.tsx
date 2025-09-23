import { useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Stack, TextField, OutlinedTextFieldProps, Typography } from '@mui/material';
import useEventListener from '../../hooks/useEventListener';

// ----------------------------------------------------------------------

type Props = OutlinedTextFieldProps & {
  keyName?: string;
  inputs?: string[];
  errorMessage?: any;
  setButtonEnable?: () => void;
};

export default function RHFCodes2({
  keyName = '',
  inputs = [],
  error,
  errorMessage,
  setButtonEnable,
  ...other
}: Props) {
  {
  }

  const codesRef = useRef<HTMLDivElement>(null);

  const { control, setValue } = useFormContext();

  const handlePaste = (event: any) => {
    let data = event.clipboardData.getData('text');

    data = data.split('');

    inputs.map((input, index) => setValue(input, data[index]));

    event.preventDefault();
  };

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;
    if (new RegExp(/^[0-9]*$/).test(value)) {
      const fieldIndex = name.replace(keyName, '');

      const fieldIntIndex = Number(fieldIndex);

      const nextfield: HTMLElement | null = document.querySelector(
        `input[name=${keyName}${fieldIntIndex + 1}]`
      );

      const prevfield: HTMLElement | null = document.querySelector(
        `input[name=${keyName}${fieldIntIndex - 1}]`
      );

      if (value.length > maxLength) {
        event.target.value = value[0];
      }

      if (!value && fieldIntIndex > 1 && prevfield !== null) {
        (prevfield as HTMLElement).focus();
      }

      if (value.length >= maxLength && fieldIntIndex < 6 && nextfield !== null) {
        (nextfield as HTMLElement).focus();
      }

      handleChange(event);

      setButtonEnable && setButtonEnable();
    } else {
      event.target.value = '';
    }
  };

  const handleBackspace = (event: any) => {
    const { name } = event.target;
    const fieldIndex = name.replace(keyName, '');

    const fieldIntIndex = Number(fieldIndex);

    const prevfield: HTMLElement | null = document.querySelector(
      `input[name=${keyName}${fieldIntIndex - 1}]`
    );

    if (fieldIntIndex > 1 && prevfield !== null) {
      (prevfield as HTMLElement).focus();
    }
  };

  useEventListener('paste', handlePaste, codesRef);

  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" ref={codesRef}>
        {inputs.map((name, index) => (
          <Controller
            key={name}
            name={`${keyName}${index + 1}`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                autoFocus={index === 0}
                autoComplete={'off'}
                placeholder="-"
                type="password"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeWithNextField(event, field.onChange);
                }}
                // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                //   handleChangeWithNextField(event, field.onChange);
                // }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.keyCode === 8) {
                    !field.value && handleBackspace(e);
                  }
                }}
                onFocus={(event) => event.currentTarget.select()}
                InputProps={{
                  sx: {
                    width: { xs: 40, sm: 56 },
                    height: { xs: 40, sm: 56 },
                    '& input': { p: 0, textAlign: 'center' },
                  },
                }}
                inputProps={{
                  maxLength: 1,
                  inputMode: 'decimal',
                }}
                {...other}
              />
            )}
          />
        ))}
      </Stack>
      {error && (
        <Typography
          variant="caption"
          sx={{
            textAlign: 'left',
            color: '#ff0000',
            fontSize: '13px',
            fontWeight: '700',
            mt: 1.3,
          }}
        >
          {errorMessage || 'OTP is required'}
        </Typography>
      )}
    </Stack>
  );
}
