import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define the marquee animation
const marquee = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Marquee = ({ text }:any) => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
      }}
    >
      <Typography
        component="span"
        sx={{
          display: 'inline-block',
          paddingRight: '100%', // Ensure there's enough space at the end
          animation: `${marquee} 20s linear infinite`,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Marquee;
