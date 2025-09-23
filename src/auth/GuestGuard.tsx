// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { PATH_DASHBOARD } from '../routes/paths';
// import { useAuthContext } from './useAuthContext';
// import { USERROLES } from 'src/utils/constants';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  // const router = useRouter();

  // const { isLoggedIn, user } = useAuthContext();

  // useEffect(() => {
  //   if (isLoggedIn && user?.role === USERROLES.retailer) {
  //     router.push(PATH_DASHBOARD.admin.root); // Using PATH_DASHBOARD.admin.root
  //   }
  // }, [isLoggedIn, router, user]);

  return <>{children}</>;
}
