import React, { useState } from 'react';
import { Box, Card, Grid, Stack, Typography, styled } from '@mui/material';
import { CARD } from 'src/config';
import { useSelector } from 'src/redux/store';

import PermissionGaurd from 'src/auth/PermissionGaurd';
import useResponsive from 'src/hooks/useResponsive';
import { capitalize } from 'src/utils/textUtil';
import BeneDialogue from './upi/BeneDialogue';
import { LoadingButton } from '@mui/lab';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from '../../../utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
import MyLoader from 'src/components/loading-screen/MyLoader';
import ConfirmDialog from 'src/components/confirm-dialog';
import OtpDialogue from 'src/components/otp/OtpDialogue';
import { checklength } from 'src/utils/flattenArray';
import { useSnackbar } from '../../../components/snackbar';
import UpiBeneficiaryItem from './upi/UpiBeneficiaryItem';
import BeneSearch from 'src/components/money-transfer/BeneSearch';

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
const UpiContainer = ({ vendorsData, isLoading, getVendors }: any) => {
  // console.log('vendorsData', vendorsData);
  // console.log('setVendorsData', setVendorsData);

  const ismobile = useResponsive('down', 'md');
  const { moneyTransferType } = useSelector((state) => state.recharge_bills);
  const { enqueueSnackbar } = useSnackbar();

  // console.log('moneyTransferType', moneyTransferType);

  // OPEN MODELS
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);

  // DATAS
  const [chosenBene, setChosenBene] = useState<any>({});
  const [typeOfCb, setTypeOfCb] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  // const [otpReference, setOtpReference] = useState('');
  // console.log('chosenBene', chosenBene);
  // console.log('filteredList', filteredList);

  // LOADINGS

  const [deleteBeneLoading, setDeleteBeneLoading] = useState(false);

  // delete api call of bene
  const deleteBeneApi = () => {
    postJsonData(
      moneyTransferType === 'upi' ? Apiendpoints.DELETE_VENDOR : '',

      {
        vendorId: chosenBene?.id,
      },
      setDeleteBeneLoading,
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

  // verify bene func
  const VerifyBene = () => {
    const data = {
      accountNumber: chosenBene?.account,
      ifscCode: chosenBene?.ifsc,
      pf: 'web',
      latitude: '12.9716',
      longitude: '77.5946',
    };
    postJsonData(
      Apiendpoints.DMT1_VERIFY_BENE,
      data,
      setDeleteBeneLoading,
      (res) => {
        console.log('rsp', res.data);
        // setOtpReference(res?.data?.data?.otpReference);
        // setOpenOtp(true);
      },
      (err) => {
        apiErrorToast(err);
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
                  {capitalize(moneyTransferType === 'upi' ? 'UPI Transfer' : '')}
                </Typography>
                {/* this is used 4 times see all 4 uses */}
                {!ismobile && (
                  <BeneDialogue
                  // variant="contained"
                  // title="Add Beneficiary"
                  // apiEnd={Apiendpoints.ADD_VENDORS}
                  // remMobile={vendorsData?.data?.mobile}
                  // onCompleteCb={() => {
                  //   if (getVendors) getVendors();
                  // }}
                  />
                )}
                {/* this is used 4 times see all 4 uses */}
                {ismobile && (
                  <BeneDialogue
                  // variant="contained"
                  // apiEnd={Apiendpoints.ADD_VENDORS}
                  // title="Add Beneficiary"
                  // remMobile={vendorsData?.data?.mobile}
                  // onCompleteCb={() => {
                  //   if (getVendors) getVendors();
                  // }}
                  />
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
                  cbDbValue={(searchedVal: string) => {
                    if (searchedVal) {
                      filterList(searchedVal);
                    }
                  }}
                />
                <Typography sx={{ fontSize: '18px' }}>
                  Beneficiary list ({vendorsData?.data.length})
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
                      return (
                        <Stack rowGap={1} key={beneficiary.id}>
                          <UpiBeneficiaryItem
                            beneficiary={newBene}
                            cbFunc={(bene: any, type: string) => {
                              setChosenBene(bene);
                              setOpenConfirm(true);
                              setTypeOfCb(type);
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
                  {capitalize(moneyTransferType === 'upi' ? 'UPI Transfer' : '')}
                </Typography>
                {/* this is used 4 times see all 4 uses */}
                {!ismobile && (
                  <BeneDialogue
                  // variant="contained"
                  // title="Add Beneficiary"
                  // // same api as of vendor payments
                  // apiEnd={Apiendpoints.ADD_VENDORS}
                  // onCompleteCb={() => {
                  //   if (getVendors) getVendors();
                  // }}
                  />
                )}
                {/* this is used 4 times see all 4 uses */}
                {ismobile && (
                  <BeneDialogue
                  // variant="contained"
                  // title="Add Beneficiary"
                  // // same api as of vendor payments
                  // apiEnd={Apiendpoints.ADD_VENDORS}
                  // onCompleteCb={() => {
                  //   if (getVendors) getVendors();
                  // }}
                  />
                )}
              </Box>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography sx={{ fontSize: '30px' }}>No Beneficiary's found</Typography>
              </div>
            </DMTCard>
          </PermissionGaurd>
        </Box>
      </Grid>
      <ConfirmDialog
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
                ? deleteBeneApi
                : typeOfCb === 'verifyBene'
                  ? VerifyBene
                  : () => { }
            }
          >
            Confirm
          </LoadingButton>
        }
        content={<Typography>Are you sure!</Typography>}
      />
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

export default UpiContainer;
