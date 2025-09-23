import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Stack, Box, Typography, Grid } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import Favicon from '../logo/Favicon';
import { Icon } from '@iconify/react';
import Mount from '../component-mount/Mount';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useTheme } from '@mui/material/styles';
import { currencySetter } from 'src/utils/currencyUtil';
import MyLoader from '../loading-screen/MyLoader';

const VerifyCodeSchema = Yup.object().shape({
  code1: Yup.string().required('OTP is required'),
  code2: Yup.string().required('OTP is required'),
  code3: Yup.string().required('OTP is required'),
  code4: Yup.string().required('OTP is required'),
  code5: Yup.string().required('OTP is required'),
  code6: Yup.string().required('OTP is required'),
});

const defaultValues = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
  code5: '',
  code6: '',
};

export default function CommonTpinDialogue({ title, open, setOpenTpin,handleClose, setTpin, setIsApiCall, isApiCall, selectedValue, setSelectedValue,showWallet, beneActionLoading,setBeneActionLoading }: any) {
  const { wallet, user} = useAuthContext();
  const theme = useTheme();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;


  const onSubmit = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => {
    const tpin = Object.values(data).join('');
    setTpin(tpin);
    setIsApiCall(true)
    // if(!beneActionLoading) handleClose();
  };


  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [open, reset]);


  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ p: 3 }}>

        <FormProvider {...methods}>
        <MyLoader loading={beneActionLoading} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
            <Mount visible={showWallet}>
            {/* wallet container */}
         
              <Grid container sx={{ mb: 3 }}>
                {/* w1 */}
                <Mount visible={user.wallet_type === 'dual' || user.wallet_type === 'single'}>
                  <Mount visible={true}>
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
                  
                {/* w2 */}
                  <Mount visible={user.wallet_type === 'dual'}>
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
          </Mount>

          <Typography sx={{ fontWeight: 'bold', my: 2 }}>Enter T-PIN</Typography>

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
                  !!errors.code6
                }
                errorMessage={errors?.code1?.message}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Verify
                </LoadingButton>
              </Box>
            </Stack>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
