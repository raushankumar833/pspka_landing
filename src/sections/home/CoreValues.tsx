import { m } from 'framer-motion';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SecurityIcon from '@mui/icons-material/Security';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: <LightbulbIcon sx={{ fontSize: 42, color: '#fff' }} />,
    title: 'Innovation',
    description:
      'Harnessing the power of cutting-edge technology to transform digital payments and set new industry benchmarks.',
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 42, color: '#fff' }} />,
    title: 'Trust',
    description:
      'Every transaction is backed by our commitment to reliability, transparency, and long-term trust.',
  },
  {
    icon: <PeopleAltIcon sx={{ fontSize: 42, color: '#fff' }} />,
    title: 'Customer Focus',
    description:
      'We design every solution with our users in mind, ensuring seamless, hassle-free payment experiences.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 42, color: '#fff' }} />,
    title: 'Security',
    description:
      'With advanced encryption and robust safeguards, your transactions remain fully protected at all times.',
  },
];

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(/assets/background/overlay_2.svg), url(/assets/images/home/core_values_2.jpg)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // backgroundColor: alpha(theme.palette.common.black, 0.6),
    zIndex: 1,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  background: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(6, 4),
  textAlign: 'center',
  color: '#140A53',
  transition: 'all 0.4s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',

  // Fixed equal height for md+ screens
  [theme.breakpoints.up('md')]: {
    minHeight: 350,
  },

  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)',
    boxShadow: `0 20px 45px ${alpha(theme.palette.common.black, 0.2)}`,
  },
}));

// 🔥 Beautiful glowing icon wrapper
const IconWrapper = styled('div')(({ theme }) => ({
  width: 90,
  height: 90,
  margin: '0 auto 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0 10px 25px rgba(0,0,0,0.15)`,
  transition: 'all 0.4s ease',
  position: 'relative',

  '&:before': {
    content: '""',
    position: 'absolute',
    inset: -6,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    opacity: 0.4,
    filter: 'blur(12px)',
    zIndex: 0,
    transition: 'all 0.4s ease',
  },

  '&:hover': {
    transform: 'scale(1.15)',
    boxShadow: `0 15px 35px rgba(0,0,0,0.25)`,

    '&:before': {
      opacity: 0.7,
      filter: 'blur(18px)',
    },
  },
}));

// ----------------------------------------------------------------------

export default function CoreValues() {
  const theme = useTheme();

  return (
    <StyledRoot>
      <Box component={MotionViewport} sx={{ position: 'relative', zIndex: 2 }}>
        {/* Section Title */}
        <Stack
          spacing={2}
          sx={{
            width: { md: 720 },
            m: '0 auto',
            textAlign: 'center',
            mb: { xs: 6, md: 12 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography
              variant="h1"
              fontWeight="700"
              color="common.white"
              sx={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
            >
              Our Core Values
            </Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography
              variant="h5"
              sx={{
                color: alpha(theme.palette.common.white, 0.85),
                fontWeight: 600,
              }}
            >
              The guiding principles behind everything we do
            </Typography>
          </m.div>
        </Stack>

        {/* Cards */}
        <Box
          gap={{ xs: 4, md: 6 }}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          sx={{ width: { xs: '95%', md: '88%' }, mx: 'auto' }}
        >
          {CARDS.map((card) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <StyledCard>
                <IconWrapper>{card.icon}</IconWrapper>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mb: 1, color: '#140A53' }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: '#140A53',
                    textAlign:"justify",
                  }}
                >
                  {card.description}
                </Typography>
              </StyledCard>
            </m.div>
          ))}
        </Box>
      </Box>
    </StyledRoot>
  );
}
