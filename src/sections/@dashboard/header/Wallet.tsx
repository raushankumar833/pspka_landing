import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { StyledIcon } from 'src/components/nav-section/vertical/styles';
import SvgColor from 'src/components/svg-color';
import { currencySetter } from 'src/utils/currencyUtil';

// eslint-disable-next-line arrow-body-style
const Wallet = ({
  title = 'W-1 Balance',
  icon = 'wallet1',
  balance = 50559.33,
  bgColor = '#ffffff40',
}) => (
  <>
    <Stack flexDirection="row" alignItems="center">
      <Box
        sx={{
          background: bgColor,
          borderRadius: 50,
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mr: 1,
        }}
      >
        <WalletIcon icon={icon} />{' '}
      </Box>
      <Stack>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="body1">{currencySetter(balance)}</Typography>
      </Stack>
    </Stack>
  </>
);

export default Wallet;

export function WalletIcon({ icon = 'ic_nepal' }) {
  return (
    <StyledIcon
      color="white"
      sx={{
        marginRight: 0,
      }}
    >
      <SvgColor src={`/assets/icons/header/${icon}.svg`} sx={{ width: 1, height: 1 }} />
    </StyledIcon>
  );
}
