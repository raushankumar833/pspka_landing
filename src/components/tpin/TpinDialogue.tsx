import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, Stack, Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form';
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { LoadingButton } from '@mui/lab';
import { myAxios } from 'src/utils/axiosController';
import { useSnackbar } from 'src/components/snackbar';
import { extractErrors } from 'src/utils/extractError';
import MyLoader from '../loading-screen/MyLoader';
import Favicon from '../logo/Favicon';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';
import { currencySetter } from 'src/utils/currencyUtil';
import { useAuthContext } from 'src/auth/useAuthContext';
import Mount from '../component-mount/Mount';

// ----------------------------------------------------------------------

export default function TPINDialogue({
  apiEnd,
  completeData = false,
  showWallet = false,
  setOpenTpin,
  ...props
}: any) {
  const { saveWallet } = useAuthContext();
  console.log('completeData', completeData);

  const [open, setOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState('w1');
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { wallet, user } = useAuthContext();
  const theme = useTheme();
  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClose = () => {
    setOpen(false);
    if (setOpenTpin) setOpenTpin(false);
    reset(defaultValues);
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

  useEffect(() => {
    if (completeData) {
      saveWallet();
    }

    return () => {};
  }, [completeData]);

  // --------------------------------
  // TPIN VERIFY FUNCTION ....
  // --------------------------------
  const handleOtpVerify = async (data: any) => {
    // Set loading state to true to indicate that the API call is in progress
    setIsLoading(true);

    const formData = {
      tpin: Object.values(data).join(''),
      wallet: selectedValue,
      ...completeData,
    };

    try {
      const response = await myAxios.post(`${apiEnd}`, {
        ...formData,
      });
      enqueueSnackbar(response.data.message);
      handleClose();
    } catch (error) {
      reset();
      enqueueSnackbar(extractErrors(error), { variant: 'error' });

      setError('code1', {
        message: error?.response?.data?.message || 'Invalid TPIN',
      });

      // Set error messages for each code
      ['code2', 'code3', 'code4', 'code5', 'code6'].forEach((code: any) => {
        setError(code, {
          message: error?.response?.data?.message || 'Invalid TPIN',
        });
      });
    } finally {
      // Set loading state to false to indicate that the API call has finished
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>TPIN Verify</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {/* wallet choose */}
        <Mount visible={showWallet}>
          {/* wallet container */}
          {completeData.amount > wallet.w1 && completeData.amount > wallet.w2 ? (
            <div>Insufficient Balance rechage first!</div>
          ) : (
            <Grid container sx={{ mb: 3 }}>
              {/* w1 */}
              <Mount visible={user.wallet_type === 'dual' || user.wallet_type === 'single'}>
                <Mount visible={completeData.amount < wallet.w1}>
                  <Grid
                    xs={12}
                    md={12}
                    className="wallet-style just-hover"
                    onClick={() => setSelectedValue('w1')}
                    sx={
                      selectedValue === 'w1'
                        ? {
                            backgroundColor: theme.palette.primary.light + 18,
                            borderColor: theme.palette.primary.light,
                          }
                        : {}
                    }
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Favicon sx={{ width: '10%' }} disabledLink />
                      <Box sx={{ mx: 2 }}>
                        <Box
                          sx={{
                            overflow: 'hidden',
                            display: 'flex',
                            flexWrap: 'wrap',
                          }}
                        >
                          <Typography
                            sx={{
                              backgroundColor: theme.palette.primary.dark,
                              py: 0.3,
                              px: 1.2,
                              color: 'white',
                              fontSize: '12px',
                              borderRadius: '5px',
                            }}
                          >
                            Primary wallet
                          </Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold' }}>Main Wallet</Typography>
                        <Typography sx={{ color: theme.palette.grey[600] }}>
                          Available Balance: {currencySetter(wallet.w1)}
                        </Typography>
                      </Box>
                    </Box>
                    <Icon
                      icon={selectedValue === 'w1' ? 'clarity:dot-circle-line' : 'iconoir:circle'}
                      style={{
                        fontSize: '45px',
                        color: selectedValue === 'w1' ? theme.palette.primary.main : 'none',
                      }}
                    />
                  </Grid>
                </Mount>
              </Mount>
              {/* w2 */}
              <Mount visible={user.wallet_type === 'dual'}>
                <Mount visible={completeData.amount < wallet.w2}>
                  <Grid
                    xs={12}
                    md={12}
                    className="wallet-style just-hover"
                    onClick={() => setSelectedValue('w2')}
                    sx={
                      selectedValue === 'w2'
                        ? {
                            backgroundColor: theme.palette.primary.light + 18,
                            borderColor: theme.palette.primary.light,
                          }
                        : {}
                    }
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Favicon sx={{ width: '10%' }} disabledLink />
                      <Box sx={{ mx: 2 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Collection Wallet</Typography>
                        <Typography sx={{ color: theme.palette.grey[600] }}>
                          Available Balance: {currencySetter(wallet.w2)}
                        </Typography>
                      </Box>
                    </Box>
                    <Icon
                      icon={selectedValue === 'w2' ? 'clarity:dot-circle-line' : 'iconoir:circle'}
                      style={{
                        fontSize: '45px',
                        color: selectedValue === 'w2' ? theme.palette.primary.main : 'none',
                      }}
                    />
                  </Grid>
                </Mount>
              </Mount>
            </Grid>
          )}
        </Mount>

        <Typography sx={{ fontWeight: 'bold', my: 2 }}>Enter T-PIN</Typography>
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
                Verify
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </DialogContent>
      {/* ... (other code) */}
    </Dialog>
  );
}
