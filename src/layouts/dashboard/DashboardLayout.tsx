import { Suspense, useEffect, useState } from 'react';
// @mui
import { Box, useTheme } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// auth
import AuthGuard from '../../auth/AuthGuard';
// components
import { useSettingsContext } from '../../components/settings';
//
import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
import ClientOnly from 'src/hocs/ClientOnly';
import LoadingScreen from 'src/components/loading-screen';
import NavVerticalRight from './nav/NavVerticalRight';
import { useRouter } from 'next/router';
import { dispatch } from 'src/redux/store';
import { clearPlans, clearSelectedBiller } from 'src/redux/my-slices/recharge_bills';
import Mount from 'src/components/component-mount/Mount';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { themeLayout } = useSettingsContext();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    dispatch(clearSelectedBiller(null));
    dispatch(clearPlans(null));
    return () => {};
  }, [pathname]);

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;
  const renderNavVerticalRight = <NavVerticalRight openNav={open1} onCloseNav={handleClose1} />;

  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? <NavHorizontal /> : renderNavVertical}

          <Main>{children}</Main>
        </>
      );
    }

    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { lg: 'flex' },
              minHeight: { lg: 1 },
            }}
          >
            {isDesktop ? <NavMini /> : renderNavVertical}

            <Main>{children}</Main>
          </Box>
        </>
      );
    }

    return (
      <>
        <Header onOpenNav={handleOpen} onOpenNav1={handleOpen1} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
            bgcolor: theme.palette.grey[300],
          }}
        >
          {renderNavVertical}

          <Main>{children}</Main>

          <Mount
            visible={[
              '/dashboard/customer/recharges',
              // '/dashboard/customer/bill-payments',
              '/dashboard/customer/travel',
              '/dashboard/customer/bbps',
            ].includes(pathname)}
          >
            {renderNavVerticalRight}
          </Mount>
        </Box>
      </>
    );
  };

  return (
    <ClientOnly>
      <AuthGuard>
        <Suspense fallback={<LoadingScreen />}>{renderContent()}</Suspense>
      </AuthGuard>
    </ClientOnly>
  );
}
