import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Stack, Drawer } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../config';
// components
import Scrollbar from '../../../components/scrollbar';
//
import NotificationsContainer from 'src/sections/@dashboard/nav-vertical-right/NotificationsContainer';
import RecentActivity from 'src/sections/@dashboard/nav-vertical-right/RecentActivity';
import Wallet from 'src/sections/@dashboard/header/Wallet';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVerticalRight({ openNav, onCloseNav }: Props) {
  const { pathname } = useRouter();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: isDesktop ? 3 : 0,
          pb: 2,
          mt: isDesktop ? 1 : 0,
          px: 2.5,
          flexShrink: 0,
          height: isDesktop ? HEADER.H_DASHBOARD_DESKTOP : 'auto',
        }}
      />
      {!isDesktop && (
        <Stack flexDirection={'row'} justifyContent={'space-around'}>
          <Wallet title="W-1 Balance" icon="wallet1" balance={50559.33} bgColor="#00000050" />
          <Wallet title="W-2 Balance" icon="wallet2" balance={505.33} bgColor="#00000050" />
        </Stack>
      )}
      {/* <PaymentsContainer /> */}
      <NotificationsContainer />
      <RecentActivity />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        zIndex: 1,
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_RIGHT },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          anchor="right"
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD_RIGHT,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
              borderLeft: 'none',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="right"
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD_MAIN,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
