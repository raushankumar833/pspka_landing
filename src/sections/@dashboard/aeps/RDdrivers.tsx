import React, { useMemo } from 'react';
import { CwCard } from './CashWithdrawal';
import CardTitle from 'src/components/card/CardTitle';
import { Box, Button, Typography } from '@mui/material';

const RDdrivers = () => {
  const arr = useMemo(
    () => [
      {
        title: 'MANTRA',
        onclick: () =>
          window.open('http://download.mantratecapp.com/Forms/DownLoadFiles', '_blank'),
      },
      {
        title: 'STARTEK',
        onclick: () => window.open('https://acpl.in.net/RdService.html', '_blank'),
      },
      {
        title: 'MORPHO',
        onclick: () => window.open('https://rdserviceonline.com/', '_blank'),
      },
    ],
    []
  );
  return (
    <CwCard>
      <CardTitle title="RD Service Drivers" />
      <>
        <Box
          columnGap={2}
          sx={{
            display: 'flex',
            justifyContent: 'left',
            mt: 2,
          }}
        >
          {arr.map((item, index) => (
            <Button key={index} onClick={item.onclick} variant="contained" sx={btnStyle}>
              {item.title}
            </Button>
          ))}
        </Box>
        <Typography sx={{ mt: 3 }}>
          <span style={{ fontWeight: 'bold', color: '#DC5F5F' }}>Step1: </span>
          After successfully registering your device, copy & paste the below link in your Chrome
          browser: chrome://flags/#allow-insecure-localhost
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <span style={{ fontWeight: 'bold', color: '#DC5F5F' }}>Step2: </span>
          Click on "Enable" and re-launch Chrome browser.
        </Typography>
      </>
    </CwCard>
  );
};

export default RDdrivers;

const btnStyle = {
  backgroundColor: '#dc5f5f25',
  color: '#DC5F5F',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#DC5F5F',
    color: '#fff',
  },
};
