import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
// utils
import { textGradient } from '../../utils/cssStyles';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[50],
  overflow: 'hidden',
}));

const StyledWrap = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(14),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    margin: 0,
  },
}));

const HighlightText = styled('span')(({ theme }) => ({
  ...textGradient(`120deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%`),
}));

// ----------------------------------------------------------------------

export default function HomeForRetailer() {
  return (
    <StyledRoot>
      <StyledWrap>
        <Container component={MotionViewport}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <StyledContent>
                {/* Mission */}
                <m.div variants={varFade().inLeft}>
                  <Typography variant="h3" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
                    <HighlightText>Mission</HighlightText>
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, color: '#140a53',textAlign:"justify" }}>
                    To empower businesses and individuals with secure, seamless, and innovative digital payment solutions, simplifying financial transactions while ensuring trust, accessibility, and efficiency across India.
                  </Typography>
                </m.div>

                {/* Vision */}
                <m.div variants={varFade().inLeft}>
                  <Typography variant="h3" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
                    <HighlightText>Vision</HighlightText>
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, color: '#140a53',textAlign:"justify" }}>
                    To be India’s most trusted and fastest-growing digital fintech ecosystem, driving financial inclusion by making payments, banking, and essential services accessible to every corner of the country.
                  </Typography>
                </m.div>

                {/* Values as Paragraph */}
                <m.div variants={varFade().inLeft}>
                  <Typography variant="h3" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
                    <HighlightText>Values</HighlightText>
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, color: '#140a53',textAlign:"justify" }}>
                    Our values guide everything we do: integrity in every transaction, innovation in creating cutting-edge solutions, customer-centricity by keeping users at the heart of our services, inclusion to make financial services accessible to all, and excellence in delivering high-quality solutions consistently.
                  </Typography>
                </m.div>
              </StyledContent>
            </Grid>

            <Grid item xs={12} md={6}>
              <m.img
                src="/assets/illustrations/mission-vision.jpg"
                alt="Mission Vision"
                style={{ width: '100%', maxWidth: 500, display: 'block', margin: 'auto' }}
                variants={varFade().inRight}
              />
            </Grid>
          </Grid>
        </Container>
      </StyledWrap>
      <TriangleShape anchor="bottom" />
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function TriangleShape({ anchor = 'top' }: { anchor?: 'top' | 'bottom' }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: 1,
        height: { xs: 40, md: 64 },
        bottom: anchor === 'bottom' ? 0 : 'unset',
        top: anchor === 'top' ? 0 : 'unset',
        color: 'background.paper',
        zIndex: 0,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1440 64" preserveAspectRatio="none">
        <path d="M1440 0H0L1440 64V0Z" fill="currentColor" />
      </svg>
    </Box>
  );
}
