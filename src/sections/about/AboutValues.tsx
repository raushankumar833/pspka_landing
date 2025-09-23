// @mui
import { Box, Typography, Grid, Avatar, Button } from '@mui/material';

// Expanded sample data
const aboutUsData = [
  { id: '1', title: 'Integrity', description: 'We act with honesty, fairness, and transparency in everything we do.' },
  { id: '2', title: 'Innovation', description: 'We embrace creativity and seek to improve our products and services constantly.' },
  { id: '3', title: 'Customer First', description: 'We prioritize our customers’ needs and strive to exceed their expectations.' },
  { id: '4', title: 'Teamwork', description: 'Collaboration and respect are at the heart of our team culture.' },
  { id: '5', title: 'Sustainability', description: 'We are committed to responsible business practices and a greener future.' },
  { id: '6', title: 'Excellence', description: 'We pursue the highest standards in everything we do.' },
  { id: '7', title: 'Accountability', description: 'We take responsibility for our actions and outcomes.' },
  { id: '8', title: 'Empathy', description: 'We listen, understand, and support our colleagues and customers.' },
  { id: '9', title: 'Adaptability', description: 'We embrace change and adapt to challenges with agility.' },
  { id: '10', title: 'Passion', description: 'We are passionate about what we do and inspire others through our energy.' },
  { id: '11', title: 'Diversity', description: 'We celebrate differences and foster an inclusive environment.' },
  { id: '12', title: 'Trust', description: 'We build trust through consistency, transparency, and reliability.' },
];

export default function AboutValues() {
  const aboutus = aboutUsData;

  return (
    <>
      <Box sx={{ backgroundColor: '#f8f9fb' }} p={{ lg: 4, xs: 4 }} alignSelf={'center'} >
        <Typography textAlign={'center'} variant="h1"  sx={{ color: '#140a53' }}>
          Our Values
        </Typography>
        <Typography textAlign={'center'} variant="body1"  sx={{ fontWeight: '100', color: '#140a53' }}>
          Our values guide everything we do: how we create our
          <br /> product, and how we operate as a team.
        </Typography>

        <Grid container px={{ lg: 32, md: 12 }} mt={3} spacing={6}>
          {aboutus.map((about, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Avatar
                sx={{
                  bgcolor: '#fff',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  height: '60px',
                  width: '60px',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: '800', color: '#140a53' }}>
                  {about.id}
                </Typography>
              </Avatar>
              <Typography variant="h5" pt={2} sx={{ fontWeight: '800', color: '#140a53' }}>
                {about.title}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: '400', color: '#140a53' }}>
                {about.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box p={{ lg: 4, xs: 4 }} alignSelf={'center'} >
        <Grid container px={{ lg: 12, md: 12 }} pt={4} spacing={6}>
          <Grid item lg={6}>
            <Typography sx={{ color: '#140a53' }} variant="h2">
              Get Started
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: '100', color: '#140a53' }}>
              Download OurApp for free on the Google Play
              <br /> store – or sign up online today.
            </Typography>
          </Grid>
          <Grid item lg={6} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant="contained" sx={{ bgcolor: '#140a53' }} size="large"   onClick={() => window.location.href = 'https://p2pae.com/login'}>

              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
