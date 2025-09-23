import { Stack, Typography } from '@mui/material';
import LoginLayout from '../../layouts/login';
import AuthLoginForm from './AuthLoginForm';
import { useSettingsContext } from 'src/components/settings';
import LoginCardLayout from 'src/layouts/login/card/LoginCardLayout';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function Login() {
  const { loginLayout } = useSettingsContext();
  const ismobile = useResponsive('down', 'md');
  const isCard = loginLayout === 'card';
  const isSplit = loginLayout === 'split';

  const renderLogin = () => {
    if (isCard) {
      return (
        <LoginCardLayout>
          <Stack spacing={2} sx={{ mt: !ismobile ? -5 : 0, mb: 5, position: 'relative' }}>
            <Typography variant="h4">Sign in</Typography>
          </Stack>
          <AuthLoginForm />
        </LoginCardLayout>
      );
    }
    if (isSplit) {
      return (
        <LoginLayout>
          <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
            <Typography variant="h4">Sign in</Typography>
          </Stack>
          <AuthLoginForm />
        </LoginLayout>
      );
    }
  };

  return <>{renderLogin()}</>;
}
