// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, BoxProps } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Logo from '../../components/logo';
//
import NavMobile from './nav/mobile';
import navConfig from './nav/config';
import NavDesktop from './nav/desktop';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { push } = useRouter();
  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: '100%',
        left: 0,
        backgroundColor: '#5210c1',
        boxShadow: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: { xs: HEADER.H_MOBILE, md: HEADER.H_MAIN_DESKTOP },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          // ...(isOffset && {
          //   ...bgBlur({ color: theme.palette.background.default }),
          //   height: { md: HEADER.H_MAIN_DESKTOP - 10 },
          // }),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            px: { xs: 2, md: 8 },
          }}
        >
          {/* Logo */}
          <Logo sx={{ width: { xs: '80px', md: '100px' } }} />

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {isDesktop && (
            <NavDesktop
              isOffset={isOffset}
              data={navConfig}
              sx={{ '& a': { color: '#fff' } }} // white links
            />
          )}

          {/* Login Button */}
          <Button
            variant="contained"
              rel="noopener"
              //  href={PATH_AUTH.login}
            onClick={() => window.location.href = 'https://app.p2pae.com/login'}
            sx={{
              backgroundColor: '#731cdd',
              fontSize: isDesktop ? '14px' : '10px',
              py: isDesktop ? 1 : '4px',
              px: isDesktop ? 2 : '10px',
              color: '#fff',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#5a15b8' },
            }}
          >
            Login Now
          </Button>

          {/* Mobile Navigation */}
          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Box>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.shadows[8],
        ...sx,
      }}
      {...other}
    />
  );
}
