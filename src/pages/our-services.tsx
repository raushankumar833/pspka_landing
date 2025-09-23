import Head from 'next/head';
import MainLayout from '../layouts/main';

import ServicesHero from 'src/sections/our-services/ServicesHero';
import ServicesCard from 'src/sections/our-services/ServiceCard';
import { Container } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------
ServicesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
// ----------------------------------------------------------------------

export interface OurPartnerInterface {
  title: string;
  list: ListType[];
}

export interface ListType {
  icon: string;
  title: string;
  intro: string;
  grid_direction: string;
}

export default function ServicesPage() {
  const isMobile = useResponsive('down', 'md');
  return (
    <>
      <Head>
        <title> Services | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <ServicesHero />
      <Container maxWidth={isMobile ? 'xl' : 'lg'}>
        <ServicesCard />
      </Container>
    </>
  );
}
