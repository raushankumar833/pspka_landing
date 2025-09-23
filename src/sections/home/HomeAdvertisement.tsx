import { m } from 'framer-motion';
import { useTheme, styled } from '@mui/material/styles';
import { Button, Box, Container, Stack, Typography } from '@mui/material';
import { bgGradient } from '../../utils/cssStyles';
import { PATH_DASHBOARD } from '../../routes/paths';
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import { useRouter } from 'next/router';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 2),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundImage: `url('/assets/background/overlay_4.jpg')`,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(16, 0),
  },
}));

export default function HomeAdvertisement() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          alignItems="center"
          direction={{ xs: 'column', md: 'row' }}
          spacing={isDesktop ? 5 : 3}
          sx={{
            ...bgGradient({
              direction: '135deg',
              startColor: theme.palette.common.white,
              endColor: theme.palette.primary.lighter,
            }),
            borderRadius: 1,
            p: { xs: 3, md: 3 },
          }}
        >
          {isDesktop && <Content />}
          <Description />
        </Stack>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------
function Description() {
  const { push } = useRouter();
  const isDesktop = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
        maxWidth: 500,
      }}
    >
      {/* Main Heading */}
      <Typography
        component={m.div}
        variants={varFade().inDown}
        sx={{
          color: '#140a53',
          mb: 3,
          typography: isDesktop ? 'h2' : 'h4',
          fontWeight: 700,
        }}
      >
        Empower Your Financial Journey
      </Typography>

      {/* Subheading */}
      <Typography
        component={m.div}
        variants={varFade().inDown}
        sx={{
          color: '#140a53',
          mb: 2,
          typography: isDesktop ? 'h4' : 'h6',
          fontWeight: 400,
        }}
      >
        Seamless, Secure, and Smart Solutions to Grow Your Earnings.
      </Typography>

      {/* Feature Points */}
      <Stack
        spacing={1.5}
        mb={isDesktop ? 5 : 3}
        component={m.div}
        variants={varFade().inUp}
      >
        <Typography variant="body1" sx={{ color: '#140a53' }}>
          • Fast and reliable transactions anytime, anywhere.
        </Typography>
        <Typography variant="body1" sx={{ color: '#140a53' }}>
          • Advanced analytics to track your progress and growth.
        </Typography>
        <Typography variant="body1" sx={{ color: '#140a53' }}>
          • Personalized dashboard to manage your business efficiently.
        </Typography>
      </Stack>

      {/* Buttons */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size={isDesktop ? 'large' : 'medium'}
            variant="contained"
          c
            sx={{
              color: 'grey.100',
              backgroundColor: '#731cdd',
            }}
          >
            Get Started
          </Button>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size={isDesktop ? 'large' : 'medium'}
            variant="outlined"
            onClick={() => push('/services')}
            sx={{
              color: '#731cdd',
              borderColor: '#731cdd',
              '&:hover': { borderColor: '#5310aa', color: '#5310aa' },
            }}
          >
            Explore Services
          </Button>
        </m.div>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------
function Content() {
  return (
    <Stack
      component={m.div}
      variants={varFade().inUp}
      alignItems="center"
      sx={{
        p: 3,
      }}
    >
      <m.div
        animate={{
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="financial services"
          src="/assets/images/home/person.jpg"
          sx={{ width: 360, height: 'auto', borderRadius: 3 }}
        />
      </m.div>
    </Stack>
  );
}
