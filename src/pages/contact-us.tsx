// next
import Head from 'next/head';
// @mui
import { Container, Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// _mock
import { ContactHero, ContactForm } from '../sections/contact';
import ContactEngaging from 'src/sections/contact/ContactEngaging';

// ----------------------------------------------------------------------

ContactPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Head>
        <title> Contact us | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <ContactHero />
      {/* <ContactEngaging /> */}

      <Container sx={{ py: 6, bgcolor: '#f8f9fb' }}>
        <Box
          sx={{ bgcolor: '#f8f9fb' }}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
          }}
        >
          <ContactForm />
        </Box>
      </Container>
    </>
  );
}
