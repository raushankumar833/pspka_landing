import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack, styled, useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CardTitle from 'src/components/card/CardTitle';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import { CARD } from 'src/config';
import { PATTERNS } from 'src/utils/validation';
import * as Yup from 'yup';
import { bgBlur } from 'src/utils/cssStyles';
import Logo from 'src/components/logo';
import { LoadingButton } from '@mui/lab';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { apiErrorToast } from 'src/utils/toastFire';
import MyLoader from 'src/components/loading-screen/MyLoader';
import { convertINRToWords } from 'src/utils/currencyUtil';


type FormValuesProps = {
  mobile: string;
  amount: string;
};

const RechargesCard = styled(Card)<any>(({ theme, priority = 'warning' }) => ({
  width: '100%',
  position: 'relative',
  borderRadius: CARD.RADIUS_8,
  boxShadow: 'none',
  padding: theme.spacing(4),
}));

const InnerCard = styled(Card)<any>(({ theme, bg = '#08509E' }) => ({
  width: '100%',
  borderRadius: CARD.RADIUS,
  boxShadow: 'none',
  padding: theme.spacing(2),
  ...bgBlur({
    color: bg,
    blur: 5,
    opacity: 0.1,
  }),
}));

const cmsSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile is required')
    .matches(PATTERNS.MOBILE, 'Enter Valid mobile number'),
  amount: Yup.string()
    .required('Amount is required')
    .matches(PATTERNS.NUMERICS, 'Enter Only numbers'),
});

const OuterIcon = styled(Box)<any>(({ bg = '#08509E' }) => ({
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
  width: '58px',
  height: '58px',
  display: 'flex',
  borderRadius: '50px',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  background: theme.palette.common.white,
}));

const CmsOne = () => {
  const [request, setRequest] = useState(false);
  const [amountInWords, setAmountInWords] = useState('');
  // const [url, setUrl] = useState('');
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(cmsSchema),
  });
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    // setError,
    // formState: { isSubmitting, errors },
    formState: { isSubmitting },
  } = methods;
  
console.log(request);
const handleAmountChange = (value:any) => {
  setAmountInWords(convertINRToWords(Number(value)));
};
  const onSubmit = (data: any) => {
    console.log('data', data);
    // const fData = {
    //   ...data,
    //   latitude: '12.9716',
    //   longitude: '12.9716',
    //   pf: 'web',
    //   additionalParams: null,
    // };

    postJsonData(
      Apiendpoints.CREATE_ORDER_CMS,
      data,
      setRequest,
      (res) => {
        const wholeRes = res.data.data;
        const parsedBase64Key = CryptoJS.enc.Base64.parse(
          wholeRes.superMerchantSkey.substring(0, 32)
        );

        // console.log("parsedBase64Key", parsedBase64Key);

        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(wholeRes), parsedBase64Key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });

        const encryptedString = btoa(encrypted.toString());

        // console.log("encryptedString", encryptedString);

        if (encryptedString) {
          //   setUrl(
          //     `https://fpuat.tapits.in/UberCMSBC/#/login?data=${encryptedString}&skey=${wholeRes.superMerchantSkey.substring(
          //       0,
          //       32
          //     )}`
          //   );
          window.open(
            `https://fpuat.tapits.in/UberCMSBC/#/login?data=${encryptedString}&skey=${wholeRes.superMerchantSkey.substring(
              0,
              32
            )}`,
            '_blank'
          );
        }
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <MyLoader loading={request} />
      {/* <Stack mb={2}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      </Stack> */}
      <Box sx={{ width: '80%' }}>
        <RechargesCard>
          <OuterIcon bg={theme.palette.primary.main}>
            <InnerIcon>
              <Logo disabledLink />
            </InnerIcon>
          </OuterIcon>
          <InnerCard bg={theme.palette.primary.main}>
            <CardTitle
              title={'CMS 1'}
              sx={{
                padding: '10px 0 26px 0',
              }}
            />

            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Stack
                    spacing={3}
                    sx={{
                      px: 2,
                    }}
                  >
                    <RHFTextField name="mobile" label="Enter Mobile" />
                    <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <>
                        <RHFTextField
                          {...field}
                          label="Amount"
                          onChange={(e) => {
                            field.onChange(e);
                            handleAmountChange(e.target.value);
                          }}
                        />
                        {/* Conditionally show amount in words */}
                       
                      </>
                    )}
                  />
                 <p style={{color:"green",marginTop:"0%",marginLeft:"1%"}}> {amountInWords}
                 </p>

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
                      Proceed
                    </LoadingButton>
                  </Stack>
                </FormProvider>
              </Grid>
            </Grid>
          </InnerCard>
        </RechargesCard>
      </Box>
    </Box>
  );
};
export default CmsOne;
