import { Box, Grid, alpha, useTheme } from '@mui/material';
import Logo from '../../../components/logo';
import { StyledRoot } from './styles';
import { useSettingsContext } from 'src/components/settings';
import LoginIllustration from 'src/components/illustrations/IllustrationLogin';
import Footer from '../Footer';
import Header from '../Header';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginCardLayout({ children, illustration, title }: Props) {
  const { themeMode } = useSettingsContext();
  const theme = useTheme();

  const isDark = themeMode === 'dark';

  const cardStyle = {
    width: '80%',
    height: 'max-content',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      borderRadius: '0px',
      height: '100%',
      zIndex: 0,
    },
    background: isDark ? '' : alpha('#fff', 1),
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(2.5px)',
    WebkitBackdropFilter: 'blur(2.5px)',
    border: '1px solid ' + alpha('#fff', 0.1),
    zIndex: 6,
  };

  return (
    <StyledRoot isDark={isDark}>
      <Header />
      <Grid container sx={cardStyle}>
        <Grid
          item
          md={7}
          xs={12}
          sx={{
            background: alpha(theme.palette.primary.lighter, 0.7),
            borderRadius: '16px',
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        >
          <Box
            sx={{
              width: 'fit-content',
            }}
          >
            <Logo
              sx={{
                zIndex: 9,
                width: '70%',
                mt: { xs: 1.5, md: 2 },
                mb: { xs: 1.5, md: 5 },
                ml: { xs: 2, md: 5 },
              }}
            />
          </Box>
          <LoginIllustration
            svg
            sx={{
              margin: '0 auto',
              width: '60%',
            }}
          />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
          sx={{
            py: 16,
            px: 8,
            flexShrink: 0,
            [theme.breakpoints.down('md')]: {
              px: 4,
              py: 10,
            },
          }}
        >
          <Box
            sx={{
              zIndex: 2,
            }}
          >
            <Logo
              sx={{
                zIndex: 2,
                display: 'none',
                margin: '0 auto',
                mb: { xs: 1.5, md: 5 },
                width: '70%',
                justifyContent: 'center',
                backgroundColor: 'white',
                [theme.breakpoints.down('md')]: {
                  display: 'block',
                  zIndex: 2,
                },
              }}
            />
          </Box>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </StyledRoot>
  );
}
