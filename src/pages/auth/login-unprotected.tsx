// next
import Head from 'next/head';
// sections
import Login from '../../sections/auth/Login';

// ----------------------------------------------------------------------

export default function LoginUnprotectedPage() {
  return (
    <>
      <Head>
        <title> Login Unprotected | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Login />
    </>
  );
}
