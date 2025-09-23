// ----------------------------------------------------------------------
import { m } from 'framer-motion';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack, Button, Divider, Grid } from '@mui/material';
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.info.light} 100%)`,
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

const StyledRootCard = styled(Card)(({ theme }) => ({
  zIndex: 2,
  left: '50%',
  top: '-20px',
  width: '70%',
  borderRadius: '12px',
  position: 'absolute',
  padding: theme.spacing(5),
  transform: 'translate(-50%, -50%)',
  boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
  background: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    top: '0px',
    left: '0px',
    width: '90%',
    position: 'relative',
    transform: 'none',
    margin: '0 auto 50px auto',
    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const SpotLightText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '0',
  padding: theme.spacing(0.5, 2),
  fontSize: '12px',
  letterSpacing: '2px',
  color: theme.palette.common.white,
  background: theme.palette.secondary.main,
  borderTopLeftRadius: '4px',
  borderBottomRightRadius: '8px',
  fontWeight: 600,
}));

const StyledDescription = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginTop: theme.spacing(15),
    borderRight: `1px dashed ${alpha(theme.palette.grey[900], 0.3)}`,
  },
}));

const StyledStatement = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontFamily: "'Roboto Slab', serif",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginTop: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function HomeBilling() {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md');

  return (
    <>
      <PermissionGaurd permission={isMobile}>
        <BillingCardComponent />
      </PermissionGaurd>

      <StyledRoot>
        <PermissionGaurd permission={!isMobile}>
          <BillingCardComponent />
        </PermissionGaurd>

        <Container component={MotionViewport}>
          <Grid direction={{ xs: 'column', md: 'row' }} container spacing={5}>
            <Grid item xs={12} md={7}>
              <Description />
            </Grid>
            <Grid item xs={12} md={5}>
              <Statement />
            </Grid>
          </Grid>
        </Container>

        <Iconify
          icon="streamline:ai-technology-spark"
          sx={{
            width: 360,
            height: 360,
            opacity: 0.08,
            position: 'absolute',
            right: theme.spacing(-3),
            bottom: 0,
            color: alpha(theme.palette.secondary.main, 0.3),
            zIndex: -1,
          }}
        />
      </StyledRoot>
    </>
  );
}

function BillingCardComponent() {
  const theme = useTheme();
  const { push } = useRouter();
  const isMobile = useResponsive('down', 'md');

  return (
    <Box component={MotionViewport}>
      <m.div variants={varFade().inDown}>
        <StyledRootCard>
          <SpotLightText>TOP BILLING</SpotLightText>

          <Stack
            sx={{
              alignItems: { md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
            }}
          >
            <Stack flexDirection={'row'} alignItems="center" spacing={2} mr={2}>
              <Iconify icon="solar:wallet-money-bold" width={60} height={60} />
              <div>
                <Typography variant="body1" fontWeight="bold" color="#140a53">
                  {process.env.REACT_APP_PROJECT_TITLE}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="#140a53">
                  DMT
                </Typography>
              </div>
            </Stack>

            <PermissionGaurd permission={!isMobile}>
              <Divider
                orientation="vertical"
                sx={{
                  height: '80px',
                  border: `1px dashed ${alpha(theme.palette.grey[900], 0.3)}`,
                }}
              />
            </PermissionGaurd>

            <Stack spacing={2} sx={{ mt: { xs: 2, md: 0 }, ml: 3 }}>
              <Typography variant="h6" fontWeight="400" color="#140A53">
                Effortless financial transactions made seamless with our streamlined domestic money
                transfer service.
              </Typography>

              <Button
                variant="contained"
                onClick={() => push(PATH_DASHBOARD.admin.root)}
                sx={{
                  width: '200px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
                  },
                }}
                endIcon={<Iconify icon="line-md:chevron-right" />}
              >
                Try Now
              </Button>
            </Stack>

            <PermissionGaurd permission={!isMobile}>
              <Iconify
                icon="streamline:ai-technology-spark"
                sx={{
                  width: 120,
                  height: 120,
                  opacity: 0.08,
                  color: alpha(theme.palette.secondary.main, 0.3),
                }}
              />
            </PermissionGaurd>
          </Stack>
        </StyledRootCard>
      </m.div>
    </Box>
  );
}

function Description() {
  const theme = useTheme();
  const { push } = useRouter();

  return (
    <StyledDescription>
      <m.div variants={varFade().inLeft}>
        <Typography variant="h6" fontWeight="500" color="#140a53" mb={1}>
          Simplify Payments, Maximize Growth
        </Typography>

        <Typography variant="h2" fontWeight="700" color="#140a53" mb={2}>
          {process.env.REACT_APP_PROJECT_TITLE}
        </Typography>

        <Typography variant="subtitle1" fontWeight="500" color="#140a53" mb={2}>
          Combined solutions for all services
        </Typography>

        <Typography variant="h6" fontWeight="400" mt={2} color="#140a53" mb={4}>
          Experience financial empowerment in one unified platform – where convenience meets
          comprehensive solutions, redefining your financial journey effortlessly.
        </Typography>

        <Button
          variant="contained"
          onClick={() => push(PATH_DASHBOARD.admin.root)}
          sx={{
            mt: 6,
            p: 2,
            width: '220px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 600,
            textTransform: 'none',
            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
            },
          }}
          endIcon={<Iconify icon="line-md:chevron-right" />}
        >
          Try {process.env.REACT_APP_PROJECT_TITLE}
        </Button>
      </m.div>
    </StyledDescription>
  );
}

function Statement() {
  return (
    <StyledStatement>
      <m.div variants={varFade().inRight}>
        <Iconify icon="el:quote-alt" width={40} color="#52c" />
        <Typography variant="h4" fontWeight="500" marginTop={2} color="#140a53">
          Whether you're a local retailer, or a thriving enterprise, our platform is tailored to
          elevate your business operations – a seamless solution for every shop size.
        </Typography>
      </m.div>
    </StyledStatement>
  );
}
