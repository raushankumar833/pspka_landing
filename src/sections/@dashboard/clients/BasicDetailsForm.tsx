import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import React, { useContext, useEffect, useMemo } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { extractErrors } from 'src/utils/extractError';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { appContext } from 'src/context/appContext';
// import { PATTERNS } from 'src/utils/validation';
import { useSnackbar } from '../../../components/snackbar';
import { FormValuesProps } from './ClientNewEditForm';
import { ClientInterface } from 'src/@types/clients';

type Props = {
  isEdit?: boolean;
  currentUser?: ClientInterface;
};

// const TextMaskCustom = React.forwardRef(function TextMaskCustom(props: any, ref: any) {
//   const { onChange, ...other } = props;

//   return (
//     <IMaskInput
//       {...other}
//       mask="0000 0000 0000"
//       definitions={{
//         '#': /^[0-9]{12}$/,
//       }}
//       inputRef={ref}
//       onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
//       overwrite
//     />
//   );
// });

export default function BasicDetailsForm({ isEdit, currentUser }: Props) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useContext(appContext);
  const NewUserSchema = Yup.object().shape({
    // businesss_type: Yup.string(),
    // business_name: Yup.string(),
    name: Yup.string(),
    username: Yup.string(),
    // // .required("Username is required")
    // .matches(PATTERNS.EMAIL, 'Invalid username'),
    role: Yup.string(),
    parent: Yup.string().notRequired().nullable(),
    parent_role: Yup.string(),
    // firstName: Yup.string(),
    // .required("First Name is required"),
    // lastName: Yup.string(),
    // // .required("First Name is required"),
    // mobile: Yup.string(),
    // // .required("Mobile is required")
    // .matches(PATTERNS.MOBILE, 'Invalid mobile'),
    email: Yup.string().email(),
    // // .required("Email is required"),
    // aadhaar: Yup.string(),
    password: Yup.string(),
    // .when('isEdit', {
    //   is: (isEdit: boolean) => isEdit, // Add the matches validation only if isEdit is false
    // then: Yup.string()
    //   .matches(
    //     PATTERNS.PASSWORD,
    //     'Password must contain at least one digit and one special character (!@#$%^&*) and be 8-24 characters long.'
    //   ),
    // otherwise: Yup.string(), // No additional validation if isEdit is true
    // }),
    // pan: Yup.string()
    // .matches(PATTERNS.PAN, 'Invalid PAN')
    // .notRequired(),
  });

  const defaultValues = useMemo(
    () => ({
      // business_type: currentUser?.business_type || '',
      // business_name: currentUser?.business_name || '',
      name: currentUser?.name || '',
      username: currentUser?.username || '',
      role: currentUser?.role || '',
      parent: currentUser?.parent || '',
      password: currentUser?.password || '',
      parent_role: currentUser?.parent_role || '',
      email: currentUser?.email || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    // reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      // reset(defaultValues);
    }
    if (!isEdit) {
      // reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = (data: FormValuesProps) => {
    data.aadhaar = data?.aadhaar?.split(' ').join('');
    data.id = currentUser?.id;
    console.log('This is your request data' + currentUser);
    postJsonData(
      Apiendpoints.UPDATE_USER,
      data,
      setLoading,
      (res) => {
        enqueueSnackbar(res.data.message);
        push(PATH_DASHBOARD.admin.users);
      },
      (err) => {
        enqueueSnackbar(extractErrors(err), { variant: 'error' });
      }
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        rowGap={3}
        marginTop={1}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
      >
        {/* <RHFTextField
          name="business_type"
          label="Business Type"
          defaultValue={currentUser?.firstName}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <RHFTextField
          name="business_name"
          label="Business Name"
          defaultValue={currentUser?.firstName}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        /> */}
        <RHFTextField name="username" label="Username" defaultValue={currentUser?.username} />
        <RHFTextField name="name" label="Name" defaultValue={currentUser?.username} />
        <RHFTextField name="email" label="Email" defaultValue={currentUser?.username} />
        <RHFTextField name="password" label="Password" defaultValue={currentUser?.password} />
        <RHFTextField name="role" label="Role" defaultValue={currentUser?.password} />
        <RHFTextField name="parent_role" label="Parent Role" defaultValue={currentUser?.password} />
        <RHFTextField name="parent" label="Parent" defaultValue={currentUser?.password} />
        {/* <RHFTextField
          name="firstName"
          label="First Name"
          defaultValue={currentUser?.firstName?.toString()}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <RHFTextField
          name="lastName"
          label="Last Name"
          defaultValue={currentUser?.lastName}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <RHFTextField
          name="mobile"
          label="Phone Number"
          defaultValue={currentUser?.mobile}
        />
        <RHFTextField
          InputProps={{ inputMode: 'text', inputComponent: TextMaskCustom }}
          name="aadhaar"
          label="Aadhaar"
          defaultValue={currentUser?.aadhaar}
        />
        <RHFTextField
          name="pan"
          label="PAN"
          inputProps={{ style: { textTransform: 'uppercase' } }}
          defaultValue={currentUser?.pan}
        /> */}
      </Box>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!isEdit ? 'Create User' : 'Save Changes'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
