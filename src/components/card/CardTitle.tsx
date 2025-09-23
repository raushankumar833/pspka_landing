/* eslint-disable arrow-body-style */
import { Typography } from '@mui/material';
import React from 'react';

const CardTitle = ({ title = '', sx }: any) => {
  return (
    <Typography variant="h6" fontWeight={'bold'} sx={{ ...sx }}>
      {title}
    </Typography>
  );
};

export default CardTitle;
