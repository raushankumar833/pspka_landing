import { styled, useTheme } from '@mui/material/styles';
import { Typography, Card, Box, Divider, Grid, Link, Avatar } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import contact_hero from 'project-config.json';
import useResponsive from 'src/hooks/useResponsive';

// ---------------- Styled Components ----------------
const MainRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: { height: '100vh' },
}));

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: ' url(/assets/images/contact/hero.jpeg)',
  padding: theme.spacing(2, 1, 0, 1),
  height: 'auto',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0, 0, 0),
    height: `calc(100vh - 200px)`,
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(8, 0, 0, 0),
    height: `calc(100vh - 300px)`,
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  zIndex: 2,
  width: '100%',
  borderRadius: '2px',
  [theme.breakpoints.down('md')]: { padding: theme.spacing(1), margin: theme.spacing(0, 0, 4, 0) },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
    width: '80%',
    position: 'absolute',
    transform: `translate(-50%, -25%)`,
    left: '50%',
    top: '50%',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '2px',
  padding: theme.spacing(2),
  background: `${theme.palette.grey[200]}`,
  border: `0px`,
  boxShadow: 'none',
  [theme.breakpoints.up('md')]: {
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: theme.spacing(4, 3),
  },
}));

// ---------------- Category Map ----------------
const categoryMap = {
  mobile: { color: '#ff6f61', icon: <PhoneIcon fontSize="large" /> },
  email: { color: '#42a5f5', icon: <EmailIcon fontSize="large" /> },
  address: { color: '#7e57c2', icon: <LocationOnIcon fontSize="large" /> },
};

const getCategoryKey = (cat) => {
  if (!cat) return '';
  const key = cat.trim().toLowerCase();
  if (key === 'phone') return 'mobile';
  if (key === 'office') return 'address';
  return key;
};

// ---------------- Main Component ----------------
export default function ContactHero() {
  return (
    <MainRoot>
      <StyledRoot>
        <HeroFloatCard />
      </StyledRoot>
    </MainRoot>
  );
}

function HeroFloatCard() {
  const { hero } = contact_hero.contact;
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md');

  // Only take first 3 items
  const displayedHero = hero.slice(0, 3);

  const renderLink = (item) => {
    const category = getCategoryKey(item.category);
    if (category === 'email') return `mailto:${item.link}`;
    if (category === 'mobile') return `tel:${item.link}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.link)}`;
  };

  return (
    <StyledContent>
      <Box sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().inRight}>
          <Typography variant="h2" fontWeight="800" color={theme.palette.common.white}>
            Searching for solutions made simple?
          </Typography>
          <Typography
            variant="h4"
            fontWeight="800"
            color={theme.palette.common.white}
            sx={{ mt: 2 }}
          >
            We're here to make it easy for you
          </Typography>

          <Divider
            sx={{
              border: `1px solid ${theme.palette.info.main}`,
              width: '100px',
              margin: '0 auto',
              mt: 2,
            }}
          />
        </m.div>
      </Box>

      <StyledCard sx={{ marginTop: 12 }}>
        <Grid container spacing={4} justifyContent="center">
          {displayedHero.map((item, index) => {
            const key = getCategoryKey(item.category);
            const catData = categoryMap[key] || {};
            return (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <StyledCard sx={{ textAlign: 'center', py: 3, height: '100%' }}>
                  <Avatar
                    sx={{
                      bgcolor: catData.color || '#999',
                      width: 60,
                      height: 60,
                      margin: '0 auto',
                      mb: 2,
                      color: '#fff',
                    }}
                  >
                    {catData.icon || null}
                  </Avatar>

                  <Typography
                    variant={isMobile ? 'h6' : 'h6'}
                    fontWeight="bold"
                    fontFamily="'Roboto Slab', serif"
                    marginBottom={isMobile ? 1 : 2}
                    color={'#140a53'}
                  >
                    {item.description}
                  </Typography>

                  <Link
                    href={renderLink(item)}
                    underline="none"
                    color={`${theme.palette.primary.dark}`}
                    sx={{ fontWeight: 'bold' }}
                    target="_blank"
                  >
                    {item.link}
                  </Link>
                </StyledCard>
              </Grid>
            );
          })}
        </Grid>
      </StyledCard>
    </StyledContent>
  );
}
