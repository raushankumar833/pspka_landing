import { Card, Stack, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbar from 'src/components/scrollbar';
import { CARD } from 'src/config';
import RecentActivityItem from './RecentActivityItem';

import { Apiendpoints } from 'src/utils/Apiendpoints';
import { myAxios } from 'src/utils/axiosController';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: CARD.RADIUS,
  margin: theme.spacing(2, 0, 0, 0),
  padding: theme.spacing(2),
  height: CARD.H_400,
}));

const RecentActivity = () => {
  const [RecentActivityLoding, setRecentLoading] = useState(false);
  console.log(RecentActivityLoding);
  // console.log('RecentActivityLoding', RecentActivityLoding);

  const [activityData, setRecentData] = useState([]);
  const getNotifications = async () => {
    setRecentLoading(true);
    try {
      const res = await myAxios.get(Apiendpoints.GET_RECENT_ACTIVITY);
      // console.log('log', res?.data?.data);
      const notificationByApi = res?.data?.data;

      setRecentData(notificationByApi);
      setRecentLoading(false);
    } catch (error) {
      setRecentLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  
  return (
    <StyledCard>
      <Typography variant="h6" fontWeight="normal">
        Recent Activity
      </Typography>
      <Scrollbar>
        <Stack width={'100%'} spacing={2}>
          {activityData.map((app, i) => (
            <RecentActivityItem key={i} app={app} />
          ))}
        </Stack>
      </Scrollbar>
    </StyledCard>
  );
};

export default RecentActivity;
