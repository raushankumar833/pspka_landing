import { useContext, useState } from 'react';
import * as Yup from 'yup';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Alert, IconButton, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_AUTH } from '../../routes/paths';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { PATTERNS } from 'src/utils/validation';
import { noAuthApi } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { appContext } from 'src/context/appContext';
import { extractErrors } from 'src/utils/extractError';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  username: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { push } = useRouter();
  const { loading, setLoading, setUsername } = useContext(appContext);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required('Mobile is required')
      .matches(PATTERNS.MOBILE, 'Invalid mobile number'),
    password: Yup.string().required('Password is required'),
  });

  // const defaultValues = {
  //   username: '9999442202',
  //   password: 'Pragya@131023',
  // };
  // const defaultValues = {
  //   username: '',
  //   password: '',
  // };
  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: FormValuesProps) => {
    setUsername(data.username);
    // console.log("Username changed" + userName)
    noAuthApi(
      Apiendpoints.LOGIN,
      { ...data },
      setLoading,
      (res) => {
        setCookie('login-data', data);
        push(PATH_AUTH.verify);
      },
      (err) => {
        setError('afterSubmit', {
          ...err,
          message: extractErrors(err) || 'Something went wrong',
        });
      }
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="username" label="Mobile Number" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 3 }}
      >
        <NextLink href={PATH_AUTH.register} passHref>
          <Typography variant="body2" color="secondary.main" fontWeight="bold">
            New User? Register Here!
          </Typography>
        </NextLink>
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Typography variant="body2" color="secondary.main" fontWeight="bold">
            Forgot password?
          </Typography>
        </NextLink>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={loading || isSubmitting}
        sx={{
          mt: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.darker
              : theme.palette.primary.light,
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
