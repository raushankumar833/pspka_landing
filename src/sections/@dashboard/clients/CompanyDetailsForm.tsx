import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Box, Stack } from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { appContext } from 'src/context/appContext';
import { ClientInterface } from 'src/@types/clients';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValuesProps } from './ClientNewEditForm';
import { extractErrors } from 'src/utils/extractError';
import { RHFTextField } from 'src/components/hook-form';
import { postJsonData } from 'src/utils/axiosController';
import { useSnackbar } from '../../../components/snackbar';
import React, { useContext, useEffect, useMemo } from 'react';
import FormProvider from 'src/components/hook-form/FormProvider';

type Props = {
  isEdit?: boolean;
  currentUser?: ClientInterface;
};

export default function CompanyDetailsForm({ isEdit, currentUser }: Props) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useContext(appContext);

  const NewUserSchema = Yup.object().shape({
    business_name: Yup.string(),
    business_type: Yup.string(),
    name: Yup.string(),
    // .required('First Name is required'),
    gst: Yup.string(),
    // .required('GSTIN is required').matches(PATTERNS.GSTIN, 'Invalid GSTIN'),
    mobile: Yup.string(),
    // .required('Mobile is required').matches(PATTERNS.MOBILE, 'Invalid mobile'),
    email: Yup.string()
      // .required('Email is required')
      // .matches(PATTERNS.EMAIL, 'Invalid email')
      .email(),
    address: Yup.string().required('Address is required'),
  });

  const defaultValues = useMemo(
    () => ({
      business_name: currentUser?.business_name || '',
      business_type: currentUser?.business_type || '',
      name: currentUser?.companyName || '',
      gst: currentUser?.companyGst || '',
      mobile: currentUser?.companyMobile || '',
      email: currentUser?.companyEmail || '',
      address: currentUser?.companyAddress || '',
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
    postJsonData(
      // `${Apiendpoints.SAVECLIENT_COMPANY}${currentUser?.username}/`,
      `${Apiendpoints.UPDATE_USER}/`,
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
        <RHFTextField
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
        />
        <RHFTextField
          name="name"
          label="Name"
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <RHFTextField
          name="mobile"
          label="Mobile"
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <RHFTextField name="email" label="Email ID" />
        <RHFTextField name="gst" label="GSTIN" />
        <RHFTextField name="address" label="Address" />
      </Box>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
