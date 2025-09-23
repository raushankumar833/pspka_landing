import React from 'react';
import { Card, Stack, Typography, styled } from '@mui/material';
import { bgBlur } from 'src/utils/cssStyles';
import moment from 'moment';
import SvgColor from 'src/components/svg-color';
import { StyledIcon } from 'src/components/nav-section/vertical/styles';
import { notiColors } from './NotificationsContainer';

const StyledRoot = styled(Stack)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  margin: theme.spacing(2, 0, 0, 0),
  padding: theme.spacing(0, 0, 0, 1),
}));

const StyledCard = styled(Card)<any>(({ theme, priority = 'warning' }) => ({
  width: '100%',
  borderRadius: 2,
  boxShadow: 'none',
  padding: theme.spacing(1, 0.5, 1, 1),
  ...bgBlur({
    color: theme.palette[priority].light,
    opacity: 0.35,
  }),
}));

type props = {
  noti: any;
};

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/notification/${name}.svg`} sx={{ width: 0.9, height: 0.9 }} />
);
const NotificationItem = ({ noti }: props) => (
  <StyledRoot>
    {/* <Badge
        variant="dot"
        color="secondary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
      </Badge> */}
    <StyledCard priority={notiColors[noti.priority as keyof typeof notiColors]}>
      <Stack flexDirection={'row'} alignItems={'center'}>
        <StyledIcon color={notiColors[noti.priority as keyof typeof notiColors]}>
          {icon('speaker')}
        </StyledIcon>
        <Stack>
          <Typography fontSize={12} textTransform="capitalize" fontWeight="bold">
            {noti?.message}
          </Typography>
          <Typography fontSize={11} color={'text.secondary'}>
            {moment(noti?.created_at).format('DD MMM YYYY | hh:MM a')}
          </Typography>
        </Stack>
      </Stack>
    </StyledCard>
  </StyledRoot>
);

export default NotificationItem;
