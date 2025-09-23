import { Box, Button, Card, Stack, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import Iconify from 'src/components/iconify/Iconify';
import { CARD } from 'src/config';
import useResponsive from 'src/hooks/useResponsive';
import { bgBlur } from 'src/utils/cssStyles';
import { iconStyle1 } from '../dmt/BeneficiaryItem';

const BeneficiaryCard = styled(Card)<any>(({ theme, priority = 'warning' }) => ({
  width: '100%',
  display: 'flex',
  boxShadow: 'none',
  position: 'relative',
  borderRadius: CARD.RADIUS_10,
  border: `1px solid ${theme.palette.grey[300]}`,
  ...bgBlur({
    color: theme.palette.common.white,
    blur: 5,
    opacity: 0.25,
  }),
  margin: theme.spacing(1, 'auto'),
  padding: theme.spacing(0, 2, 0, 0),
}));

const BeneficiaryItem = ({ isAccount = false }) => {
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
      <PermissionGaurd permission={!ismobile ? true : false}>
        <Box sx={boxStyle}>
          <Typography fontSize={52} color="white">
            A
          </Typography>
        </Box>
        <DesktopData isAccount={isAccount} />
      </PermissionGaurd>
      <PermissionGaurd permission={ismobile ? true : false}>
        <Box sx={boxStyle}>
          <Typography fontSize={42} color="white">
            A
          </Typography>
        </Box>
        <MobileData isAccount={isAccount} />
      </PermissionGaurd>
      {/* DELETE BENEFICIARY BUTTON */}
      <Box sx={iconStyle1}>
        <Iconify icon="line-md:close-circle" color="red" />
      </Box>
    </BeneficiaryCard>
  );
};

export default BeneficiaryItem;

function DesktopData({ isAccount = false }) {
  return (
    <Stack display="flex" flexDirection="row" justifyContent="space-between" width="100%">
      <Stack pl={4} spacing={1} flexDirection={'column'} justifyContent={'center'}>
        <Typography variant="body1">Name</Typography>
        <Typography variant="body2">Miss Pooja Nath</Typography>
      </Stack>
      <Stack spacing={1} flexDirection={'column'} justifyContent={'center'}>
        <Typography variant="body1">Bank</Typography>
        <Typography variant="body2">Global IME Bank</Typography>
      </Stack>
      <Stack spacing={1} flexDirection={'column'} justifyContent={'center'}>
        <Typography variant="body1">Account No</Typography>
        <Typography variant="body2">31771239202</Typography>
      </Stack>
      <Stack spacing={1} flexDirection={'column'} justifyContent={'center'}>
        <Typography variant="body1">Mobile No</Typography>
        <Typography variant="body2">9999554460</Typography>
      </Stack>
      <Stack spacing={1} flexDirection={'column'} justifyContent={'center'}>
        <Typography variant="body1">Relation</Typography>
        <Typography variant="body2"> </Typography>
      </Stack>
      <Stack spacing={1} flexDirection={'column'} justifyContent={'center'}>
        {isAccount ? (
          <Button color="success" variant="contained">
            Account
          </Button>
        ) : (
          <Button color="success" variant="contained">
            Cash
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
function MobileData({ isAccount = false }) {
  return (
    <Stack
      sx={{
        ml: 1,
        p: 0.5,
      }}
    >
      <Typography variant="caption">Miss Pooja Nath</Typography>
      <Typography variant="caption">+91-9999445520</Typography>
      <Typography variant="caption">Global IME Bank</Typography>
      <Typography variant="caption">31771239202</Typography>
      <Stack mt={0.5} columnGap={1} flexDirection={'row'}>
        {isAccount ? (
          <Button size="small" variant="contained" color="success">
            Account
          </Button>
        ) : (
          <Button size="small" variant="contained" color="success">
            Cash
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
