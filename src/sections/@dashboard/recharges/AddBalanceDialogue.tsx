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
} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { StyledButton } from '../nav-vertical-right/PaymentsContainer';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { PATTERNS } from 'src/utils/validation';
import Logo from 'src/components/logo';
import { convertINRToWords } from 'src/utils/currencyUtil';

const AddBalanceDialogue = ({ icon, name }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amountInWords, setAmountInWords] = useState('');

  const defaultValues = {
    amount: '',
    name: '',
    email: '',
    mobile: '',
  };

  const VerifyCodeSchema = Yup.object().shape({
    amount: Yup.string()
      .required('Amount is Required')
      .matches(PATTERNS.ONLY_NUMBERS, 'Only Numbers allowed.'),
    name: Yup.string()
      .required('Customer Name is Required')
      .matches(PATTERNS.NAME, 'At least 3 characters.'),
    email: Yup.string()
      .required('Customer Email is Required')
      .matches(PATTERNS.EMAIL, 'Enter valid email.'),
    mobile: Yup.string()
      .required('Mobile is Required')
      .matches(PATTERNS.MOBILE, 'Enter Valid Mobile'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit, reset, control } = methods;

  const handleOpen = () => {
    setOpen(true);
    console.log(setIsLoading)
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const onSubmit = (data: any) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  };

  const handleAmountChange = (value: any) => {
    setAmountInWords(convertINRToWords(Number(value)));
  };

  return (
    <>
      <Tooltip title={name ?? 'Default'} arrow placement="bottom">
        <StyledButton onClick={handleOpen}>{icon ?? 'Add Balance'}</StyledButton>
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
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="name" label="Customer Name" />
                  <RHFTextField name="email" label="Customer Email" />
                </Box>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                  }}
                  sx={{ mt: 3.5 }}
                >
                  <RHFTextField name="mobile" label="Customer Mobile" />
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

export default AddBalanceDialogue;
