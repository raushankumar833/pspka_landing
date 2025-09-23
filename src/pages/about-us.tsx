import Head from 'next/head';
import { Divider } from '@mui/material';
import MainLayout from '../layouts/main';
import { AboutHero, AboutWhat, AboutVision } from '../sections/about';
import AboutValues from 'src/sections/about/AboutValues';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title> About us | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>
      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <Divider orientation="vertical" sx={{ mx: 'auto', width: 2 }} />

      <AboutValues />

      {/* <AboutTeam /> */}

      {/* <AboutTestimonials /> */}
    </>
  );
}
