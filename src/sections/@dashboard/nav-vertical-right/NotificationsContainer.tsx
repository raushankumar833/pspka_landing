import React, { useEffect, useState } from 'react';
import { CARD } from 'src/config';
import Scrollbar from 'src/components/scrollbar';
import NotificationItem from './NotificationItem';
import { Card, Stack, Typography, styled } from '@mui/material';
import { myAxios } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { checklength } from 'src/utils/flattenArray';

export const notiColors = {
  high: 'error',
  medium: 'warning',
  low: 'primary',
};

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: CARD.RADIUS,
  margin: theme.spacing(2, 0, 0, 0),
  padding: theme.spacing(2, 2, 2, 2),
}));

const NotificationsContainer = () => {
  const [notificationLoading, setNotificationLoading] = useState(false);
  console.log(notificationLoading);
  // console.log('notificationLoading', notificationLoading);

  const [notiData, setNotiData] = useState([]);
  const getNotifications = async () => {
    setNotificationLoading(true);
    try {
      const res = await myAxios.get(Apiendpoints.GET_NOTIFICATIONS);
      // console.log('log', res?.data?.data);
      const notificationByApi = res?.data?.data;

      setNotiData(notificationByApi);
      setNotificationLoading(false);
    } catch (error) {
      setNotificationLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <StyledCard>
      <Typography variant="h6" fontWeight={'normal'}>
        Notifications
      </Typography>
      <Scrollbar>
        <Stack width={'100%'}>
          {checklength(notiData) &&
            notiData.map((noti, i) => <NotificationItem key={i} noti={noti} />)}
        </Stack>
      </Scrollbar>
    </StyledCard>
  );
};

export default NotificationsContainer;
