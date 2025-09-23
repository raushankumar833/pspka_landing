import { styled, useTheme } from '@mui/material/styles';
import { Typography, Box, Divider, Button, Stack } from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import project_data from 'project-config.json';

const MainRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    height: 'max-content',
  },
}));
const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2, 1, 0, 1),
  height: 'auto',
  // backgroundColor: '#fff3b0',
  // backgroundColor: '#ff758f',
      background: 'linear-gradient(135deg, #c9a6ff 0%, #ff758f 100%)',
  // backgroundColor: '#f08080',
  // backgroundColor: '#ffb3c1',
  // backgroundColor: theme.palette.secondary.light,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0, 0, 0),
  },
}));
const StyledContent = styled(Box)(({ theme }) => ({
  zIndex: 2,
  width: '100%',
  borderRadius: '2px',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
    margin: theme.spacing(0, 0, 4, 0),
  },
  [theme.breakpoints.up('md')]: {},
}));
const StyledImage = styled(Box)(({ theme }) => ({
  zIndex: 2,
  width: '100%',
  borderRadius: '2px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

export default function PartnerHero() {
  return (
    <MainRoot>
      <StyledRoot>
        <HeroFloatCard />
      </StyledRoot>
    </MainRoot>
  );
}
function HeroFloatCard() {
  const theme = useTheme();
  const {
    ourpartner: { hero },
  } = project_data;
  const isMobile = useResponsive('down', 'md');
  return (
    <StyledContent>
      <m.div variants={varFade().inRight}>
        <Typography
          variant={isMobile ? 'h6' : 'h4'}
          fontWeight={isMobile ? 'normal' : 'bold'}
          color="#140a53"
          sx={{
            mb: 1,
            textTransform: 'uppercase',
          }}
        >
          {hero?.sub_title}
        </Typography>
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          fontWeight="bold"
          color="#140a53"
        >
          {hero?.title}
        </Typography>
        <Typography
          variant={isMobile ? 'caption' : 'h6'}
          fontWeight="normal"
          color="#140a53"
          sx={{
            width: { xs: '100%', md: '60%' },
            margin: '32px auto',
            px: { xs: 0, md: 5 },
            lineHeight: { md: '2rem' },
          }}
        >
          {hero?.intro}
        </Typography>
        <Divider
          sx={{
            border: `1px solid ${theme.palette.info.main}`,
            display: 'block',
            width: '100px',
            margin: '0 auto',
            mt: 2,
          }}
        />
      </m.div>
      <Stack
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems="center"
        justifyContent="center"
        spacing={isMobile ? 2 : 0}
        mt={isMobile ? 0 : 4}
      >
        <Stack>{ourpartnersbutton}</Stack>
        <Stack ml={isMobile ? 0 : 3}>{contactusbutton}</Stack>
      </Stack>
      <ImageSection />
      <HeroFooter />
    </StyledContent>
  );
}

function ImageSection() {
  const {
    ourpartner: { hero },
  } = project_data;
  return (
    <StyledImage>
      <img
        width="660"
        height="330"
        fetchPriority="high"
        src={hero?.partner_main}
        alt="partner_main"
      />
    </StyledImage>
  );
}
function HeroFooter() {
  const {
    ourpartner: { hero },
  } = project_data;
  return (
    <StyledImage>
      <img width="1280" height="130" src={hero?.partner_city} alt="work city" />
    </StyledImage>
  );
}

const contactusbutton = (
  <m.div variants={varFade().inUp}>
    <Button
      size="large"
      variant="outlined"
      sx={{
        color: (theme) => "#140a53",
        borderRadius: '2px',
      }}
      endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
      Contact Us
    </Button>
  </m.div>
);
const ourpartnersbutton = (
  <m.div variants={varFade().inUp}>
    <Button
      size="large"
      variant="contained"
      sx={{
        backgroundColor: (theme) => theme.palette.common.black,
        borderRadius: '2px',
      }}
      endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
      Become a Partner{' '}
    </Button>
  </m.div>
);
