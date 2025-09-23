import { useState } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { StyledButton } from '../nav-vertical-right/PaymentsContainer';
import { RHFTextField } from 'src/components/hook-form';
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { LoadingButton } from '@mui/lab';
import { PATTERNS } from 'src/utils/validation';
import Logo from 'src/components/logo';

import { convertINRToWords } from 'src/utils/currencyUtil';

const SendMoneyDialogue = ({ icon, name }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amountInWords, setAmountInWords] = useState('');

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
    amount: '',
    mobile: '',
  };

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('OTP is required'),
    code2: Yup.string().required('OTP is required'),
    code3: Yup.string().required('OTP is required'),
    code4: Yup.string().required('OTP is required'),
    code5: Yup.string().required('OTP is required'),
    code6: Yup.string().required('OTP is required'),
    amount: Yup.string()
      .required('Amount is Required')
      .matches(PATTERNS.ONLY_NUMBERS, 'Only Numbers Allowed'),
    mobile: Yup.string()
      .required('Mobile is Required')
      .matches(PATTERNS.MOBILE, 'Enter Valid Mobile'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const handleOpen = () => {
    setOpen(true);
    console.log(setIsLoading)
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const onSubmit = (data: any) => {
    const newData = { ...data };
    delete newData.amount;
    delete newData.mobile;
    const formData = {
      tpin: Object.values(newData).join(''),
      amount: data.amount,
      mobile: data.mobile,
    };
    console.log('====================================');
    console.log(formData);
    console.log('====================================');
  };

  const handleAmountChange = (value: any) => {
    setAmountInWords(convertINRToWords(Number(value)));
  };

  return (
    <>
      <Tooltip title={name ?? 'Default'} arrow placement="bottom">
        <StyledButton onClick={handleOpen}>{icon ?? 'Send Money'}</StyledButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{name ?? 'Default'}</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ p: 3, px: 6 }}>
            <Grid container sx={{ my: 1 }}>
              <Grid item xs={12} md={12}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                  }}
                >
                  <RHFTextField name="mobile" label="Mobile" />
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <RHFTextField
                        {...field}
                        label="Amount"
                        onChange={(e) => {
                          field.onChange(e);
                          handleAmountChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  <p style={{ color: 'green', marginTop: "-3%" }}>{amountInWords}</p>
                </Box>
              </Grid>

              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ width: '80%' }}>
                  <Typography sx={{ textAlign: 'center', mb: 1 }} className="fw-bold">
                    Enter T-PIN
                  </Typography>
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
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Logo sx={{ width: '50%' }} />
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default SendMoneyDialogue;
