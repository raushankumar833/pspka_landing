import { m } from 'framer-motion';
import { Typography, Stack, Grid, Divider } from '@mui/material';
import Image from '../../components/image';
import { varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <>
      <Image
        src="/assets/images/about/vision.jpeg"
        alt="about-vision"
        sx={{ width: '100%', height: '70vh' }}
      />

      <Grid container spacing={12} px={{ lg: 12, xs: 4 }}>
        <Grid item lg={4}>
          <Stack sx={{ height: '20vh' }}>
            <Image src="/assets/images/about/vision.jpeg" alt="about-vision" />
          </Stack>
          <Stack
            sx={{
              backgroundColor: '#f8f9fb',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pt: { xs: 0, md: 3 },
            }}
          >
            <Typography variant="h3" fontWeight="normal" sx={{ color: '#140a53' }}>
              Simplifying Payments, Empowering People
            </Typography>
            <Divider orientation="horizontal" sx={{ color: '#140a53', width: '60%' }} />
          </Stack>
        </Grid>

        <Grid item lg={4}>
          <Typography
            pt={{ lg: 6, md: 0, sm: 0, xs: 0 }}
            textAlign={'justify'}
            sx={{ fontWeight: 300, color: '#140a53' }}
            variant="h6"
          >
            We provide seamless solutions for bill payments, money transfers, and digital
            transactions. Our platform is designed to save you time, reduce complexity, and ensure
            every payment is fast, secure, and reliable.
            <br />
            <br />
            With years of experience in financial technology, we continue to innovate and bring
            convenient services to businesses and individuals alike.
          </Typography>
        </Grid>

        <Grid item lg={4}>
          <Typography
            pt={{ lg: 6, md: 0, sm: 0, xs: 0 }}
            textAlign={'justify'}
            sx={{ fontWeight: 300, color: '#140a53' }}
            variant="h6"
          >
            Our approach focuses on creating intuitive platforms instead of relying solely on
            marketing or acquisitions. We prioritize secure transactions, customer support, and
            innovative features that make digital payments effortless.
            <br />
            <br />
            By investing in technology and customer experience, we empower users to handle their
            financial needs anytime, anywhere.
          </Typography>
        </Grid>
      </Grid>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="h4"
          fontWeight="normal"
          p={{ lg: 10, xs: 5 }}
          sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', color: '#140a53' }}
        >
          Our vision is to be the most trusted and innovative platform for digital payments,
          helping people and businesses manage money seamlessly across the globe.
        </Typography>
      </m.div>
    </>
  );
}
