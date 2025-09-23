import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgColor from '../../../components/svg-color';
import { USERROLES } from 'src/utils/constants';

// ----------------------------------------------------------------------
// used in 3 files nav horizontal, nav mini, nav vertival

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const ICONS = {
  cms: icon('ic_cms'),
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  bbps: icon('ic_bbps'),
  mail: icon('ic_mail'),
  message: icon('ic_mail'),
  notifications: icon('ic_mail'),
  users: icon('ic_user'),
  kanban: icon('ic_user'),
  file: icon('ic_file'),
  'prabhu transfer': icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  travel: icon('ic_travel'),
  folder: icon('ic_folder'),
  aeps: icon('ic_fingerscan'),
  banking: icon('ic_banking'),
  banks: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  account: icon('ic_invoice'),
  cd: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  operators: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  recharges: icon('ic_recharges'),
  routes: icon('ic_recharges'),
  plans: icon('ic_recharges'),
  complaints: icon('ic_recharges'),
  risks: icon('ic_recharges'),
  nepal_transfer: icon('ic_nepal'),
  upi_transfer: icon('ic_upi_transfer'),
  transactions: icon('ic_transactions'),
  'credit request': icon('ic_transactions'),
  'bill payments': icon('ic_bill'),
  'money transfer': icon('ic_money_transfer'),
  vendor_payments: icon('ic_vendor_payments'),
};

const navConfig = [
  // USERROLES.retailer
  {
    subheader: { title: '', roles: [USERROLES.retailer] },
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.customer.root,
        icon: ICONS.dashboard,
        roles: [USERROLES.retailer],
      },
      {
        title: 'Recharges',
        path: PATH_DASHBOARD.customer.recharges,
        icon: ICONS.recharges,
        roles: [USERROLES.retailer],
      },
      {
        title: 'Bill Payments',
        path: PATH_DASHBOARD.customer.bill_payments,
        icon: ICONS['bill payments'],
        roles: [USERROLES.retailer],
      },
      {
        title: 'Travel',
        path: PATH_DASHBOARD.customer.travel,
        icon: ICONS.travel,
        roles: [USERROLES.retailer],
      },
      {
        title: 'BBPS',
        path: PATH_DASHBOARD.customer.bbps,
        icon: ICONS.bbps,
        roles: [USERROLES.retailer],
      },
      {
        title: 'CMS',
        path: PATH_DASHBOARD.customer.cms,
        icon: ICONS.cms,
        roles: [USERROLES.retailer],
      },
      {
        title: 'Money Transfer',
        path: PATH_DASHBOARD.customer.money_transfer,
        icon: ICONS['money transfer'],
        roles: [USERROLES.retailer],
      },
      {
        title: 'AEPS',
        path: PATH_DASHBOARD.customer.aeps.root,
        icon: ICONS.aeps,
        roles: [USERROLES.retailer],
      },
      {
        title: 'Transactions',
        path: PATH_DASHBOARD.customer.transactions,
        icon: ICONS.transactions,
        roles: [USERROLES.retailer],
      },
      {
        title: 'Credit Request',
        path: PATH_DASHBOARD.customer.credit_req,
        icon: ICONS.transactions,
        roles: [USERROLES.retailer],
      },
    ],
  },
  // USERROLES.admin
  {
    subheader: { title: '', roles: [USERROLES.admin] },
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.dashboard, // icons are not used from here se the nav vertical file for how icons are used
        roles: [USERROLES.admin],
      },
      {
        title: 'Users',
        path: PATH_DASHBOARD.admin.users,
        icon: ICONS.users,
        roles: [USERROLES.admin],
      },
      {
        title: 'Transactions',
        path: PATH_DASHBOARD.admin.transactions,
        icon: ICONS.file,
        roles: [USERROLES.admin],
      },
      {
        title: 'Prabhu Transfer',
        path: PATH_DASHBOARD.prabhuTransfer.root,
        icon: ICONS.file,
        roles: [USERROLES.admin],
      },
      {
        title: 'Credit Request',
        path: PATH_DASHBOARD.admin.creditReq,
        icon: ICONS.dashboard,
        roles: [USERROLES.admin],
      },
      {
        title: 'Account',
        path: PATH_DASHBOARD.admin.accounts,
        icon: ICONS.account,
        roles: [USERROLES.admin],
      },
      {
        title: 'Banks',
        path: PATH_DASHBOARD.admin.banks,
        icon: ICONS.banking,
        roles: [USERROLES.admin],
      },
      {
        title: 'Message',
        path: PATH_DASHBOARD.admin.message,
        icon: ICONS.mail,
        roles: [USERROLES.admin],
      },
      {
        title: 'Notifications',
        path: PATH_DASHBOARD.admin.notifications,
        icon: ICONS.mail,
        roles: [USERROLES.admin],
      },
      {
        title: 'Operators',
        path: PATH_DASHBOARD.admin.operators,
        icon: ICONS.analytics,
        roles: [USERROLES.admin],
      },
      {
        title: 'Routes',
        path: PATH_DASHBOARD.admin.routes,
        icon: ICONS.recharges,
        roles: [USERROLES.admin],
      },
      {
        title: 'Plans',
        path: PATH_DASHBOARD.admin.plans,
        icon: ICONS.recharges,
        roles: [USERROLES.admin],
      },
      {
        title: 'Complaints',
        path: PATH_DASHBOARD.admin.complaints,
        icon: ICONS.recharges,
        roles: [USERROLES.admin],
      },
      {
        title: 'Risks',
        path: PATH_DASHBOARD.admin.risk,
        icon: ICONS.recharges,
        roles: [USERROLES.admin],
      },
      {
        title: 'Settings',
        path: PATH_DASHBOARD.admin.settings,
        icon: ICONS.recharges,
        roles: [USERROLES.admin],
      }
    ],
  },
  // USERROLES.asm,USERROLES.zsm
  {
    subheader: { title: '', roles: [USERROLES.asm, USERROLES.zsm] },
    items: [
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.sales.root,
        icon: ICONS.dashboard,
        roles: [USERROLES.asm, USERROLES.zsm],
      },
      {
        title: 'Users',
        path: PATH_DASHBOARD.sales.users,
        icon: ICONS.kanban,
        roles: [USERROLES.asm, USERROLES.zsm],
      },
      {
        title: 'Transactions',
        path: PATH_DASHBOARD.sales.transactions,
        icon: ICONS.file,
        roles: [USERROLES.asm, USERROLES.zsm],
      },

      {
        title: 'Credit Request',
        path: PATH_DASHBOARD.sales.creditReq,
        icon: ICONS.invoice,
        roles: [USERROLES.asm, USERROLES.zsm],
      },
    ],
  },
  // USERROLES.ad,USERROLES.md
  {
    subheader: { title: '', roles: [USERROLES.ad, USERROLES.md] },
    items: [
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.distributor.root,
        icon: ICONS.dashboard,
        roles: [USERROLES.md, USERROLES.ad],
      },
      {
        title: 'Users',
        path: PATH_DASHBOARD.distributor.users,
        icon: ICONS.kanban,
        roles: [USERROLES.ad, USERROLES.md],
      },
      {
        title: 'Transactions',
        path: PATH_DASHBOARD.distributor.transactions,
        icon: ICONS.file,
        roles: [USERROLES.ad, USERROLES.md],
      },
      {
        title: 'Credit Request',
        path: PATH_DASHBOARD.distributor.creditReq,
        icon: ICONS.invoice,
        roles: [USERROLES.ad, USERROLES.md],
      },
      {
        title: 'My Sale',
        path: PATH_DASHBOARD.distributor.mySale,
        icon: ICONS.file,
        roles: [USERROLES.ad, USERROLES.md],
      },
      {
        title: 'My Purchase',
        path: PATH_DASHBOARD.distributor.myPurchase,
        icon: ICONS.invoice,
        roles: [USERROLES.ad, USERROLES.md],
      },
    ],
  },
];

export default navConfig;
