import { useEffect, useState, useRef } from 'react';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'src/components/snackbar';
import MyLoader from '../loading-screen/MyLoader';
import Favicon from '../logo/Favicon';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';
import { convertINRToWords, currencySetter } from 'src/utils/currencyUtil';
import { useAuthContext } from 'src/auth/useAuthContext';
import Mount from '../component-mount/Mount';
import DmtConfirmationDialogue from './DmtConfirmationDialogue';
import { postJsonData } from 'src/utils/axiosController';


export default function DmtAmountDialogue({
  apiEnd,
  completeData = {},
  showWallet = false,
  setOpenTpin,
  moneyTransferType,
  remData,
  ...props
}: any) {
  const [amount, setAmount] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState('w1');
  const [loading, setLoading] = useState(false);
  const [showTpinBox, setShowTpinBox] = useState(false); // State to control when to show T-PIN box
  const [amountInWords, setAmountInWords] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const { wallet, user, saveWallet, location } = useAuthContext();
  const theme = useTheme();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold the timeout ID

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
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
    formState: { errors },
  } = methods;

  const UpdateCompleteDataAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value:any = e.target.value;
    setAmount(value);
    completeData.amount = value;
    setAmountInWords(convertINRToWords(Number(value)));

    // Clear previous timeout if exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to show T-PIN box after 2 seconds of no typing
    timeoutRef.current = setTimeout(() => {
      setShowTpinBox(true);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      // Clean up: clear timeout when component unmounts or amount changes
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (completeData) {
      saveWallet();
    }
  }, []);

  const handleProceed = (data: any) => {
    completeData.name = completeData?.name;
    completeData.acc_number = completeData?.account;
    completeData.ben_id = completeData?.id;
    completeData.amount = amount;
    completeData.tpin = Object.values(data).join('');
    completeData.pf = 'web';
    completeData.latitude = location?.latitude;
    completeData.longitude = location?.longitude;
    completeData.wallet = selectedValue;

    if (moneyTransferType === 'dmt2') {
      if (completeData.amount <= remData?.data?.data?.bank1_limit) {
        completeData.pipe = remData?.data?.data?.bank1_limit;
      } else if (completeData.amount <= remData?.data?.data?.bank2_limit) {
        completeData.pipe = remData?.data?.data?.bank2_limit;
      } else if (completeData.amount <= remData?.data?.data?.bank3_limit) {
        completeData.pipe = remData?.data?.data?.bank3_limit;
      } else {
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
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ margin: 'auto' }}>Money Transfer</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <MyLoader loading={loading} />
        <div
          style={{
            background: theme.palette.primary.light + 18,
            margin: '0 auto 2rem auto',
            color: 'black',
            fontSize: '1rem',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            gap: 1,
          }}
        >
          <p>Beneficiary Name: {completeData?.name || '  -  '}</p>
          <p>Account No.: {completeData?.account || '  -  '}</p>
          <p>IFSC: {completeData?.ifsc || '  -  '}</p>
        </div>
        <Mount visible={showWallet}>
          {amount > wallet.w1 && amount > wallet.w2 ? (
            <div>Insufficient Balance, recharge first!</div>
          ) : (
            <Grid container sx={{ mb: 3 }}>
              <Mount visible={user.wallet_type === 'dual' || user.wallet_type === 'single'}>
                <Mount visible={completeData.amount && completeData.amount <= wallet.w1}>
                  <Grid
                    item
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
              <Mount visible={user.wallet_type === 'dual'}>
                <Mount visible={completeData.amount && completeData.amount <= wallet.w2}>
                  <Grid
                    item
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
          <Typography sx={{ fontWeight: 'bold', my: 2 }} ref={nameInputRef}>
            Enter Amount
          </Typography>
          <RHFTextField
            sx={{ mb: 2 }}
            fullWidth
            name="amount"
            label="Amount"
            onChange={UpdateCompleteDataAmount}
          />
          <h1 style={{ color: 'green', marginTop: '-8%', marginLeft: '3%' }}>{amountInWords}</h1>

          

          <Mount visible={showTpinBox}>
            <Typography sx={{ fontWeight: 'bold', my: 2 }}>Enter T-PIN</Typography>
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
                  !!errors.code6
                }
                errorMessage={errors?.code1?.message}
              />
              
            </Stack>
            
          </Mount>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2  ,marginTop:"6%"}}>
                <LoadingButton fullWidth size="large" onClick={handleClose} variant="outlined">
                  Close
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  size="large"
                  onClick={handleSubmit(handleProceed)}
                  variant="contained"
                >
                  Proceed
                </LoadingButton>
              </Box>
        </FormProvider>
      </DialogContent>
      {confirm && <DmtConfirmationDialogue data={completeData} setOpen={setConfirm} />}
    </Dialog>
  );
}
