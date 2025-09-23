import { m } from 'framer-motion';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Grid, Button, Container, Typography, Stack } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { bgGradient } from '../../utils/cssStyles';
import { PATH_PAGE } from '../../routes/paths';
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';
import NextLink from 'next/link';
import Favicon from 'src/components/logo/Favicon';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(20),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.98),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  padding: theme.spacing(1.5, 0),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(15),
  },
}));

const StyledRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': {
    margin: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(2.5),
    },
  },
}));

// ----------------------------------------------------------------------

export default function ContactEngaging() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid direction={{ xs: 'column', md: 'row-reverse' }} container spacing={5}>
          <Grid item xs={12} md={5}>
            <Description />
          </Grid>

          <Grid item xs={12} md={7}>
            <Content />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {exploreServicesButton}
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive('up', 'md');
  const theme = useTheme();
  return (
    <StyledDescription>
      <m.div variants={varFade().inRight}>
        <Typography variant="h2" fontWeight="normal" color={theme.palette.common.black}>
          {process.env.REACT_APP_PROJECT_TITLE} for Retails
        </Typography>
      </m.div>

      <m.div variants={varFade().inRight}>
        <Typography variant="h6" fontWeight="normal" mt={2}>
          Dive into the expansive capabilities of our neo banking platform, offering professional
          services, robust infrastructure, unwavering support, and top-tier security – everything
          your financial endeavors need to simplify operations, foster client relationships, and
          achieve scalable growth.
        </Typography>
      </m.div>
      <Stack marginTop={4}>{isDesktop && exploreServicesButton}</Stack>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const isMobile = useResponsive('down', 'md');

  return (
    <StyledContent>
      {/* Row 1 */}
      <StyledRow>
        <m.div variants={varFade().inLeft}>
          <Image src="/assets/illustrations/illustration_home_services.jpg" alt="services" />
          <Stack flexDirection={isMobile ? 'column' : 'row'} alignItems="center" marginTop={4}>
            <Typography
              variant="h4"
              fontWeight="normal"
              fontFamily="'Roboto Slab', serif"
              marginTop={2}
            >
              Since embracing our neo banking platform, our financial management has soared,
              witnessing an impressive 80% boost in productivity over the past year.
            </Typography>
            <Stack textAlign="center">
              {!isMobile && <Favicon />}
              <NextLink href={PATH_PAGE.about} passHref>
                <Button endIcon={<Iconify icon="line-md:chevron-right" />}>About Us</Button>
              </NextLink>
            </Stack>
          </Stack>
        </m.div>
      </StyledRow>
    </StyledContent>
  );
}

// ----------------------------------------------------------------------

const exploreServicesButton = (
  <m.div variants={varFade().inUp}>
    <Button
      size="large"
      color="inherit"
      variant="outlined"
      target="_blank"
      rel="noopener"
      href={PATH_PAGE.components}
      endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
      Explore All Services
    </Button>
  </m.div>
);

// ----------------------------------------------------------------------
