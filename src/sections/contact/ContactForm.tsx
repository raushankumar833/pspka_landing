import { Stack, Typography, TextField, Button, Container, Grid, Box } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade, varBounce } from 'src/components/animate';

const ContactForm = () => (
  <Container
    sx={{
      py: 6,
      mt: { xs: -5, md: -10, lg: -12 },
      overflow: 'hidden',
    }}
  >
    <Grid container spacing={6}>
      {/* Left side: Form */}
      <Grid item xs={12} sm={6} md={6} lg={6} >
        <Stack
          component={MotionViewport}
          sx={{
            p: 3,
            maxWidth: 700,
           
            background: 'linear-gradient(135deg, #f3e5f5, #f8f0ff)', // light purple gradient
            borderRadius: 1,
            border:"2px solid  rgba(155, 89, 182, 0.15)",
            boxShadow: '0 6px 14px rgba(155, 89, 182, 0.15)', // purple shadow
            ml: 0,
          }}
        >
          <m.div variants={varFade().inUp} style={{ textAlign: 'center' }}>
           <Typography variant="h3" sx={{ color: '#140a53', fontWeight: 'bold' }}>
  Reach out to our team.
  <br />
  Your feedback matters to us.
</Typography>

          </m.div>

          <Stack spacing={4} sx={{ mt: 6 }}>
            {['Name', 'Email', 'Subject'].map((label) => (
              <m.div key={label} variants={varFade().inUp}>
                <TextField
                  fullWidth
                  label={label}
                  variant="outlined"
                  sx={{
                    borderRadius: 1,
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#d1b3e0' },
                      '&:hover fieldset': { borderColor: '#9c27b0' },
                      '&.Mui-focused fieldset': { borderColor: '#6a1b9a' },
                    },
                  }}
                />
              </m.div>
            ))}

            <m.div variants={varFade().inUp}>
              <TextField
                fullWidth
                label="Enter your message here."
                multiline
                rows={3}
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  backgroundColor: '#ffffff',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#d1b3e0' },
                    '&:hover fieldset': { borderColor: '#9c27b0' },
                    '&.Mui-focused fieldset': { borderColor: '#6a1b9a' },
                  },
                }}
              />
            </m.div>
          </Stack>

          <m.div variants={varBounce().in}>
            <Button
              size="large"
              variant="contained"
              sx={{
                backgroundColor: '#ba68c8', // light purple
                mt: { xs: 1, sm: 2, md: 2 },
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: 2,
                boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#ab47bc',
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
                },
              }}
            >
              Submit Now
            </Button>
          </m.div>
        </Stack>
      </Grid>

      {/* Right side: Image */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          component="img"
          src="../assets/illustrations/cntact_us.jpg"
          alt="Contact Illustration"
          sx={{
            width: { xs: '100%', sm: '90%', md: '100%' },
            maxWidth: 700,
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 1,
            boxShadow: '0 6px 16px rgba(156, 39, 176, 0.2)', // soft purple glow
          }}
        />
      </Grid>
    </Grid>
  </Container>
);

export default ContactForm;
