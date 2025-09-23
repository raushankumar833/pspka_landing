import { CARD } from 'src/config';
import React from 'react';
import { Badge, Box, Button, Card, Grid, Stack, Typography, styled, useTheme } from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATTERNS } from 'src/utils/validation';
import { countries } from 'src/assets/data';
import Iconify from 'src/components/iconify';

type FormValuesProps = {
  mobile: string;
  amount: string;
  operator: string;
};

export const CwCard = styled(Card)<any>(({ theme, priority = 'warning' }) => ({
  width: '100%',
  position: 'relative',
  borderRadius: CARD.RADIUS,
  boxShadow: 'none',
  padding: theme.spacing(2, 6, 5, 6),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const LoginSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile is required')
    .matches(PATTERNS.MOBILE, 'Invalid mobile number'),
  amount: Yup.string().required('Amount is required'),
  operator: Yup.string().required('Operator is required'),
});

const CashWithdrawal = () => {
  const theme = useTheme();
  const defaultValues = {
    mobile: '',
    amount: '',
    operator: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  const scannerStyle = {
    width: '150px',
    height: '150px',
    position: 'relative',
    background: theme.palette.grey[400],
  };

  return (
    <CwCard>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RHFSelect size="medium" name="rd_device" label="Select RD Device" variant="filled">
            <option value="" />
            {countries.map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField size="medium" name="device_status" label="Device Status" variant="filled" />
          <RHFTextField size="medium" name="scan_quality" label="Scan Quality" variant="filled" />
        </Stack>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center">
              <Badge
                color="error"
                variant="dot"
                sx={{
                  zIndex: 9,
                  padding: 5,
                }}
                badgeContent=""
              >
                <Box sx={scannerStyle}>
                  <Iconify icon="game-icons:button-finger" width={150} />
                </Box>
              </Badge>
            </Stack>
            <Stack flexDirection="row">
              <Button
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: '0px',
                }}
              >
                START SCAN
              </Button>
              <Iconify
                icon="solar:refresh-square-bold"
                width={40}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <RHFSelect size="medium" name="bank" label="Search Bank" variant="filled">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                size="medium"
                name="aadhaar_number"
                label="Aadhaar Number"
                variant="filled"
              />
              <RHFTextField size="medium" name="amount" label="Amount" variant="filled" />
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
      <Stack>
        <Note />
      </Stack>
    </CwCard>
  );
};

export default CashWithdrawal;

export function Note() {
  const theme = useTheme();
  return (
    <Typography mt={2} variant="caption">
      <span
        style={{
          color: theme.palette.primary.main,
          fontWeight: 'bold',
        }}
      >
        Note:
      </span>{' '}
      <span>
        Connect scanner for scanning the impression (when scanner is connected dot in the corner
        will be green).
      </span>
    </Typography>
  );
}
