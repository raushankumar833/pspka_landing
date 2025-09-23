import NextLink from 'next/link';
import { Stack, Typography, Link } from '@mui/material';
import LoginLayout, { LoginCardLayout } from '../../layouts/login';
import { PATH_AUTH } from '../../routes/paths';
import AuthRegisterForm from './AuthRegisterForm';

import { useSettingsContext } from 'src/components/settings';
import OnboardingSteps from './OnboardingSteps';

// ----------------------------------------------------------------------

export default function Register() {
  const { loginLayout } = useSettingsContext();
  const isCard = loginLayout === 'card';
  const isSplit = loginLayout === 'split';

  const renderRegister = () => {
    if (isCard) {
      return (
        <LoginCardLayout>
          <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2"> Already have an account? </Typography>

              <NextLink href={PATH_AUTH.login} passHref>
                <Typography variant="body2" color="secondary.main" fontWeight="bold">
                  Sign in
                </Typography>
              </NextLink>
            </Stack>
          </Stack>
          <OnboardingSteps />
          {/* <AuthRegisterForm /> */}
          <Typography
            component="div"
            sx={{ color: 'secondary.main', mt: 3, typography: 'caption', textAlign: 'center' }}
          >
            {'By signing up, I agree to '}
            <Link
              variant="body2"
              color="secondary.main"
              underline="always"
              fontWeight="bold"
              sx={{
                ...hover,
              }}
            >
              Terms of Service
            </Link>
            {' and '}
            <Link
              variant="body2"
              color="secondary.main"
              underline="always"
              fontWeight="bold"
              sx={{
                ...hover,
              }}
            >
              Privacy Policy
            </Link>
            .
          </Typography>
        </LoginCardLayout>
      );
    }
    if (isSplit) {
      return (
        <LoginLayout title={`Register with ${process.env.REACT_APP_PROJECT_TITLE}`}>
          <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
            <Typography variant="h4">Get started absolutely free.</Typography>

            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2"> Already have an account? </Typography>

              <NextLink href={PATH_AUTH.login} passHref>
                <Link variant="subtitle2">Sign in</Link>
              </NextLink>
            </Stack>
          </Stack>

          <AuthRegisterForm />

          <Typography
            component="div"
            sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
          >
            {'By signing up, I agree to '}
            <Link underline="always" color="text.primary">
              Terms of Service
            </Link>
            {' and '}
            <Link underline="always" color="text.primary">
              Privacy Policy
            </Link>
            .
          </Typography>
        </LoginLayout>
      );
    }
  };

  return <>{renderRegister()}</>;
}

const hover = {
  '&:hover': {
    cursor: 'pointer',
  },
};
