import { Divider, IconButton, Stack } from '@mui/material';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const handleGoogleLogin = async () => {
    console.log('handleGoogleLogin');
  };

  const handleGithubLogin = async () => {
    console.log('handleGithubLogin');
  };

  const handleTwitterLogin = async () => {
    console.log('handleTwitterLogin');
  };

  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={handleGoogleLogin}>
          <Iconify icon="eva:google-fill" color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit" onClick={handleGithubLogin}>
          <Iconify icon="eva:github-fill" />
        </IconButton>

        <IconButton onClick={handleTwitterLogin}>
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
        </IconButton>
      </Stack>
    </div>
  );
}
