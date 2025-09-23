// ----------------------------------------------------------------------
// import { Box } from '@mui/system';
// import LoginIllustration from 'src/components/illustrations/IllustrationLogin';
// import Footer from 'src/layouts/login/Footer';
// import Header from 'src/layouts/login/Header';
// import Logo from 'src/components/logo';
// import { EmailInboxIcon } from 'src/assets/icons';
import { Grid, Link, Typography, alpha } from '@mui/material';
import NextLink from 'next/link';
import Iconify from 'src/components/iconify';

import { useSettingsContext } from 'src/components/settings';
import { StyledRoot } from 'src/layouts/login/card/styles';
import { PATH_AUTH } from 'src/routes/paths';
import ResetTpinDialogue from 'src/sections/@dashboard/profile/ResetTpinDialogue';
import AuthVerifyCodeForm from 'src/sections/auth/AuthVerifyCodeForm';
type Props = { title?: string; illustration?: string; children: React.ReactNode };
export default function LoginCardLayout({ children, illustration, title }: Props) {
  const { themeMode } = useSettingsContext();

  const isDark = themeMode === 'dark';

  return (
    <StyledRoot isDark={isDark}>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
        <Grid
          item
          md={5}
          sm={10}
          xs={10}
          sx={{
            background: isDark ? '' : alpha('#fff', 1),
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(2.5px)',
            WebkitBackdropFilter: 'blur(2.5px)',
            border: '1px solid ' + alpha('#fff', 0.1),
            zIndex: 6,
            px: 6,
            py: 1,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* <div style={{ position: 'absolute', top: '-125px', right: '-110px' }}> */}
            <img src="/assets/illustrations/characters/mpin-dialogue.png" alt="otp" width="40%" /> 
          </div>
          {/* <div style={{ height: '60px' }} /> */}
          <Typography variant="h3" paragraph>
            Please enter your TPIN
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            We have sent you a 6-digit TPIN, please enter the TPIN in below box to verify your
            login.
          </Typography>
          <AuthVerifyCodeForm /> <ResetTpinDialogue />
          <NextLink href={PATH_AUTH.login} passHref>
            <Link
              color="inherit"
              variant="subtitle2"
              sx={{ mx: 'auto', alignItems: 'center', display: 'inline-flex' }}
            >
              <Iconify icon="eva:chevron-left-fill" width={16} /> Return to sign
            </Link>
          </NextLink>
        </Grid>
      </Grid>{' '}
    </StyledRoot>
  );
}
