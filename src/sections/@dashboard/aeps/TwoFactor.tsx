import { CARD } from 'src/config';
import React, { useEffect, useState } from 'react';
import { Badge, Box, Button, Card, Grid, Stack, styled, useTheme } from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATTERNS } from 'src/utils/validation';
import { countries } from 'src/assets/data';
import Iconify from 'src/components/iconify';
import { Note } from './CashWithdrawal';
import { RDDeviceStatus } from 'src/utils/constants';
import { getMFS100InfoLoad } from 'src/utils/aepsCaptureCode';
import OutletRegistrationPopover from './OutletRegistrationPopover';

// import { RDDeviceStatus } from 'src/utils/constants';

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

const TwoFactor = () => {
  const [machineRequest, setMachineRequest] = useState(false);
  const [scanAnim, setScanAnim] = useState('');
  const [scanData, setScanData] = useState<any>({});
  const [rdDevice, setRdDevice] = useState<any>();
  const [rdDeviceList, setRdDeviceList] = useState<any>();
  console.log(machineRequest, scanAnim, scanData, rdDevice, rdDeviceList);

  function getRdDeviceInfo() {
    setMachineRequest(true);
    // console.log("machine func call . . .");
    setTimeout(() => {
      // console.log("inside machine func timeout . . .");
      getMFS100InfoLoad(
        setMachineRequest,
        (dataArray: any) => {
          // console.log('dataArray', dataArray);
          setScanData({});
          // setScanAnim(RDDeviceStatus.NOT_READY);
          for (let i = 0; i < dataArray.length; i++) {
            // console.log("data array=>", dataArray[i].status);
            const data = dataArray[i];
            if (data && data.status === RDDeviceStatus.READY) {
              setScanAnim(data ? data.status : RDDeviceStatus.SCAN_FAILED);
              setRdDevice(data);
            } else if (data && data.status === RDDeviceStatus.NOT_READY) {
              setScanAnim(data ? data.status : RDDeviceStatus.SCAN_FAILED);
              setRdDevice(data);
            }
          }
          if (dataArray) setRdDeviceList(dataArray);
          // console.log("success status=>", machineRequest);
        },
        (err) => {
          setScanAnim(RDDeviceStatus.NOT_READY);
          setRdDevice({});
          setRdDeviceList([]);
          setMachineRequest(false);
          setScanData({});
          // setScanAnim(err ? err.status : RDDeviceStatus.SCAN_FAILED);
          // console.log("failed status=>", machineRequest);
        }
      );
    }, 500);
    // setMachineRequest(false);
  }

  useEffect(() => {
    getRdDeviceInfo();
  }, []);

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
      <OutletRegistrationPopover />
      {/* Integrate a popover component here for New outlet onboarding dynamic based on user value. */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RHFTextField
            size="medium"
            name="aadhaar_number"
            label="Aadhaar Number"
            variant="filled"
          />
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
              <RHFSelect size="medium" name="rd_device" label="Select RD Device" variant="filled">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                size="medium"
                name="device_status"
                label="Device Status"
                variant="filled"
              />
              <RHFTextField
                size="medium"
                name="scan_quality"
                label="Scan Quality"
                variant="filled"
              />
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

export default TwoFactor;
