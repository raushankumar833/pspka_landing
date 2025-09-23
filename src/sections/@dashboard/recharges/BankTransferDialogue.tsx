import { useEffect, useState } from 'react';
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
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
// import { PATTERNS } from 'src/utils/validation';
import BankDetailsCard from './BankDetailsCard';
import PermissionGaurd from 'src/auth/PermissionGaurd';

import Logo from 'src/components/logo';
import { convertINRToWords } from 'src/utils/currencyUtil';

const dummyBank = [
  {
    id: 1,
    bankName: 'State Bank of India',
    ifsc: 'SBIN00001',
    name: 'User 01',
    accNumber: '5664650998',
  },
  {
    id: 2,
    bankName: 'Canera Bank',
    ifsc: 'SBIN00002',
    name: 'User 02',
    accNumber: '5664650998',
  },
  {
    id: 3,
    bankName: 'ICICI Bank',
    ifsc: 'SBIN00003',
    name: 'User 03',
    accNumber: '5664650998',
  },
];

const BankTransferDialogue = ({ icon, name }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenBank, setChosenBank] = useState<any>(null);
  const [amountInWords, setAmountInWords] = useState('');

  const defaultValues = {
    bank: '',
    amount: '',
  };

  const VerifyCodeSchema = Yup.object().shape({
    bank: Yup.string().required('Bank is required'),
    amount: Yup.string().required('Amount is required'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit, reset, watch, control } = methods;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'bank' && value?.bank) {
        const bank = JSON.parse(value.bank);
        setChosenBank(bank);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleOpen = () => {
    setOpen(true);
    console.log(setIsLoading);
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
    setChosenBank(null);
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
          <DialogContent sx={{ p: 3, px: 6, pt: 1 }}>
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
                  <RHFSelect name="bank" label="Select Bank">
                    <option value="" label="" />
                    {dummyBank.map((option: any) => (
                      <option
                        key={option.id}
                        value={JSON.stringify(option)}
                        label={option.bankName}
                      />
                    ))}
                  </RHFSelect>
                  <PermissionGaurd permission={chosenBank}>
                    <BankDetailsCard>
                      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <Typography sx={{ fontSize: '14px' }} className="fw-bold">
                            Name
                          </Typography>
                          <Typography sx={{ mt: 0.5 }}>{chosenBank?.name}</Typography>
                        </div>
                        <div>
                          <Typography sx={{ fontSize: '14px' }} className="fw-bold">
                            Account Number
                          </Typography>
                          <Typography sx={{ mt: 0.5 }}>{chosenBank?.accNumber}</Typography>
                        </div>
                      </section>
                      <section style={{ marginTop: '18px' }}>
                        <Typography sx={{ fontSize: '14px' }} className="fw-bold">
                          IFSC
                        </Typography>
                        <Typography sx={{ mt: 0.5 }}>{chosenBank?.ifsc}</Typography>
                      </section>
                    </BankDetailsCard>
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
                    <p style={{ color: 'green', marginTop: "-4%", marginLeft: "2%" }}>{amountInWords}</p>
                  </PermissionGaurd>
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

export default BankTransferDialogue;
