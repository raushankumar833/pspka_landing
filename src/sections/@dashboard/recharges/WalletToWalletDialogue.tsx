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

const WalletToWalletDialogue = ({ icon, name }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amountInWords, setAmountInWords] = useState('');

  const defaultValues = {
    amount: '',
  };

  const VerifyCodeSchema = Yup.object().shape({
    amount: Yup.string()
      .required('Amount is Required')
      .matches(PATTERNS.ONLY_NUMBERS, 'Only Numbers allowed.'),
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
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <RHFTextField
                        {...field}
                        label="Enter Amount"
                        onChange={(e) => {
                          field.onChange(e);
                          handleAmountChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  <Box sx={{ mt: -2, color: 'green' }}>
                    {amountInWords}
                  </Box>
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

export default WalletToWalletDialogue;
