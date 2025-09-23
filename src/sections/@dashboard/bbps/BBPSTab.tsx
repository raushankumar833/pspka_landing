import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { dispatch, useSelector } from 'src/redux/store';
import BBPSCategory from './BBPSCategory';
import { getBbpsBillers } from 'src/redux/my-slices/bbps';
import { checklength } from 'src/utils/flattenArray';
import BBPSBillers from './BBPSBillers';
import BBPSPaymentsTab from './BBPSPaymentsTab';

const BBPSTab = ({serviceSubType}:any) => {
  const { selectedCategory, bbpsbillers } = useSelector((state) => state.bbps);

  useEffect(() => {
    if (selectedCategory?.categoryKey)
      dispatch(getBbpsBillers({ category_key: selectedCategory.categoryKey }));

    return () => {};
  }, [selectedCategory]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {!checklength(bbpsbillers) && <BBPSCategory />}
          {checklength(bbpsbillers) && <BBPSBillers />}
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            position: 'relative',
          }}
        >
          <BBPSPaymentsTab serviceSubType={serviceSubType}/>
        </Grid>
      </Grid>
    </>
  );
};

export default BBPSTab;
