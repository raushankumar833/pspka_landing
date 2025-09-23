import { useState } from 'react';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, Stack, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form';
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { LoadingButton } from '@mui/lab';
import { myAxios } from 'src/utils/axiosController';
import { useSnackbar } from 'src/components/snackbar';
import { extractErrors } from 'src/utils/extractError';
import MyLoader from '../loading-screen/MyLoader';

// ----------------------------------------------------------------------

export default function OtpDialogue({
  setOpenOtp,
  apiEnd,
  completeData = false,
  onCompletedCb,
  sendOtpRef,
  setOpenHandle
 
}: //   ...props
any) {
  //   console.log('completeData', completeData);

  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  //   const theme = useTheme();
  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  const handleClose = () => {
    setOpenOtp(false);
    setOpen(false);
    reset(defaultValues);
    setOpenHandle(false)
  };

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('OTP is required'),
    code2: Yup.string().required('OTP is required'),
    code3: Yup.string().required('OTP is required'),
    code4: Yup.string().required('OTP is required'),
    code5: Yup.string().required('OTP is required'),
    code6: Yup.string().required('OTP is required'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;
  //  console.log("responsedata refreance otp",sendOtpRef);
   
  // --------------------------------
  // OTP VERIFY FUNCTION ....
  // --------------------------------
  const handleOtpVerify = async (data: any) => {
    // Set loading state to true to indicate that the API call is in progress
    setIsLoading(true);

    const formData = {
      otp: Object.values(data).join(''),
      ...completeData,
    };

    try {
      const response = await myAxios.post(`${apiEnd}`, {
        ...formData,
        "otpReference":sendOtpRef
      });
      if (onCompletedCb) onCompletedCb();
      enqueueSnackbar(response.data.message);
      handleClose();
    } catch (error) {
      reset();
      enqueueSnackbar(extractErrors(error), { variant: 'error' });

      setError('code1', {
        message: error?.response?.data?.message || 'Invalid OTP',
      });

      // Set error messages for each code
      ['code2', 'code3', 'code4', 'code5', 'code6'].forEach((code: any) => {
        setError(code, {
          message: error?.response?.data?.message || 'Invalid OTP',
        });
      });
    } finally {
      // Set loading state to false to indicate that the API call has finished
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {/* wallet choose */}

          {/* <Typography sx={{ fontWeight: 'bold', my: 2 }}>Enter Your OTP</Typography> */}
          <MyLoader loading={isLoading} />

          <FormProvider methods={methods}>
            <Stack spacing={3}>
              <RHFCodes2
                variant="outlined"
                keyName="code"
                inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
                error={
                  !!errors.code1 ||
                  !!errors.code2 ||
                  !!errors.code3 ||
                  !!errors.code4 ||
                  !!errors.code5 ||
                  !!errors.code6 ||
                  errors?.code1
                }
                errorMessage={errors?.code1?.message}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LoadingButton
                  fullWidth
                  size="large"
                  // type="submit"
                  onClick={handleSubmit(handleOtpVerify)}
                  variant="contained"
                  sx={{
                    mt: 2,
                  }}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </DialogContent>
        {/* ... (other code) */}
      </Dialog>
    </>
  );
}
