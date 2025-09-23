import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Typography, Grid, Container, Card, Box } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import { bgGradient } from '../../utils/cssStyles';
import HomeUserCounter from 'src/components/home/HomeUserCounter';

// ----------------------------------------------------------------------

const StyledRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(10, 0),
  ...bgGradient({
    color: alpha('#5210c1', 0.95),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
}));

const CounterCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4.2, 3),
  textAlign: 'center',
  color: '#140a53',
  backdropFilter: 'blur(14px)',
  border: '2px solid #140a53', // fallback solid color
  backgroundImage: `
    linear-gradient(${alpha('#ffffff', 0.9)}, ${alpha('#ffffff', 0.9)}), 
    linear-gradient(90deg, #ffbc87, #8b4513)
  `,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  transition: 'all 0.4s ease',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.03)',
    boxShadow: '0 18px 40px rgba(20, 10, 83, 0.45)',
  },
}));



const COUNTERS = [
  { count: 50, unit: 'K+', sub: 'Merchants' },
  { count: 120, unit: 'L+', sub: 'Customers' },
  { count: 800, unit: '+', sub: 'Cities' },
  { count: 250, unit: 'L+', sub: 'Transactions' },
];

// ----------------------------------------------------------------------

export default function HomeCount() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid container spacing={8} alignItems="center">
          {/* LEFT SIDE - COUNTERS + HEADINGS */}
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inLeft}>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(90deg,#ffbc87,#8b4513)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Made in India
              </Typography>

              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  color: '#fff',
                  mb: 6,
                }}
              >
                Made for Businesses
              </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
             <Grid 
  container 
  spacing={1.5} 
  sx={{ flexWrap: 'wrap' }} // ensures wrapping
>
  {COUNTERS.map((item, index) => (
    <Grid 
      item 
      xs={12}   // full width on extra small
      sm={6}    // half width on small
      md={6}    // 3 per row on medium
      lg={6}    // 4 per row on large
      key={index}
    >
      <CounterCard>
        <HomeUserCounter
          countTo={item.count}
          duration={1500}
          unit={item.unit}
          color="#140a53"
          subValue={item.sub}
        />
      </CounterCard>
    </Grid>
  ))}
</Grid>

            </m.div>
          </Grid>

          {/* RIGHT SIDE - IMAGE + TESTIMONIAL */}
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inRight}>
              <Box sx={{ position: 'relative' }}>
                <Image
                  src="/assets/illustrations/woman.jpg"
                  alt="services"
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
                    width: '100%',
                    maxWidth: 540,
                    mx: 'auto',
                  }}
                />

                {/* Floating Glass Testimonial */}
                <Card
                  sx={{
                    p: 3,
                    mt: 2,
                    mx: 'auto',
                    maxWidth: 400,
                    background: alpha('#ffffff', 0.9),
                    backdropFilter: 'blur(18px)',
                    borderRadius: 3,
                    color: '#140a53',
                    textAlign:"justity",
                   
                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 500 ,}}>
                    “Since embracing our neo banking platform, our financial
                    management has soared, witnessing an impressive 80% boost in
                    productivity over the past year.”
                  </Typography>
                </Card>
              </Box>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
