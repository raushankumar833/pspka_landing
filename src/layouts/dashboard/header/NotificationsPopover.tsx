// import { noCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  // Avatar,
  // Tooltip,
  Divider,
  // IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
// import { _notifications } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
import AllNotifications from './AllNotifications';
import { NotificationInterface } from 'src/@types/notifications';
import { getRequest, patchJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(Array<NotificationInterface>);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  // const [showBadge, setShowBadge] = useState(true);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [totalUnRead, setTotalUnread] = useState(0)

  // setTotalUnread = notifications.filter((item) => item.is_read === 0).length;

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    console.log(loading)
    // setShowBadge(false);
    // getNotifications()
    markAllRead()
    // getNotifications()
    // const newTotal = notifications.filter((item) => item.is_read === 0).length
    setTotalUnread(0);
    setOpenPopover(event.currentTarget);
  }
  // getRequest(
  //   'transaction/latestTransaction',
  //   setLoading,
  //   (res)=>{
  //     // setNotifications(res?.data?.data)
  //     console.log("Latest Transactions", res)
  //   },
  //   (err)=>{
  //     enqueueSnackbar("Something Went Wrong")
  //   }
  // )

  const getNotifications = () => {
    getRequest(
      Apiendpoints.GET_NOTIFICATION,
      setLoading,
      (res) => {
        const fetchedNotifications = res?.data?.data
        setNotifications(fetchedNotifications)
        setTotalUnread(fetchedNotifications.filter((item: NotificationInterface) => item.is_read === 0).length)
      },
      (err) => {
        enqueueSnackbar("Something Went Wrong", { variant: 'error' })
      }
    )
  };

  useEffect(() => {
    getNotifications()
    return () => {
    };
  }, []);

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  // const handleMarkAllAsRead = () => {
  // }

  const markAllRead = () => {
    patchJsonData(
      Apiendpoints.UPDATE_NOTIFICATIONS,
      {},
      '',
      setLoading,
      (res) => {
      },
      (err) => {
        enqueueSnackbar("Couldn't mark notifications", { variant: 'error' })
      }
    )
  };

  return (
    <>
      <IconButtonAnimate
        // color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40, color: 'common.white' }}
      >
        {/* {showBadge ? */}
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
        {/* :
        <Iconify icon="eva:bell-fill" />
        } */}
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0, overflow: 'scroll'}}>
        <Box sx={{ display: 'flex', textAlign: 'center', py: 2, px: 2.5 }} >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5">Notifications</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{height:"50vh"}}>
          <List
            disablePadding
            subheader={(totalUnRead > 0) &&
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, totalUnRead).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                {(totalUnRead > 0) ? 'Before that' : 'Older Notifications'}
              </ListSubheader>
            }
          >
            {notifications.slice(totalUnRead,).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1, m: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              variant='outlined'
              // fullWidth 
              sx={{ display: 'block' }}
              disableRipple
              onClick={() => handleClosePopover()}>
              Close
            </Button>
            <Button
              variant='contained'
              // fullWidth 
              sx={{ display: 'block' }}
              disableRipple
              onClick={() => setShowAllNotifications(true)}>
              View All
            </Button>
          </div>
        </Box>
      </MenuPopover>
      {showAllNotifications && <AllNotifications show={showAllNotifications} setShow={setShowAllNotifications} notifications={notifications} />}
    </>
  );
}

// ----------------------------------------------------------------------

// type NotificationItemProps = {
//   id: string;
//   title: string;
//   description: string;
//   avatar: string | null;
//   type: string;
//   createdAt: Date;
//   isUnRead: boolean;
// };

function NotificationItem({ notification }: { notification: NotificationInterface }) {
  // const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.is_read === 1 && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        {/* <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar> */}
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={
          <Typography variant='body2'>{notification.message}</Typography>
        }
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(notification.created_at)}</Typography>
          </Stack>
        }

      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

// function renderContent(notification: NotificationInterface) {
//   const title = (
//     <Typography variant="subtitle2">
//       {notification.title}
//       <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
//         &nbsp; {noCase(notification.description)}
//       </Typography>
//     </Typography>
//   );

//   if (notification.type === 'order_placed') {
//     return {
//       avatar: <img alt={notification.title} src="/assets/icons/notification/ic_package.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'order_shipped') {
//     return {
//       avatar: <img alt={notification.title} src="/assets/icons/notification/ic_shipping.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'mail') {
//     return {
//       avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'chat_message') {
//     return {
//       avatar: <img alt={notification.title} src="/assets/icons/notification/ic_chat.svg" />,
//       title,
//     };
//   }
//   return {
//     avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
//     title,
//   };
// }
