import { m, useScroll, useSpring } from 'framer-motion';
import Head from 'next/head';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import MainLayout from '../layouts/main';
import { HomeHero, HomeForRetailer, HomeAdvertisement } from '../sections/home';
import HomeBilling from 'src/sections/home/HomeBilling';
import HomeServices from 'src/sections/home/HomeServices';
import CoreValues from 'src/sections/home/CoreValues';
import HomeCount from 'src/sections/home/HomeCount';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
        color:"#140a53",
      }}
    />
  );

  return (
    <>
      <Head>
        <title>{process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      {progress}

      <HomeHero />
      
      <Box
        sx={{
          // overflow: 'hidden',
          overflowX: 'clip',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeBilling />

        <HomeServices />

        <CoreValues />

        <HomeCount />

        <HomeForRetailer />

        <HomeAdvertisement />
      </Box>
    </>
  );
}
