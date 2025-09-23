import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { getBbpsBillers } from 'src/redux/my-slices/bbps';
import { dispatch, useSelector } from 'src/redux/store';
import { checklength } from 'src/utils/flattenArray';
import BBPSBillers from '../bbps/BBPSBillers';
import BBPSPaymentsTab from '../bbps/BBPSPaymentsTab';

const CmsTwo = ({ value }: any) => {
  console.log(value);
  const { bbpsbillers } = useSelector((state) => state.bbps);

  useEffect(() => {
    dispatch(getBbpsBillers({ category_key: 'C13' }));

    return () => {};
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {checklength(bbpsbillers) && <BBPSBillers usedInCms />}
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            position: 'relative',
          }}
        >
          <BBPSPaymentsTab />
        </Grid>
      </Grid>
    </>
  );
};

export default CmsTwo;
