import { m } from 'framer-motion';
import { alpha, styled } from '@mui/material/styles';
import { Grid, Button, Container, Typography, Stack, Box } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { bgGradient } from '../../utils/cssStyles';
import { PATH_PAGE } from '../../routes/paths';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(16),
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(5),
}));

const StyledContent = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.primary.light, 0.05),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
}));

const ServiceCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  width:260,
  height: 275, // Equal height for all cards
  borderRadius: theme.shape.borderRadius * 2,
  background: '#fff',
  boxShadow: theme.shadows[6],
  transition: 'transform 0.4s, box-shadow 0.4s',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // Title & description stay balanced
  alignItems: 'center',
  '&:hover': {
    transform: 'translateY(-15px)',
    boxShadow: theme.shadows[16],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 55,
  height: 55,
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function HomeServices() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        {/* Section Title */}
        <StyledDescription>
          <m.div variants={varFade().inDown}>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                background: '#140a53',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              How P2PAE Can Help You?
            </Typography>
          </m.div>
          {isDesktop && <Stack mt={5}>{exploreServicesButton}</Stack>}
        </StyledDescription>

        {/* Services Grid */}
        <StyledContent>
          <Grid container spacing={5} sx={{ py: 2 }}>
            {services.map((service, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <m.div variants={varFade().inUp}>
                  <ServiceCard>
                    <IconWrapper>
                      <Iconify icon={service.icon} width={36} height={36} color="#6A0DAD" />
                    </IconWrapper>

                    <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: '#140a53', mb: 1 }}
                      >
                        {service.title}
                      </Typography>
                      <Typography variant="body1"  sx={{ color: '#140A53',textAlign:"justify" }}>
                        {service.description}
                      </Typography>
                    </Box>
                  </ServiceCard>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </StyledContent>

        {/* Button for Mobile */}
        {!isDesktop && (
          <Stack mt={5} alignItems="center">
            {exploreServicesButton}
          </Stack>
        )}
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

const services = [
  {
    title: 'BBPS (Bharat Bill Payment System)',
    description: 'Pay credit card, electricity, and utility bills instantly and securely.',
    icon: 'ic:round-receipt',
  },
  {
    title: 'Domestic Money Transfer',
    description: 'Transfer money across India with ease and reliability.',
    icon: 'mdi:bank-transfer',
  },
  {
    title: 'Mobile & FASTag Recharge',
    description: 'Quick recharge for mobiles and FASTags anytime, anywhere.',
    icon: 'ic:round-phone-iphone',
  },
  {
    title: 'Cash Management Services (CMS)',
    description: 'Streamlined cash collection and management solutions for businesses.',
    icon: 'mdi:cash-multiple',
  },
  {
    title: 'Travel Booking',
    description: 'Hassle-free booking for IRCTC trains, buses, flights, and hotels.',
    icon: 'mdi:ticket-confirmation',
  },
  {
    title: 'AEPS ',
    description:
      'Secure cash withdrawal, balance inquiry, and transactions using Aadhaar authentication.',
    icon: 'mdi:account-key',
  },
    {
    title: 'UPI Payments',
    description: 'Seamless and instant UPI transactions for customers and businesses.',
    icon: 'mdi:qrcode-scan',
  },
  {
    title: 'Micro ATM (mATM)',
    description: 'Enable cash withdrawal and balance inquiry using debit cards at retail points.',
    icon: 'mdi:credit-card-swipe',
  },

];

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
      sx={{
        borderColor: '#140A53',
        color: '#140A53',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: alpha('#140A53', 0.1),
          borderColor: '#140A53',
        },
      }}
    >
      Explore All Services
    </Button>
  </m.div>
);
