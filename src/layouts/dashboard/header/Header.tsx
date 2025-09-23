// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV, PROJECT_TITLE } from '../../../config';
// components
import Logo from '../../../components/logo';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
//
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import { setTitleFunc } from 'src/utils/pageTitle';
import { useRouter } from 'next/router';
import Wallet from 'src/sections/@dashboard/header/Wallet';
import Mount from 'src/components/component-mount/Mount';
import { useAuthContext } from 'src/auth/useAuthContext';
import { USERROLES } from 'src/utils/constants';
import HeaderWalletDetail from 'src/sections/@dashboard/general/app/HeaderWalletDetail';
import NotificationsPopover from './NotificationsPopover';
// import { useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
  onOpenNav1?: VoidFunction;
};

export default function Header({ onOpenNav, onOpenNav1 }: Props) {
  const theme = useTheme();
  const { pathname } = useRouter();
  const router = useRouter();
  const { role, wallet } = useAuthContext();
  // const [headerTitle, setHeaderTitle] = useState('')
  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';
  const isNavMini = themeLayout === 'mini';
  const url = router.asPath;
  const isDesktop = useResponsive('up', 'lg');
  const ismobile = useResponsive('down', 'md');
  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;
  const title = setTitleFunc(pathname);

  const checkUrl = (url: string) => {
    const urls = ['customer/', 'sales/', 'distributor/'];
    return urls.every((ending) => !url.endsWith(ending));
  };

  const showHeaderTitle = (url: string) => {
    const urls = ['customer/', 'sales/', 'distributor/', 'admin/'];
    const elements = url.split('/');
    if (elements[elements.length - 2] === 'credit-req') {
      return 'Credit Request';
    } else if (url.includes('aeps')) {
      return 'AEPS';
    } else if (urls.includes(elements[elements.length - 2] + '/')) {
      return '';
    } else if (!urls.includes(elements[elements.length - 2])) {
      const lastSegment = elements[elements.length - 2];
      console.log('Entered title case statement');
      const titleCaseLastSegment = toTitleCase(lastSegment.replace('-', ' '));
      return titleCaseLastSegment;
    } else {
      return '';
    }
  };

  function toTitleCase(str: string) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && (
  <Logo
    sx={{
      mr: 2.5,
      width: { xs: 100, sm: 120, md: 150 }, // changes by breakpoint
      height: 'auto',
      ...bgBlur({
        color: theme.palette.common.white,
      }),
    }}
  />
)}


      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <Typography
        variant="caption"
        sx={{
          fontSize: 20,
        }}
      >
        {showHeaderTitle(url)}
      </Typography>

      <Box
        sx={{
          display: {
            xs: title === 'Dashboard' ? 'block' : 'none',
            sm: 'none',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: 20,
          }}
        >
          {PROJECT_TITLE}
        </Typography>
      </Box>

      {/* <Stack flexGrow={10} direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          variant="caption"
          sx={{
            fontSize: 20,
            display: { xs: title === 'Dashboard' ? 'none' : 'block', sm: 'block' },
          }}
        >
          {title}
        </Typography>
      </Stack> */}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <Mount visible={role != USERROLES.admin}>
          {!ismobile && (
            <>
              <Mount visible={false}>
                <Wallet title="W-1 Balance" icon="wallet1" balance={wallet?.w1} />
              </Mount>
              <Mount visible={false}>
                <Wallet title="W-2 Balance" icon="wallet2" balance={wallet?.w2} />
              </Mount>
            </>
          )}
        </Mount>

        {checkUrl(url) && <HeaderWalletDetail />}

        <NotificationsPopover />
        <LanguagePopover />
        <AccountPopover />
      </Stack>

      {!isDesktop && (
        <IconButton onClick={onOpenNav1} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.primary.darker,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            ...bgBlur({
              color: theme.palette.primary.main,
            }),
            height: HEADER.H_DASHBOARD_DESKTOP,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
