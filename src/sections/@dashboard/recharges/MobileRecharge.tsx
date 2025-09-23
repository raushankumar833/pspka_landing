import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Card, Grid, Stack, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OperatorSearch from './OperatorSearch';
import CardTitle from 'src/components/card/CardTitle';
import { bgBlur } from 'src/utils/cssStyles';
import { CARD } from 'src/config';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { dispatch, useSelector } from 'src/redux/store';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import PlanContainer from './PlanContainer';
import TPINDialogue from 'src/components/tpin/TpinDialogue';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { SERVICE_SUBTYPE } from 'src/utils/constants';
import MyLoader from 'src/components/loading-screen/MyLoader';
import { getBillerDetails } from 'src/redux/my-slices/recharge_bills';
import { checklength } from 'src/utils/flattenArray';
import { capitalize } from 'src/utils/textUtil';
import { createDynamicSchema } from 'src/utils/formSchema';
import Mount from 'src/components/component-mount/Mount';
import Image from 'src/components/image/Image';

type FormValuesProps = {
  mobileNumber: string;
  transferAmount: string;
  afterSubmit?: string;
};
const RechargesCard = styled(Card)<any>(({ theme }) => ({
  width: '100%',
  position: 'relative',
  borderRadius: CARD.RADIUS_8,
  boxShadow: 'none',
  padding: theme.spacing(4),
}));

export const InnerCard = styled(Card)<any>(({ theme, bg = '#08509E' }) => ({
  width: '100%',
  borderRadius: CARD.RADIUS,
  boxShadow: 'none',
  margin: '20px 0',
  padding: theme.spacing(2),
  ...bgBlur({
    color: bg,
    blur: 5,
    opacity: 0.1,
  }),
}));

const OuterIcon = styled(Box)<any>(({ theme, bg = '#08509E' }) => ({
  top: -12,
  zIndex: 1,
  right: -12,
  width: '100px',
  height: '100px',
  display: 'flex',
  borderRadius: '50px',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  background: bg,
  // background: theme.palette.secondary.light,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px inset',
}));
const InnerIcon = styled(Box)<any>(({ theme }) => ({
  padding: theme.spacing(1),
  width: '48px',
  height: '48px',
  display: 'flex',
  borderRadius: '50px',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  background: theme.palette.common.white,
}));

const MobileRecharge = ({ serviceIllustration }: any) => {
  const theme = useTheme();
  const [data, setData] = useState<any>();
  const { selectedBiller, isLoading, billerDetails } = useSelector((state) => state.recharge_bills);

  const MobileSchema = useMemo(() => {
    if (checklength(billerDetails?.param)) {
      const sch: any = {
        sc: Yup.object().shape(createDynamicSchema(billerDetails?.param)),
      };
      return sch;
    }
  }, [billerDetails]);
  // console.log("validator schema",MobileSchema);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(MobileSchema?.sc),
  });

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = (data: any) => {
    if (!selectedBiller.code) {
      setError('afterSubmit', {
        message: 'Select operator to recharge!',
      });
    } else {
      const fData = {
        ...data,
        serviceType: SERVICE_SUBTYPE.mobile,
        opCode: selectedBiller.id,
        pf: 'web',
        latitude: '12.9716',
        longitude: '77.5946',
        wallet: 'w2',
      };
      setData(fData);
    }
  };

  useEffect(() => {
    if (selectedBiller?.id) dispatch(getBillerDetails({ code: selectedBiller.id }));

    return () => {};
  }, [selectedBiller]);

  const inputParameters = useMemo(() => {
    if (checklength(billerDetails?.param)) {
      const renderedParam =
        checklength(billerDetails?.param) &&
        billerDetails?.param.map((item: any, index: any) => {
          if (item.inputType.toLowerCase() === 'numeric') {
            return (
              <RHFTextField
                key={index}
                name={item.name}
                label={capitalize(item.desc.replace(/_/g, ' '))}

                
              />
              
            );
           
          }
        });
      // dispatch(hasError('render complete'));
      // console.log('end');
      return renderedParam;
    }
  }, [billerDetails]);

  return (
    <>
      <Stack mb={2}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <OperatorSearch />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            position: 'relative',
          }}
        >
          <MyLoader loading={isLoading} />
          <RechargesCard>
            <PermissionGaurd permission={selectedBiller?.code ? true : false}>
              <OuterIcon bg={selectedBiller?.color}>
                <InnerIcon>
                  <img src={selectedBiller?.img} alt={selectedBiller?.code} />
                </InnerIcon>
              </OuterIcon>
            </PermissionGaurd>
            <InnerCard bg={selectedBiller?.color}>
              <CardTitle
                title={selectedBiller?.name || 'Select Operator'}
                sx={{
                  padding: '10px 0 26px 0',
                  color: theme.palette['warning'].darker,
                }}
              />

              {selectedBiller?.name ? (
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Stack
                    spacing={3}
                    sx={{
                      px: 2,
                    }}
                  >
                    
                     
                    {inputParameters}
                    
                    <LoadingButton
                      fullWidth
                      color="inherit"
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      sx={{
                        mt: 2,
                        bgcolor: (theme) =>
                          theme.palette.mode === 'light'
                            ? theme.palette.primary.darker
                            : theme.palette.primary.light,
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                        '&:hover': {
                          bgcolor: 'text.primary',
                          color: (theme) =>
                            theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                        },
                      }}
                       
                    >
                       
                      Recharge Now
                    </LoadingButton>
                    
                  </Stack>
                </FormProvider>
              ) : (
                serviceIllustration && (
                  <Image src={serviceIllustration} sx={{ width: '100%' }} alt="" />
                )
              )}
            </InnerCard>
            <Mount visible={selectedBiller?.name}>
              <PlanContainer setValue={setValue} />
            </Mount>
          </RechargesCard>
        </Grid>
      </Grid>
      {data && (
        <TPINDialogue
          apiEnd={Apiendpoints.RECHARGE}
          completeData={data}
          showWallet
          setOpenTpin={setData}
        />
      )}
    </>
  );
};

export default MobileRecharge;
