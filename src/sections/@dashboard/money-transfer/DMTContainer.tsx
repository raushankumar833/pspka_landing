import React, { useEffect, useState } from 'react';
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
import { currencySetter } from 'src/utils/currencyUtil';
import useResponsive from 'src/hooks/useResponsive';
import BeneficiaryItem from './dmt/BeneficiaryItem';
import CardTitle from 'src/components/card/CardTitle';
import { capitalize } from 'src/utils/textUtil';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextField } from 'src/components/hook-form';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import BeneDialogue from './dmt/BeneDialogue';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from '../../../utils/Apiendpoints';
import { apiErrorToast, okSuccessToast } from 'src/utils/toastFire';
import MyLoader from 'src/components/loading-screen/MyLoader';
import OtpDialogue from 'src/components/otp/OtpDialogue';
import BeneSearch from 'src/components/money-transfer/BeneSearch';
import { checklength } from 'src/utils/flattenArray';
import MoneyTransferCarousel from 'src/pages/components/extra/MoneyTransferCarousel';
// import CommonTpinDialogue from 'src/components/tpin/CommonTpinDialogue';
import AddDmtRemitter from './AddDmtRemitter';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteBeneDialog from './dmt/DeleteBeneDialog';
// import { useRouter } from 'next/router';


type FormValuesProps = {
  mobileNumber: string;
};
const DMTCard = styled(Card)<any>(({ theme, priority = 'warning' }) => ({
  width: '100%',
  position: 'relative',
  borderRadius: CARD.RADIUS,
  boxShadow: 'none',
  padding: theme.spacing(5, 10, 5, 6),
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
const icon = (name: string, ismobile: boolean) => (
  <SvgColor
    src={`/assets/icons/money-transfer/${name}.svg`}
    sx={{ width: ismobile ? 0.5 : 1, height: ismobile ? 0.5 : 1 }}
  />
);
// component start
const DMTContainer = ({ bannerList, serviceType, FormValuesProps }: any) => {
  const ismobile = useResponsive('down', 'md');
  const { moneyTransferType } = useSelector((state) => state.recharge_bills);
  // OPEN MODELS
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [tpin, setTpin] = useState("");
  const [walletType, setWalletType] = useState('w1');
  const [isApiCall, setIsApiCall] = useState(false);
  const [chosenBene, setChosenBene] = useState<any>({});
  const [remitterData, setRemitterData] = useState<any>();
  const [otpReference, setOtpReference] = useState('');
  const [typeOfCb, setTypeOfCb] = useState('');
  const [formValues, setFormValues] = useState<FormValuesProps | null>(null);
  const [filteredList, setFilteredList] = useState([]);
  const [sendStatusCode, setStatusCode] = useState("");
  const [otpRef, setOtpRef] = useState();
  const [otpRefDmt2, setOtpRefDmt2] = useState();
  const [sendOtpRef, setSendOtpRef] = useState();
  const [openHandle, setOpenHandle] = useState(false);

  // console.log('remitterData', remitterData);
  // console.log('chosenBene', chosenBene);
  // LOADINGS
  const [isLoading, setIsLoading] = useState(false);
  const [beneActionLoading, setBeneActionLoading] = useState(false);
  const [addRemittery, setAddRemittery] = useState(false);

  const remitterMobileSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .required('Mobile is required')
      .matches(PATTERNS.MOBILE, 'Invalid mobile number'),
  });
  console.log("Servicess types is", serviceType, setTpin)

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(remitterMobileSchema),
  });

  const {
    // setError,
    // formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setError
  } = methods;

  React.useEffect(() => {
    const subscription = watch((value: any) => {
      if (value.mobileNumber.toString().length === 10) {
        // console.log(value.mobileNumber);
        onSubmit({ mobileNumber: value.mobileNumber });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // get remitter api call with watch of RHF
  const onSubmit = (data: FormValuesProps) => {
    const regex = /^[6-9]\d*$/;
    if (!regex.test(data.mobileNumber)) {
      setError('mobileNumber', {
        type: 'manual',
        message: 'Input must start with a number between 6 and 9.',
      });
    } else {
      //   clearErrors('numberField');
      //   console.log('Form Data:', data);
      //   // Perform form submission
      // }
      setFormValues(data);
      console.log("mobile number data", data);
      console.log(typeOfCb, beneActionLoading, setOtpReference)
      postJsonData(
        moneyTransferType === 'dmt1'
          ? Apiendpoints.GET_REMITTER_DMT1
          : Apiendpoints.GET_REMITTER_DMT2,
        data,
        setIsLoading,

        (res) => {
          setRemitterData(res?.data);
          console.log("dmt res", res?.data?.data?.statuscode);
          console.log("dmt2 res", res?.data?.data?.data);
          // console.log("otp referance",res?.data?.data?.otpReference);
          if (res?.data?.data?.statuscode) {
            setAddRemittery(true);
          }
          if (res?.data?.data?.otpReference) {
            const otpRefData = res?.data?.data?.otpReference;
            setOtpRef(otpRefData)
            setStatusCode("OTP")
            setAddRemittery(true);

          }
          const otpRefDataDmt2 = res?.data?.data?.data
          setOtpRefDmt2(otpRefDataDmt2)

        },
        (err) => {
          //  enqueueSnackbar(err.response.data.message );
          apiErrorToast(err);
        }
      );
    }
  };
  // delete api call of bene
  // const router = useRouter();

  const backToDmt = () => {
    // router.back();
    setRemitterData('')
  }

  const deleteBeneApi = () => {
    setBeneActionLoading(true);
    postJsonData(
      moneyTransferType === 'dmt1' ? Apiendpoints.DELETE_BENE_DMT1 : Apiendpoints.DELETE_BENE_DMT2,
      {
        remitterMobile:
          moneyTransferType === 'dmt1'
            ? remitterData?.data?.mobile
            : remitterData?.data?.data?.mobile,
        beneficiaryId: chosenBene?.id,
      },
      setBeneActionLoading,
      (res) => {
        // console.log('rsp', res.data);
        if (moneyTransferType === 'dmt1') {
          // setOtpReference(res?.data?.data?.otpReference);
          // setOpenOtp(tr 
        } else {
          okSuccessToast('', res?.data?.message);
          setOpenConfirm(false);
          onSubmit({ mobileNumber: remitterData?.data?.data?.mobile });
        }
        setBeneActionLoading(false);
      },
      (err) => {
        apiErrorToast(err);
        setBeneActionLoading(false);
      }
    );
  };

  // verify bene func
  // const VerifyBene = () => {    
  //   const data = {
  //     acc_number: chosenBene?.account,
  //     ifsc: chosenBene?.ifsc,
  //     param1:moneyTransferType=="dmt1"?remitterData?.data?.mobile:remitterData?.data?.data?.mobile,
  //     name:chosenBene?.name,
  //     tpin:tpin,
  //     wallet:walletType,
  //     pf: 'web',
  //     latitude: '12.9716',
  //     longitude: '77.5946',
  //   };
  //   postJsonData(
  //   Apiendpoints.DMT1_VERIFY_BENE,
  //     data,
  //     setBeneActionLoading,
  //     (res) => {
  //       console.log('rsp', res.data);
  //       okSuccessToast('Success', res?.data?.message);
  //       setWalletType('')
  //       // setOtpReference(res?.data?.data?.otpReference);
  //       // setOpenOtp(true);
  //     },
  //     (err) => {
  //       apiErrorToast(err);
  //     }
  //   );
  // };
  const handleCloseTpinVerify = () => {
    setOpenConfirm(false);
  };

  useEffect(() => {
    if (remitterData?.data?.statusCode === 'OTP') {
      setAddRemittery(true);
    }
  }, [remitterData]);

  const VerifyBene = () => {
    const data = {
      acc_number: chosenBene?.account,
      ifsc: chosenBene?.ifsc,
      param1: moneyTransferType === "dmt1" ? remitterData?.data?.mobile : remitterData?.data?.data?.mobile,
      name: chosenBene?.name,
      tpin: tpin,
      wallet: walletType,
      pf: 'web',
      latitude: '12.9716',
      longitude: '77.5946',
    };
    // console.log("mobile number",remitterData?.data?.mobile);
    setBeneActionLoading(true); // Set loading to true before API call
    postJsonData(
      Apiendpoints.DMT1_VERIFY_BENE,
      data,
      setBeneActionLoading,
      (res) => {
        console.log('rsp', res.data);
        okSuccessToast('Success', res?.data?.message);
        setWalletType('');
        setBeneActionLoading(false);
        handleCloseTpinVerify()// Set loading to false after success
      },
      (err) => {
        apiErrorToast(err);
        setBeneActionLoading(false);
        handleCloseTpinVerify()// Set loading to false after error
      }
    );
  };

  useEffect(() => {
    if (isApiCall) {
      if (typeOfCb == "verifyBene") {
        VerifyBene()
      } else {
        deleteBeneApi()
      };
      setIsApiCall(false); // Reset isApiCall after API call
    }
  }, [isApiCall]);
  console.log("BeneActionLoading in dmt container", beneActionLoading);
  const displayLimitInDMT2 = (limit1: number, limit2: number, limit3: number) => {
    if (limit1 > 0) {
      return limit1;
    } else if (limit2 > 0) {
      return limit2;
    } else {
      return limit3;
    }
  }; console.log("addRemittery in dmt", addRemittery);
  const filterList = (value: string) => {
    if (value === 'empty') {
      setFilteredList([]);
    } else if (checklength(remitterData?.data?.beneficiaries)) {
      let filteredList = [];
      filteredList = remitterData?.data?.beneficiaries?.filter((item: any) => {
        if (
          item?.name?.toLowerCase().includes(value?.toLowerCase()) ||
          item?.bene_name?.toLowerCase().includes(value?.toLowerCase()) ||
          item?.account?.toLowerCase().includes(value?.toLowerCase()) ||
          item?.bene_acc?.toLowerCase().includes(value?.toLowerCase())
        ) {
          return item;
        } else {
          return undefined;
        }
      });
      setFilteredList(filteredList);
      // if (checklength(filteredList)) {
      //   setFilteredList(filteredList);
      // } else {
      //   setFilteredList([]);
      // }
    } else {
    }
    console.log("data of mobile", remitterData?.data?.data?.mobile);
  };

  return (
    <Grid container spacing={3}>
      <MyLoader loading={isLoading} />
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            width: '100%',
            margin: '0 auto',
          }}
        >
          <PermissionGaurd permission={remitterData?.message != "Success"}>
            {/* SHOW THIS COMPONENT BEFORE FETCHING REMITTERR DATA */}
            <DMTCard>
              <CardTitle
                sx={{ mb: 1.5 }}
                title={
                  capitalize(
                    moneyTransferType === 'dmt1'
                      ? 'Domestic money transfer 1'
                      : 'Domestic money transfer 2'
                  ) || 'Select Operator'
                }
              />
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
                  <RHFTextField
                    size="medium"
                    name="mobileNumber"
                    label="Enter Remitter Mobile Number"
                    // rules={{
                    //   required: 'This field is required',
                    //   validate: (value) =>
                    //     /^[6-9]\d*$/.test(value) || 'Input must start with a number between 6 and 9.',
                    // }}
                    inputProps={{ maxLength: 16 }}
                  />
                  {/* <LoadingButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                    Proceed
                  </LoadingButton> */}
                </Stack>
              </FormProvider>
            </DMTCard>
            <MoneyTransferCarousel data={bannerList} />
          </PermissionGaurd>
          {/* <AddDmtRemitter/> */}
          <PermissionGaurd permission={remitterData?.message == "Success" && remitterData?.statuscode == 1000}>
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
                      <InfoBox
                        title={
                          moneyTransferType === 'dmt1'
                            ? remitterData?.data?.firstName
                            : `${remitterData?.data?.data?.fname} ${remitterData?.data?.data?.lname}`
                        }
                      />

                      <InfoBox

                        title={
                          moneyTransferType === 'dmt1'
                            ? remitterData?.data?.mobile
                            : remitterData?.data?.data?.mobile
                        }
                        boxIcon="phone"

                      />

                      <p style={{ marginLeft: "48%", marginTop: "-11%" }}>
                        <BorderColorIcon

                          style={{ width: "18px", color: "blue" }}
                          onClick={() => backToDmt()}
                        />
                      </p>
                    </Stack>

                    <Stack spacing={ismobile ? 1 : 2}>
                      <InfoBox
                        title="Limit Available"
                        boxIcon="graph"
                        value={
                          moneyTransferType === 'dmt1'
                            ? remitterData?.data?.limitTotal
                            : displayLimitInDMT2(
                              remitterData?.data?.data?.bank1_limit,
                              remitterData?.data?.data?.bank2_limit,
                              remitterData?.data?.data?.bank3_limit
                            )
                        }
                      />
                      <InfoBox
                        title="Limit Per Transaction"
                        boxIcon="graph2"
                        value={
                          moneyTransferType === 'dmt1'
                            ? remitterData?.data?.limitPerTransaction
                            : 5000
                        }
                      />
                    </Stack>
                  </Box>
                </Scrollbar>
                {/* {addRemittery && ( */}
                <AddDmtRemitter
                  otpRefDmt2={otpRefDmt2}
                  otpReferenceData={otpRef}
                  sendStatusCode={sendStatusCode}
                  mobileNumber={formValues}
                  setAddRemittery={setAddRemittery}
                  condition={addRemittery}
                  setCondition={setAddRemittery}
                  serviceType={serviceType}
                  moneyTransferType={moneyTransferType}
                />

                {/* // )} */}

                {/*  */}
                {/* Addd bene modal */}
                {/* this is used 2 times see all 2 uses */}
                {!ismobile && (
                  <BeneDialogue
                    apiEnd={moneyTransferType === 'dmt1' ? Apiendpoints.ADD_BENE_DMT1 : Apiendpoints.ADD_BENE_DMT2}
                    remMobile={remitterData?.data?.mobile}
                    mobileNumber={formValues}
                    setSendOtpRef={setSendOtpRef}
                    setOpen={setOpenHandle}
                    open={openHandle}
                    onCompleteCb={() => {
                      // after this see line 296 <OtpDialogue
                      setOpenOtp(true);
                    }}
                  />

                )}

              </RemitterCard>
              {/* this is used 2 times see all 2 uses */}
              {ismobile && (
                <BeneDialogue
                  apiEnd={Apiendpoints.ADD_BENE_DMT1}
                  remMobile={remitterData?.data?.mobile}
                  mobileNumber={formValues}
                  setSendOtpRef={setSendOtpRef}
                  setOpen={setOpenHandle}
                  open={openHandle}
                  onCompleteCb={() => {
                    // after this see line 296 <OtpDialogue
                    setOpenOtp(true);
                  }}
                />
              )}
              {/*  */}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  // mt: 0,
                  mb: 0.5,
                }}
              >
                <BeneSearch
                  cbDbValue={(searchedVal: string) => {
                    if (searchedVal) {
                      filterList(searchedVal);
                    }
                  }}
                />
                <Typography mt={4}>
                  Beneficiary list ({remitterData?.data?.beneficiaries?.length})
                </Typography>
              </Box>

              {/* ///////  mapped benes //////// */}
              <Box sx={{ height: '600px', overflowY: 'scroll' }}>
                {checklength(remitterData?.data?.beneficiaries) &&
                  (checklength(filteredList)
                    ? filteredList
                    : remitterData?.data?.beneficiaries
                  ).map((beneficiary: any, index: number) => {
                    const newBene = {
                      account: beneficiary?.account || beneficiary?.bene_acc,
                      bank: beneficiary?.bank,
                      branch: beneficiary?.branch,
                      id: moneyTransferType === 'dmt1' ? beneficiary?.id : beneficiary?.benid,
                      ifsc: beneficiary?.ifsc,
                      name: beneficiary?.name || beneficiary?.bene_name,
                      verificationStatus: beneficiary?.verificationDt || beneficiary?.status,
                    };

                    return (
                      <Stack rowGap={1} key={beneficiary.id}>
                        <BeneficiaryItem
                          beneficiary={newBene}
                          moneyTransferType={moneyTransferType}
                          remitterData={remitterData}
                          cbFunc={(bene: any, type: string) => {
                            // console.log('bene', bene);
                            console.log('type', 'print');
                            setChosenBene(bene);
                            setOpenConfirm(true);
                            setTypeOfCb(type);
                          }}
                        />
                      </Stack>
                    );
                  })}
              </Box>

            </DMTCard>
          </PermissionGaurd>

          {/* {addRemittery && ( */}
          <AddDmtRemitter
            otpRefDmt2={otpRefDmt2}
            otpReferenceData={otpRef}
            sendStatusCode={sendStatusCode}
            mobileNumber={formValues}
            condition={addRemittery}
            setCondition={setAddRemittery}
            serviceType={serviceType}
            moneyTransferType={moneyTransferType}
          />
          {/* // )} */}
        </Box>
      </Grid>
      {openConfirm && (
        // <CommonTpinDialogue
        //   title="Are You Sure"
        //   open={openConfirm}
        //   setOpenTpin={setOpenConfirm}
        //   handleClose={handleCloseTpinVerify}
        //   setTpin={setTpin}
        //   setIsApiCall={setIsApiCall}
        //   setSelectedValue={setWalletType}
        //   selectedValue={walletType}
        //   showWallet={typeOfCb === 'deleteBene' ? false : true}
        //   beneActionLoading={beneActionLoading}
        //   setBeneActionLoading={setBeneActionLoading} // Pass setBeneActionLoading function as prop
        // />
        <DeleteBeneDialog open={openConfirm} setOpen={setOpenConfirm} bene={chosenBene}

          moneyTransferType={moneyTransferType}
          remitterData={remitterData}
          chosenBene={chosenBene}
        />
      )}

      {/* <ConfirmDialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
        title={
          typeOfCb === 'deleteBene'
            ? 'Delete Beneficiary'
            : typeOfCb === 'verifyBene'
            ? 'Verify Beneficiary'
            : ''
        }
        action={
          <LoadingButton
            size="small"
            variant="contained"
            loading={beneActionLoading}
            color={
              typeOfCb === 'deleteBene'
                ? 'error'
                : typeOfCb === 'verifyBene'
                ? 'primary'
                : 'primary'
            }
            onClick={
              typeOfCb === 'deleteBene'
                ? deleteBeneApi
                : typeOfCb === 'verifyBene'
                ? VerifyBene
                : () => {}
            }
          >
            Confirm
          </LoadingButton>
        }
        content={<Typography>Are you sure!</Typography>}
      /> */}
      {(openOtp && moneyTransferType === "dmt1") && (
        <OtpDialogue
          apiEnd={
            // moneyTransferType === 'dmt1'
            //  ?
            Apiendpoints.DMI1_VALIDATE_OTP
            // : Apiendpoints.DMI2_VALIDATE_OTP

          }
          setOpenHandle={setOpenHandle}

          completeData={{ otpReference }}
          sendOtpRef={sendOtpRef}
          onCompletedCb={() => {
            setOpenOtp(false);
            setOpenConfirm(false);
            onSubmit({ mobileNumber: remitterData?.data?.mobile });
          }}
          setOpenOtp={setOpenOtp}
        />
      )}
    </Grid>
  );
};

export default DMTContainer;

function InfoBox({ title = 'Rahul Kumar', subtitle = '', value = 0, boxIcon = 'user', additionalIcon = '' }) {
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
                {currencySetter(value)}
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
