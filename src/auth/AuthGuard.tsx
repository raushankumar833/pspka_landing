/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';
import { useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import Loader from 'src/components/loading-screen/loader';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoggedIn } = useAuthContext();
  const { pathname, replace } = useRouter();

  useEffect(() => {
    if (pathname !== PATH_AUTH.login && !isLoggedIn) {
      replace(PATH_AUTH.login);
    }
  }, [pathname, isLoggedIn]);

  if (!isLoggedIn) return <Loader />;
  return <>{children}</>;
}
