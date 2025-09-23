import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Stack, Typography, styled } from '@mui/material';
import { CARD } from 'src/config';
import { useSelector } from 'src/redux/store';

import PermissionGaurd from 'src/auth/PermissionGaurd';
import useResponsive from 'src/hooks/useResponsive';
import BeneficiaryItem from './dmt/BeneficiaryItem';
import { capitalize } from 'src/utils/textUtil';
import BeneDialogue from './dmt/BeneDialogue';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from '../../../utils/Apiendpoints';
import { apiErrorToast, okSuccessToast } from 'src/utils/toastFire';
import MyLoader from 'src/components/loading-screen/MyLoader';
import OtpDialogue from 'src/components/otp/OtpDialogue';
import { checklength } from 'src/utils/flattenArray';
import { useSnackbar } from '../../../components/snackbar';
import BeneSearch from 'src/components/money-transfer/BeneSearch';
import CommonTpinDialogue from 'src/components/tpin/CommonTpinDialogue';
import { useAuthContext } from 'src/auth/useAuthContext';
// import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { PATTERNS } from 'src/utils/validation';
// import CardTitle from 'src/components/card/CardTitle';
// import FormProvider from 'src/components/hook-form/FormProvider';
// import { RHFTextField } from 'src/components/hook-form';
// import AddCustomerDialog from './nepal/AddCustomerDialog';
// type FormValuesProps = {
//   mobile: string;
// };

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

// component start
const VendorContainer = ({ vendorsData, isLoading, getVendors }: any) => {
  // console.log('vendorsData', vendorsData);
  // console.log('setVendorsData', setVendorsData);
  const { user } = useAuthContext();

  const ismobile = useResponsive('down', 'md');
  const { moneyTransferType } = useSelector((state: any) => state.recharge_bills);
  const { enqueueSnackbar } = useSnackbar();
  const [tpin, setTpin] = useState("");
  const [walletType, setWalletType] = useState('w1');
  const [isApiCall, setIsApiCall] = useState(false);

  // OPEN MODELS
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);

  // DATAS
  const [chosenVendor, setChosenVendor] = useState<any>({});
  const [typeOfCb, setTypeOfCb] = useState('');
  // const [otpReference, setOtpReference] = useState('');
  // console.log('chosenVendor', chosenVendor);
  const [filteredList, setFilteredList] = useState([]);
  // const [addCustomer, setAddCustomer] = useState(false);
  // const [showCustomer, setShowCustomer] = useState(false);
  // LOADINGS
  const [beneActionLoading, setBeneActionLoading] = useState(false);
  // const defaultValues = {
  //   mobile: '',
  //   amount: '',
  //   operator: '',
  // };
  // const Schema = Yup.object().shape({
  //   mobile: Yup.string()
  //     .required('Mobile is required')
  //     .matches(PATTERNS.MOBILE, 'Invalid mobile number'),
  // });
  // const methods = useForm<FormValuesProps>({
  //   resolver: yupResolver(Schema),
  //   defaultValues
  // });

  // const { handleSubmit, watch } = methods;
  // React.useEffect(() => {
  //   const subscription = watch((value: any) => {
  //     onSubmit(value)
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  // const onSubmit = (data: any) => {

  //   setShowCustomer(true)

  // };

  const handleCloseTpinVerify = () => {
    setOpenConfirm(false);
  };
  // // delete api call of bene
  const deleteVendorApi = () => {
    postJsonData(
      moneyTransferType === 'vp' ? Apiendpoints.DELETE_VENDOR : '',

      {
        vendorId: chosenVendor?.id,
      },
      setBeneActionLoading,
      (res) => {
        enqueueSnackbar(res?.data?.message);
        setOpenConfirm(false);
        if (getVendors) getVendors();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const VerifyBene = () => {
    const data = {
      acc_number: chosenVendor?.account,
      ifsc: chosenVendor?.ifsc,
      param1: user.username,
      name: chosenVendor?.name,
      tpin: tpin,
      wallet: walletType,
      pf: 'web',
      latitude: '12.9716',
      longitude: '77.5946',
    };

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
        console.log("errr", err.data);

        apiErrorToast(err);
        setBeneActionLoading(false);
        handleCloseTpinVerify()// Set loading to false after error
      }
    );
  };
  // filter the list function
  const filterList = (value: string) => {
    if (value === 'empty') {
      setFilteredList([]);
    } else if (checklength(vendorsData?.data)) {
      let filteredList = [];
      filteredList = vendorsData?.data.filter((item: any) => {
        if (
          item?.name?.toLowerCase().includes(value?.toLowerCase()) ||
          item?.account_number?.toLowerCase().includes(value?.toLowerCase())
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
  };
  console.log("vendorsData----", vendorsData);

  useEffect(() => {
    if (isApiCall) {
      if (typeOfCb == "verifyBene") {
        VerifyBene()
      } else {
        deleteVendorApi()
      };
      setIsApiCall(false); // Reset isApiCall after API call
    }
  }, [isApiCall]);


  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={12}>
        <Box
          sx={{
            width: '100%',
            margin: '0 auto',
          }}
        >


          <MyLoader loading={isLoading} />

          <PermissionGaurd
            permission={vendorsData?.statuscode == 1000 && checklength(vendorsData?.data)}
          >
            {/* SHOW THIS COMPONENT AFTER FETCHING Vendor DATA */}
            <DMTCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '30px' }}>
                  {capitalize(moneyTransferType === 'vp' ? 'Vendor payments' : 'Super transfer')}
                </Typography>
                {/* this is used 4 times see all 4 uses */}
                {!ismobile && (
                  // <BeneDialogue
                  //   variant="contained"
                  //   title="Add New Vendor"
                  //   apiEnd={Apiendpoints.ADD_VENDORS}
                  //   onCompleteCb={() => {
                  //     if (getVendors) getVendors();
                  //   }}
                  // />
                  '--'
                )}
                {/* this is used 4 times see all 4 uses */}
                {ismobile && (
                  // <BeneDialogue
                  //   variant="contained"
                  //   apiEnd={Apiendpoints.ADD_VENDORS}
                  //   mobileNumber={},
                  //   setSendOtpRef={},
                  //   title="Add New Vendor"
                  //   onCompleteCb={() => {
                  //     if (getVendors) getVendors();
                  //   }}
                  // />
                  '--'
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  mt: 2.5,
                  mb: 0.5,
                }}
              >
                <BeneSearch
                  title="Search vendors..."
                  cbDbValue={(searchedVal: string) => {
                    if (searchedVal) {
                      filterList(searchedVal);
                    }
                  }}
                />
                <Typography sx={{ fontSize: '18px' }}>
                  Vendors list ({vendorsData?.data.length})
                </Typography>
              </Box>

              {/* ///////  mapped benes //////// */}
              <Box sx={{ height: '600px', overflowY: 'scroll' }}>
                {checklength(vendorsData?.data) &&
                  (checklength(filteredList) ? filteredList : vendorsData?.data).map(
                    (beneficiary: any, index: number) => {
                      const newBene = {
                        account: beneficiary?.account_number,
                        bank: beneficiary?.bank,
                        type: beneficiary?.type,
                        id: beneficiary?.id,
                        ifsc: beneficiary?.ifsc,
                        name: beneficiary?.name,
                        status: beneficiary?.status,
                      };

                      // console.log('newBene', newBene);

                      return (
                        <Stack rowGap={1} key={beneficiary.id}>
                          <BeneficiaryItem
                            beneficiary={newBene}
                            moneyTransferType={moneyTransferType}
                            // remitterData={remitterData}
                            cbFunc={(vendor: any, type: string) => {
                              setChosenVendor(vendor);
                              setTypeOfCb(type);
                              setOpenConfirm(true);
                            }}
                          />
                        </Stack>
                      );
                    }
                  )}
              </Box>
            </DMTCard>
          </PermissionGaurd>


          <PermissionGaurd
            permission={vendorsData?.statuscode == 1000 && !checklength(vendorsData?.data)}
          >
            <DMTCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '30px' }}>
                  {capitalize(moneyTransferType === 'vp' ? 'Vendor payments' : 'Super transfer')}
                </Typography>
                {/* this is used 4 times see all 4 uses */}
                {!ismobile && (
                  <BeneDialogue
                    variant="contained"
                    title="Add New Vendor"
                    apiEnd={Apiendpoints.ADD_VENDORS}
                    onCompleteCb={() => {
                      if (getVendors) getVendors();
                    }}
                  />
                )}

                {/* this is used 4 times see all 4 uses */}
                {ismobile && (
                  <BeneDialogue
                    variant="contained"
                    title="Add New Vendor"
                    apiEnd={Apiendpoints.ADD_VENDORS}
                    onCompleteCb={() => {
                      if (getVendors) getVendors();
                    }}
                  />
                )}
              </Box>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography sx={{ fontSize: '30px' }}>No vendors found</Typography>
              </div>
            </DMTCard>
          </PermissionGaurd>
        </Box>
      </Grid>
      {openConfirm && (
        <CommonTpinDialogue
          title="Are You Sure"
          open={openConfirm}
          setOpenTpin={setOpenConfirm}
          handleClose={handleCloseTpinVerify}
          setTpin={setTpin}
          setIsApiCall={setIsApiCall}
          setSelectedValue={setWalletType}
          selectedValue={walletType}
          showWallet={typeOfCb === 'deleteBene' ? false : true}
          beneActionLoading={beneActionLoading}
          setBeneActionLoading={setBeneActionLoading} // Pass setBeneActionLoading function as prop
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
            loading={deleteBeneLoading}
            color={
              typeOfCb === 'deleteBene'
                ? 'error'
                : typeOfCb === 'verifyBene'
                ? 'primary'
                : 'primary'
            }
            onClick={
              typeOfCb === 'deleteBene'
                ? deleteVendorApi
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
      {openOtp && (
        <OtpDialogue
          apiEnd={
            moneyTransferType === 'dmt1'
              ? Apiendpoints.DMI1_VALIDATE_OTP
              : Apiendpoints.DMI2_VALIDATE_OTP
          }
          // completeData={{ otpReference }}
          onCompletedCb={() => {
            setOpenOtp(false);
            setOpenConfirm(false);
          }}
          setOpenOtp={setOpenOtp}
        />
      )}
    </Grid>
  );
};

export default VendorContainer;
