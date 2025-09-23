import { PATH_DASHBOARD } from 'src/routes/paths';
// import { AuthContext } from 'src/auth/JwtContext';
// import { useAuthContext } from 'src/auth/useAuthContext';
// import { USERROLES } from './constants';
// import { ClientInterface } from 'src/@types/clients';

export const setTitleFunc = (path: string): string => {
  // const {user} = useAuthContext()

  // const roles: Record<string, string> = {
  //   admin: 'admin',
  //   ad: 'distributor',
  //   md: 'distributor',
  //   asm: 'customer',
  //   zsm: 'customer',
  //   ret: 'sales'
  // }

  // const getRole = (user: ClientInterface): string => {
  //   // const userRole = user.role
  //   return '';
  // }

  const titleMap: Record<string, string> = {
    [PATH_DASHBOARD.recharges.root]: 'Recharges',
    [PATH_DASHBOARD.bill_payments.root]: 'Bill Payments',
    [PATH_DASHBOARD.travel.root]: 'Travel Booking',
    [PATH_DASHBOARD.bbps.root]: 'BBPS',
    [PATH_DASHBOARD.cms.root]: 'CMS',
    [PATH_DASHBOARD.money_transfer.root]: 'Money Transfer',
    [PATH_DASHBOARD.customer.aeps.root]: 'AePS',
    // [PATH_DASHBOARD.customer.aeps.twofa]: 'AePS 2FA',
    [PATH_DASHBOARD.transactions.root]: 'Transactions',
  };

  return titleMap[path] || '';
};
