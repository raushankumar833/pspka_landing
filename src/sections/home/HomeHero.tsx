import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Button, Box, Link, Typography, Stack, Grid } from '@mui/material';
// routes
import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgGradient } from '../../utils/cssStyles';
// config
import { HEADER, HERO_DESCRIPTION, PROJECT_DESCRIPTION } from '../../config';
// components
import SvgColor from '../../components/svg-color';
import Iconify from '../../components/iconify';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.8 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '10px',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(50, 0),
  },
  padding: theme.spacing(12, 0),
  height: '100%',
}));

const StyledText = styled(m.h1)({
  color: '#140a43', // main heading color
  fontFamily: "'Playfair Display', serif",
  fontSize: `${52 / 18}rem`,
  textAlign: 'center',
  fontWeight: 'bold',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 4,
  '@media (min-width:900px)': {
    fontSize: `${72 / 18}rem`,
  },
});

const StyledEllipseTop = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 480,
  height: 480,
  top: -80,

  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.08),
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'md');
  const { scrollYProgress } = useScroll();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((scrollHeight) => {
      setHide(scrollHeight > 0.8);
    });
  }, [scrollYProgress]);

  if (hide) return null;

  return (
    <>
      <StyledRoot>
        <Box component={MotionContainer} sx={{ height: 1 }}>
          <Grid container spacing={10} sx={{ height: 1 }}>
            <Grid item xs={12} md={6} sx={{ height: 1 }}>
              {/* <Description /> */}
            </Grid>

            {isDesktop && (
              <Grid item xs={12} md={6}>
                <Content />
              </Grid>
            )}
          </Grid>
        </Box>

        {/* <StyledEllipseTop /> */}
        <StyledEllipseBottom />
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive('up', 'md');
  const { push } = useRouter();

  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <StyledText
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          {PROJECT_DESCRIPTION}
        </StyledText>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography
          variant={isDesktop ? 'h6' : 'body2'}
          sx={{ textAlign: 'center', px: 5, color: '#140a53' }} // slightly purple
        >
          {HERO_DESCRIPTION}
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ my: 5 }}>
          <Stack alignItems="center" spacing={2}>
            <NextLink href="#" passHref>
              <Button
                color="inherit"
                size="large"
                variant="contained"
                startIcon={<Iconify icon="eva:flash-fill" width={24} />}
                sx={{
                  bgcolor: '#140a43',
                  color: '#ffffff',
                  '&:hover': { bgcolor: '#140a43' },
                }}
              >
                DOWNLOAD APP
              </Button>
            </NextLink>

            <Link
              color="#140a43"
              variant="caption"
              target="_blank"
              rel="noopener"
              href={PATH_PAGE.contact}
              sx={{ textDecoration: 'underline', display: 'inline-flex', alignItems: 'center' }}
            >
              <Iconify icon="eva:external-link-fill" width={16} sx={{ mr: 0.5 }} />
              Contact Us!
            </Link>
          </Stack>

          <Button
            color="inherit"
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
            onClick={() => (window.location.href = 'https://p2pae.com/login')}
            sx={{ borderColor: '#140a43', color: '#140a43' }}
          >
            GET STARTED FOR FREE
          </Button>
        </Stack>
      </m.div>

      <Stack spacing={3} sx={{ textAlign: 'center', opacity: 0.4 }}>
        <m.div variants={varFade().in}>
          <Typography variant="overline" sx={{ color: '#140a43' }}>
            Available For
          </Typography>
        </m.div>

        <Stack spacing={2} direction="row" justifyContent="center">
          {['android', 'chrome'].map((platform) => (
            <m.div key={platform} variants={varFade().in}>
              <SvgColor src={`/assets/icons/platforms/ic_${platform}.svg`} />
            </m.div>
          ))}
        </Stack>
      </Stack>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60,
    repeat: Infinity,
  } as const;

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: 1,
        overflow: 'hidden',
        mt: `${HEADER.H_MAIN_DESKTOP}px`,
      }}
    >
      <Stack component={m.div} variants={varFade().in} sx={{ width: 344, position: 'relative' }}>
        <Box
          component={m.img}
          animate={{ y: ['0%', '100%'] }}
          transition={transition}
          src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
          sx={{ position: 'absolute' }}
        />
        <Box
          component={m.img}
          animate={{ y: ['-100%', '0%'] }}
          transition={transition}
          src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
          sx={{ position: 'absolute' }}
        />
      </Stack>

      <Stack component={m.div} variants={varFade().in} sx={{ width: 720, position: 'relative' }}>
        <Box
          component={m.img}
          animate={{ y: ['100%', '0%'] }}
          transition={transition}
          src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
          sx={{ position: 'absolute' }}
        />
        <Box
          component={m.img}
          animate={{ y: ['0%', '-100%'] }}
          transition={transition}
          src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
          sx={{ position: 'absolute' }}
        />
      </Stack>
    </Stack>
  );
}
