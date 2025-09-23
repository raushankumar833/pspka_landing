import { Box, Button, Card, Grid, Typography, styled, useTheme } from '@mui/material';
// import { user } from '@nextui-org/theme';
import React, { useState } from 'react';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import { useAuthContext } from 'src/auth/useAuthContext';
// import { useAuthContext } from 'src/auth/useAuthContext';
import DmtAmountDialogue from 'src/components/dmt/DmtAmountDialogue';
import Iconify from 'src/components/iconify/Iconify';
import { CARD } from 'src/config';
import useResponsive from 'src/hooks/useResponsive';
import { Apiendpoints } from 'src/utils/Apiendpoints';

// import { bgBlur } from 'src/utils/cssStyles';

const BeneficiaryCard = styled(Card)<any>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  boxShadow: 'none',
  position: 'relative',
  borderRadius: CARD.RADIUS_10,
  border: `1px solid ${theme.palette.grey[300]}`,
  // ...bgBlur({
  //   color: theme.palette.common.white,
  //   blur: 5,
  //   opacity: 0.25,
  // }),
  margin: theme.spacing(1, 'auto'),
  padding: theme.spacing(0, 2, 0, 0),
}));

const BeneficiaryItem = ({ beneficiary, cbFunc, moneyTransferType, remitterData }: any) => {
  const theme = useTheme();
  const ismobile = useResponsive('down', 'md');
  const boxStyle = {
    width: ismobile ? '70px' : '90px',
    height: ismobile ? 'auto' : '90px',
    background: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <BeneficiaryCard>
      <Box sx={boxStyle}>
        <Typography fontSize={52} color="white">
          {beneficiary?.name.charAt(0)}
        </Typography>
      </Box>
      <DesktopData data={beneficiary} cbFunc={cbFunc} ismobile={ismobile} moneyTransferType={moneyTransferType} remitterData={remitterData} />

      {/* DELETE BENEFICIARY BUTTON */}
      <Box sx={iconStyle1}>
        <Iconify
          icon="line-md:close-circle"
          color="red"
          onClick={() => {
            if (cbFunc) cbFunc(beneficiary, 'deleteBene');
          }}
        />
      </Box>
    </BeneficiaryCard >
  );
};

export default BeneficiaryItem;

function DesktopData({ data, cbFunc, ismobile, moneyTransferType, remitterData }: any) {
  const [fdata, setFdata] = useState(false);
  const { user } = useAuthContext();

  // const {wallet} = useAuthContext()
  // const [showWallet, setShowWallet] = useState(false)

  const OpenTpinDialogue = (mop: string) => {
    data.mop = mop;
    data.param1 = moneyTransferType == "dmt1" ? remitterData?.data?.mobile : moneyTransferType == "dmt2" ? remitterData?.data?.data?.mobile : user.username;
    setFdata(true)
    // return (
    //   <TPINDialogue
    //         apiEnd={Apiendpoints.DMT1_MONEY_TRANSFER}
    //         completeData={fdata}
    //         showWallet
    //         setOpenTpin={setFData}
    //       />
    // )
  }

  console.log("moneyTransferType", moneyTransferType);


  return (
    <Grid container justifyContent="space-between" width="100%" alignItems="center">
      <PermissionGaurd permission={!ismobile ? true : false}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Box sx={{ pl: 3 }}>
            <Typography variant="body1">Name</Typography>
            <Typography variant="body2" className="text_wrap">
              {data?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2.5} md={2.5} lg={2.5}>
          <Typography variant="body1">Account No</Typography>
          <Typography variant="body2">{data?.account}</Typography>
        </Grid>
        <Grid item xs={12} sm={2} md={2} lg={2}>
          <Typography variant="body1">IFSC</Typography>
          <Typography variant="body2">{data?.ifsc}</Typography>
        </Grid>
      </PermissionGaurd>
      <PermissionGaurd permission={!ismobile ? false : true}>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{ py: 1.5, pl: 3, display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant="caption">{data?.name}</Typography>
          <Typography variant="caption">{data?.account}</Typography>
          <Typography variant="caption">{data?.ifsc}</Typography>
        </Grid>
      </PermissionGaurd>
      <Grid
        item
        xs={12}
        sm={8}
        md={4.5}
        lg={4.5}
        sx={{
          display: 'flex',
          flexDirection: { lg: 'row', md: 'column', sm: 'row', xs: 'column' },
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'blue',
          pt: 0,
          pb: { md: 0, sm: 1.5, xs: 1.5 },
        }}
      >
        {data?.verificationStatus ? (
          <Box
            sx={{
              mr: 2,
              mb: { lg: 0, md: 1, xs: 1 },
              maxWidth: '100px',
              minWidth: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Iconify icon="mdi:verified" style={{ color: 'green', margin: '0 5px' }} />{' '}
            <span style={{ color: 'green', fontWeight: '600' }}>Verified</span>
          </Box>
        ) : (
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              if (cbFunc) cbFunc(data, 'verifyBene');
            }}
            size="small"
            sx={{ mr: 2, mb: { lg: 0, md: 1, xs: 1 }, maxWidth: '100px', minWidth: '100px' }}
          >
            Verify
          </Button>
        )}

        <Button
          color="info"
          variant="contained"
          size="small"
          onClick={() => OpenTpinDialogue('NEFT')}
          sx={{
            mr: 2,
            mb: { lg: 0, md: 1, xs: 1 },
            fontStyle: 'italic',
            maxWidth: '100px',
            minWidth: '100px',
            background: '#cbe5a9',
            color: '#000',
            '&:hover': {
              borderColor: '#b8db85',
              background: '#b8db85',
            },
          }}
        >
          NEFT
          <img
            src="/assets/icons/payments/neft_icon.svg"
            style={{ marginLeft: '5px' }}
            width="30%"
            alt="neft"
          />
        </Button>
        <Button
          color="success"
          variant="contained"
          size="small"
          onClick={() => OpenTpinDialogue('IMPS')}
          sx={{
            mr: 2,
            mb: { lg: 0, md: 1, xs: 1 },
            fontStyle: 'italic',
            maxWidth: '100px',
            minWidth: '100px',
            background: '#fcd3b5',
            color: '#000',
            '&:hover': {
              borderColor: '#fbc7a1',
              background: '#fbc7a1',
            },
          }}
        >
          IMPS
          <img
            src="/assets/icons/payments/imps_icon.svg"
            style={{ marginLeft: '5px' }}
            width="28%"
            alt="imps"
          />
        </Button>
        {fdata && (
          <DmtAmountDialogue
            apiEnd={
              moneyTransferType === "dmt1" ? Apiendpoints.DMT1_MONEY_TRANSFER :
                moneyTransferType === "dmt2" ? Apiendpoints.DMT2_MONEY_TRANSFER :
                  moneyTransferType === "vp" ? Apiendpoints.VENDOR_PAYMENT :
                    null // Provide a default value or handle this case as needed
            }
            completeData={data}
            remData={remitterData}
            moneyTransferType={moneyTransferType}
            showWallet
            setOpenTpin={setFdata}
          />
        )}
      </Grid>
    </Grid>
  );
}
//
export const iconStyle1 = {
  top: 0,
  right: 0,
  position: 'absolute',
  '&:hover': {
    cursor: 'pointer',
  },
};
