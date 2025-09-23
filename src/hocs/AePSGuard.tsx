import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import useAepsContext from 'src/context/aepsContext';
import { PATH_DASHBOARD } from 'src/routes/paths';

type AepsProps = {
  children: React.ReactNode;
};
const AePSGuard = ({ children }: AepsProps) => {
  const { isTwoFa } = useAepsContext();
  const { pathname, replace } = useRouter();

  useEffect(() => {
    if (!isTwoFa && pathname !== PATH_DASHBOARD.customer.aeps.twofa) {
      replace(PATH_DASHBOARD.customer.aeps.twofa);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTwoFa]);

  if (!isTwoFa && pathname !== PATH_DASHBOARD.customer.aeps.twofa) return <LoadingScreen />;
  return <>{children}</>;
};

export default AePSGuard;
