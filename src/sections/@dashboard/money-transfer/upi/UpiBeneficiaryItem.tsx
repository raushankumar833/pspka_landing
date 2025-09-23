import { Box, Button, Card, Grid, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import Iconify from 'src/components/iconify/Iconify';
import { CARD } from 'src/config';
import useResponsive from 'src/hooks/useResponsive';

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

const UpiBeneficiaryItem = ({ beneficiary, cbFunc }: any) => {
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
      <DesktopData data={beneficiary} cbFunc={cbFunc} ismobile={ismobile} />

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
    </BeneficiaryCard>
  );
};

export default UpiBeneficiaryItem;

function DesktopData({ data, cbFunc, ismobile }: any) {
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

        <Button
          color="success"
          variant="contained"
          size="small"
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
          <img
            src="/assets/icons/payments/upi.svg"
            style={{ marginLeft: '5px' }}
            width="80%"
            alt="imps"
          />
        </Button>
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
