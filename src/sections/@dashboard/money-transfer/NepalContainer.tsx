import React, { useState } from 'react';
import { Box, Card, Grid, Stack, Typography, styled } from '@mui/material';
import { CARD, ICON } from 'src/config';
import { useSelector } from 'src/redux/store';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATTERNS } from 'src/utils/validation';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import { bgBlur } from 'src/utils/cssStyles';
import { StyledIcon } from 'src/components/nav-section/vertical/styles';
import SvgColor from 'src/components/svg-color';
import useResponsive from 'src/hooks/useResponsive';
import CardTitle from 'src/components/card/CardTitle';
import { capitalize } from 'src/utils/textUtil';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextField } from 'src/components/hook-form';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
// import BeneficiaryItem from './nepal/BeneficiaryItem';
import BeneDialogue from './nepal/BeneDialogue';
import AddCustomerDialog from './nepal/AddCustomerDialog';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
// import { postJsonData } from 'src/utils/axiosController';
// import { Apiendpoints } from 'src/utils/Apiendpoints';

type FormValuesProps = {
  mobile: string;
};

const DMTCard = styled(Card)<any>(({ theme, priority = 'warning' }) => ({
  width: '100%',
  position: 'relative',
  borderRadius: CARD.RADIUS,
  boxShadow: 'none',
  padding: theme.spacing(2, 6, 5, 6),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));
const RemitterCard = styled(Card)<any>(({ theme, priority = 'warning' }) => ({
  width: '100%',
  borderRadius: CARD.RADIUS_10,
  boxShadow: 'none',
  ...bgBlur({
    color: theme.palette.warning.light,
    blur: 5,
    opacity: 0.25,
  }),
  margin: theme.spacing(1, 'auto'),
  padding: theme.spacing(2),
}));
const IconContainer = styled(Box)<any>(({ theme }) => ({
  display: 'block',
  position: 'relative',
  width: '32px',
  height: '32px',
  borderRadius: '50px',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  background: theme.palette.primary.dark,
  [theme.breakpoints.down('md')]: {
    width: '20px',
    height: '20px',
  },
}));

const Schema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile is required')
    .matches(PATTERNS.MOBILE, 'Invalid mobile number'),
});

const icon = (name: string, ismobile: boolean) => (
  <SvgColor
    src={`/assets/icons/money-transfer/${name}.svg`}
    sx={{ width: ismobile ? 0.5 : 1, height: ismobile ? 0.5 : 1 }}
  />
);

// component start
const NepalContainer = () => {
  const ismobile = useResponsive('down', 'md');
  const { moneyTransferType } = useSelector((state) => state.recharge_bills);
  const [loading, setLoading] = useState(false)
  const [addCustomer, setAddCustomer] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [receiver, setReceiver] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    mobile: '',
    amount: '',
    operator: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Schema),
    defaultValues
  });

  const { handleSubmit, watch } = methods;

  React.useEffect(() => {
    const subscription = watch((value: any) => {
      if (value.mobile.length === 10) {
        const data = { 'number': value.mobile, 'operator': 'number' };
        onSubmit(data);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: any) => {
    console.log(data, setShowCustomer, loading, receiver)
    postJsonData(
      Apiendpoints.NEPAL_TRANSFER_GET_MOBILE,
      data,
      setLoading,
      (res) => {
        console.log("Success")
        if (!res.data.data.customer) {
          setAddCustomer(true);
        }
        else {
          console.log("Receiver", res?.data?.data?.customer?.Receivers?.Receiver)
          setReceiver(res?.data?.data?.customer?.Receivers?.Receiver)
          setShowCustomer(true)
        }
      },
      (err) => {
        console.log("Error")
      }
    )
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            width: '100%',
            margin: '0 auto',
          }}
        >
          <PermissionGaurd permission={true}>
            {/* SHOW THIS COMPONENT BEFORE FETCHING REMITTERR DATA */}
            <DMTCard>
              <CardTitle title={capitalize(moneyTransferType) + 'Transfer' || 'Select Operator'} />
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ display: 'flex', flexDirection: 'column', marginTop: "2%" }}>
                  <RHFTextField
                    size="medium"
                    name="mobile"
                    label="Enter Remitter Mobile Number"
                    inputProps={{ maxLength: 10 }}
                  />
                </Stack>
              </FormProvider>
            </DMTCard>
          </PermissionGaurd>
          <AddCustomerDialog open={addCustomer} setOpen={setAddCustomer} />
          {showCustomer &&
            <PermissionGaurd permission={true}>
              {/* SHOW THIS COMPONENT AFTER FETCHING REMITTERR DATA */}
              <DMTCard>
                <RemitterCard>
                  <Scrollbar>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: ismobile ? 'row' : 'row',
                        justifyContent: 'space-between',
                        position: 'relative',
                      }}
                    >
                      <Stack spacing={ismobile ? 1 : 2}>
                        <InfoBox title="Rahul Kumar" />
                        <InfoBox title="8010047885" boxIcon="phone" />
                      </Stack>
                      <Stack spacing={ismobile ? 1 : 2}>
                        <InfoBox title="ID Type" boxIcon="graph" value="Aadhaar card" />
                        <InfoBox title="ID Number" boxIcon="graph2" value="xxxxxxx8752" />
                      </Stack>
                    </Box>
                  </Scrollbar>
                  {!ismobile && <BeneDialogue />}
                </RemitterCard>
                {ismobile && <BeneDialogue />}
                <Stack mt={4} flexDirection="row" justifyContent="space-between" alignItems="center">
                  {/* <Typography>Receiver list</Typography>
                  <Stack>
                    <Typography>Transaction Count:</Typography>
                    <Typography variant="caption">
                      {' '}
                      <span>Day: 0</span> <span>Month: 0</span> <span>Year: 0</span>
                    </Typography>
                  </Stack> */}
                </Stack>
                <Stack rowGap={1}>
                  {/* <BeneficiaryItem isAccount />
                  <BeneficiaryItem />
                  <BeneficiaryItem isAccount />
                  <BeneficiaryItem />
                  <BeneficiaryItem isAccount />
                  <BeneficiaryItem isAccount />
                  <BeneficiaryItem /> */}
                  {/* <BeneficiaryItem /> */}
                </Stack>
              </DMTCard>
            </PermissionGaurd>
          }
        </Box>
      </Grid>
    </Grid>
  );
};

export default NepalContainer;

function InfoBox({ title = 'Rahul Kumar', subtitle = '', value = '', boxIcon = 'user' }) {
  const ismobile = useResponsive('down', 'md');
  return (
    <>
      {/* COMPONENT FOR DESKTOP SCREEN */}
      <PermissionGaurd permission={!ismobile}>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
          <IconContainer>
            <Box sx={innerStyle}>
              <StyledIcon color="white">{icon(boxIcon, ismobile)}</StyledIcon>
            </Box>
          </IconContainer>
          <Stack
            flexDirection={'row'}
            alignItems="center"
            justifyContent={'space-between'}
            width="max-content"
            minWidth={'250px'}
          >
            <Typography variant="body2" ml={1}>
              {title}
            </Typography>
            <PermissionGaurd permission={value ? true : false}>
              <Typography variant="body2" fontWeight="bold" ml={6} textAlign="right">
                {value}
              </Typography>
            </PermissionGaurd>
          </Stack>
        </Box>
      </PermissionGaurd>

      {/* COMPONENT FOR MOBILE SCREEN */}
      <PermissionGaurd permission={ismobile}>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
          <IconContainer>
            <Box sx={innerStyle}>
              <StyledIcon color="white">{icon(boxIcon, ismobile)}</StyledIcon>
            </Box>
          </IconContainer>
          <Stack
            flexDirection={'row'}
            alignItems="center"
            justifyContent={'space-between'}
            width="max-content"
            minWidth={'250px'}
          >
            <Typography variant="body2" ml={1}>
              {title}
            </Typography>
            <PermissionGaurd permission={value ? true : false}>
              <Typography variant="body2" fontWeight="bold" ml={6} textAlign="right">
                {value}
              </Typography>
            </PermissionGaurd>
          </Stack>
        </Box>
      </PermissionGaurd>
    </>
  );
}

const innerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: ICON.NAV_ITEM,
  height: ICON.NAV_ITEM,
};
