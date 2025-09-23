import React, { useState } from 'react';
import { Grid, Stack, Typography, CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import PermissionGaurd from 'src/auth/PermissionGaurd';
const EmptyContent = dynamic(() => import('../empty-content/EmptyContent'));

const NoData = () => {
  const [timer, setTimer] = useState(true);

  setTimeout(() => {
    setTimer(false);
  }, 100);

  return (
    <>
      <PermissionGaurd permission={!timer}>
        <Grid container>
          <Stack flexGrow={1} justifyContent="center">
            <EmptyContent
              img="/assets/illustrations/illustration_empty_data.jpg"
              title="No record found"
              description="Data is Empty or Try Adjusting the filters!"
            />
          </Stack>
        </Grid>
      </PermissionGaurd>
      <PermissionGaurd permission={timer}>
        <Typography
          variant="h4"
          sx={{
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          <CircularProgress />
          Please Wait . . .
        </Typography>
      </PermissionGaurd>
    </>
  );
};

export default NoData;
