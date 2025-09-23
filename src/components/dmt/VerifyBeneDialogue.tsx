import { useEffect, useState, useRef } from 'react';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, Stack, Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { LoadingButton } from '@mui/lab';
// import { myAxios } from 'src/utils/axiosController';
import { useSnackbar } from 'src/components/snackbar';
// import { extractErrors } from 'src/utils/extractError';
import MyLoader from '../loading-screen/MyLoader';
import Favicon from '../logo/Favicon';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';
import { currencySetter } from 'src/utils/currencyUtil';
import { useAuthContext } from 'src/auth/useAuthContext';
import Mount from '../component-mount/Mount';
// import useResponsive from 'src/hooks/useResponsive';
import DmtConfirmationDialogue from './DmtConfirmationDialogue';
import { postJsonData } from 'src/utils/axiosController';

// ----------------------------------------------------------------------

export default function VerifyBeneDialogue({
  apiEnd,
  completeData = false,
  showWallet = false,
  setOpenTpin,
  moneyTransferType,
  remData,
  ...props
}: any) {
  console.log('remData', remData.data.data);
  const [amount, setAmount] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const [open, setOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState('w1');

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { wallet, user, saveWallet, location } = useAuthContext();
  console.log("location", location);

  //   const isMobile = useResponsive('down', 'md');
  const theme = useTheme();
  const nameInputRef = useRef<HTMLInputElement | null>(null); // Step 1: Create a reference

  useEffect(() => {
    // Step 3: Focus the input when the component mounts
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, []);
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
    // amount: Yup.string().required('Amount is required'),
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
    // setError,
    formState: { errors },
  } = methods;


  const UpdateCompleteDataAmount = (e: any) => {
    setAmount(e.target.value)
    completeData.amount = e.target.value;
  }

  useEffect(() => {
    if (completeData) {
      saveWallet();
    }

    return () => { };
  }, [completeData]);

  // --------------------------------
  // TPIN VERIFY FUNCTION ....
  // --------------------------------

  const handleProceed = (data: any) => {
    // Set loading state to true to indicate that the API call is in progress
    completeData.name = completeData?.name;
    completeData.acc_number = completeData?.account;
    completeData.ben_id = completeData?.id;
    completeData.amount = amount;
    completeData.tpin = Object.values(data).join('');
    completeData.pf = 'web';
    // completeData.mop = '';
    completeData.latitude = location?.latitude;
    completeData.longitude = location?.longitude;
    // completeData.ifsc = '';
    completeData.wallet = selectedValue;
    if (moneyTransferType === 'dmt2') {
      // Check the amount against bank limits and set the pipe field
      if (completeData.amount <= remData?.data?.data?.bank1_limit) {
        completeData.pipe = remData?.data?.data?.bank1_limit;
      } else if (completeData.amount <= remData?.data?.data?.bank2_limit) {
        completeData.pipe = remData?.data?.data?.bank2_limit;
      } else if (completeData.amount <= remData?.data?.data?.bank3_limit) {
        completeData.pipe = remData?.data?.data?.bank3_limit;
      } else {
        console.log('Amount exceeds all bank limits');
        enqueueSnackbar('Amount exceeds all bank limits', { variant: 'error' });
        return;
      }
    }

    postJsonData(
      `${apiEnd}`,
      completeData,
      setLoading,
      (res) => {
        enqueueSnackbar(res?.data?.message);
        setOpen(false);
        reset();

      },
      (err) => {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
        reset();

      }
    )
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ margin: 'auto' }}>TPIN Verify</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <MyLoader loading={loading} />

        <Typography
          sx={{
            background: theme.palette.primary.light + 18,
            margin: '0 auto 2rem auto',
            // py: 0.3,
            // my: 2,
            px: 1.2,
            color: 'black',
            fontSize: '1rem',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 1
          }}
        >
          <p>NAME : {completeData?.name || '  -  '}</p>
          <p>Account No. : {completeData?.accountNumber || '  -  '}</p>
          <p>IFSC : {completeData?.ifsc || '  -  '}</p>
        </Typography>
        <Mount visible={showWallet}>
          {/* wallet container */}
          {amount > wallet.w1 && amount > wallet.w2 ? (
            <div>Insufficient Balance rechage first!</div>
          ) : (
            <Grid container sx={{ mb: 3 }}>
              {/* w1 */}
              <Mount visible={user.wallet_type === 'dual' || user.wallet_type === 'single'}>
                <Mount visible={completeData.amount && completeData.amount <= wallet.w1}>
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
                <Mount visible={completeData.amount && completeData.amount <= wallet.w2}>
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

        <MyLoader loading={loading} />


        <FormProvider methods={methods}>
          <Typography sx={{ fontWeight: 'bold', my: 2 }} ref={nameInputRef}>Enter Amount</Typography>
          <RHFTextField sx={{ mb: 2 }} fullWidth name="amount" label="Amount" onChange={(e) => UpdateCompleteDataAmount(e)} />
          <Mount visible={completeData.amount}>
            <Typography sx={{ fontWeight: 'bold', my: 2 }}>Enter T-PIN</Typography>
          </Mount>
          <Stack spacing={3}>
            <Mount visible={completeData.amount}>
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
            </Mount>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <LoadingButton
                fullWidth
                size="large"
                // type="submit"
                onClick={handleClose}
                variant="outlined"
                sx={{
                  // mt: 2,
                }}
              >
                Close
              </LoadingButton>
              <LoadingButton
                fullWidth
                size="large"
                // type="submit"
                onClick={handleSubmit(handleProceed)}
                variant="contained"
                sx={{
                  // mt: 2,
                }}
              >
                Proceed
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </DialogContent>
      {confirm && <DmtConfirmationDialogue data={completeData} setOpen={setConfirm} />}
      {/* {confirm && <DmtConfirmationDialogue />} */}
      {/* ... (other code) */}
    </Dialog>
  );
}
